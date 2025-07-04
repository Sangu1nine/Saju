import axios from 'axios'
import toast from 'react-hot-toast'

// API 베이스 URL 설정
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30초 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 요청 로깅
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    
    // 로딩 토스트 표시 (긴 요청의 경우)
    if (config.showLoading) {
      config.loadingToast = toast.loading('요청 처리 중...')
    }
    
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    // 성공 응답 로깅
    console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    
    // 로딩 토스트 제거
    if (response.config.loadingToast) {
      toast.dismiss(response.config.loadingToast)
    }
    
    return response
  },
  (error) => {
    // 에러 응답 로깅
    console.error('❌ API Error:', error.response?.status, error.response?.data || error.message)
    
    // 로딩 토스트 제거
    if (error.config?.loadingToast) {
      toast.dismiss(error.config.loadingToast)
    }
    
    // 에러 메시지 표시
    const errorMessage = getErrorMessage(error)
    toast.error(errorMessage)
    
    return Promise.reject(error)
  }
)

// 에러 메시지 추출 함수
const getErrorMessage = (error) => {
  if (error.response) {
    // 서버 응답이 있는 경우
    const { status, data } = error.response
    
    switch (status) {
      case 400:
        return data.detail || '잘못된 요청입니다.'
      case 404:
        return '요청한 리소스를 찾을 수 없습니다.'
      case 500:
        return '서버 내부 오류가 발생했습니다.'
      case 503:
        return '서비스를 일시적으로 사용할 수 없습니다.'
      default:
        return data.detail || `오류가 발생했습니다. (${status})`
    }
  } else if (error.request) {
    // 네트워크 오류
    return '네트워크 연결을 확인해주세요.'
  } else {
    // 기타 오류
    return error.message || '알 수 없는 오류가 발생했습니다.'
  }
}

// API 함수들
export const api = {
  // 헬스 체크
  healthCheck: () => apiClient.get('/health'),
  
  // 사주 계산
  calculateSaju: (sajuData) => 
    apiClient.post('/api/v1/saju/calculate', sajuData, { showLoading: true }),
  
  // 사주 분석 (완료 후 결과)
  analyzeSaju: (sajuData) => 
    apiClient.post('/api/v1/saju/analyze', sajuData, { 
      showLoading: true,
      timeout: 120000 // 2분 타임아웃
    }),
  
  // 분석 결과 조회
  getAnalysis: (analysisId) => 
    apiClient.get(`/api/v1/saju/analysis/${analysisId}`),
  
  // 분석 목록 조회
  getAnalysisList: () => 
    apiClient.get('/api/v1/analysis/list'),
  
  // 분석 삭제
  deleteAnalysis: (analysisId) => 
    apiClient.delete(`/api/v1/analysis/${analysisId}`),
  
  // 용어 관련
  getAllTerms: () => 
    apiClient.get('/api/v1/terms'),
  
  getTerm: (term) => 
    apiClient.get(`/api/v1/terms/${encodeURIComponent(term)}`),
  
  searchTerms: (searchData) => 
    apiClient.post('/api/v1/terms/search', searchData),
  
  getRelatedTerms: (term) => 
    apiClient.get(`/api/v1/terms/${encodeURIComponent(term)}/related`),
  
  // 테스트용
  testAnalyze: () => 
    apiClient.post('/api/v1/test/analyze')
}

// 8단계 실시간 스트리밍 분석 함수
export const startStreamingAnalysis = async (sajuData, onProgress) => {
  const controller = new AbortController()
  
  try {
    console.log('🚀 8단계 실시간 스트리밍 분석 시작:', sajuData)
    
    const response = await fetch(`${API_BASE_URL}/api/v1/saju/analyze/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sajuData),
      signal: controller.signal,
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error('스트리밍을 지원하지 않는 브라우저입니다.')
    }
    
    const decoder = new TextDecoder()
    let buffer = ''
    
    while (true) {
      const { done, value } = await reader.read()
      
      if (done) {
        console.log('✅ 스트리밍 완료')
        break
      }
      
      buffer += decoder.decode(value, { stream: true })
      
      // 완전한 메시지 추출
      const lines = buffer.split('\n\n')
      buffer = lines.pop() || '' // 마지막 불완전한 라인 보존
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6))
            console.log('📡 Stream data received:', data.type, data)
            
            // 콜백 함수로 데이터 전달
            onProgress(data)
            
            // 완료 또는 에러 시 스트림 종료
            if (data.type === 'complete' || data.type === 'error') {
              console.log(`🔚 스트림 종료: ${data.type}`)
              controller.abort()
              return data
            }
          } catch (error) {
            console.error('❌ JSON 파싱 오류:', error, line)
          }
        }
      }
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('⏹️ 스트리밍이 중단되었습니다.')
    } else {
      console.error('❌ 스트리밍 오류:', error)
      // 에러를 onProgress로 전달
      onProgress({
        type: 'error',
        error: error.message,
        message: `스트리밍 중 오류: ${error.message}`
      })
      throw error
    }
  } finally {
    // 정리 작업
    try {
      controller.abort()
    } catch (e) {
      // 이미 중단된 경우 무시
    }
  }
}

// 유틸리티 함수들
export const formatApiError = (error) => {
  return getErrorMessage(error)
}

export const isApiError = (error) => {
  return error.response && error.response.status
}

export const retryApiCall = async (apiCall, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      
      // 지수 백오프
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
    }
  }
}

// API 상태 체크
export const checkApiStatus = async () => {
  try {
    const response = await api.healthCheck()
    return {
      online: true,
      status: response.data.status,
      services: response.data.services
    }
  } catch (error) {
    return {
      online: false,
      error: getErrorMessage(error)
    }
  }
}

export default apiClient