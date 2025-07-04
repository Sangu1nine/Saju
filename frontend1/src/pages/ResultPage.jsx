import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Download,
  Share2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Star,
  TrendingUp,
  Heart,
  Briefcase,
  Home,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react'

import { api } from '../services/api'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const ResultPage = () => {
  const { analysisId } = useParams()
  const navigate = useNavigate()
  
  // 상태 관리
  const [analysisData, setAnalysisData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedSections, setExpandedSections] = useState(new Set(['step1', 'step8']))
  const [selectedTab, setSelectedTab] = useState('overview')

  // 분석 데이터 로드
  useEffect(() => {
    const loadAnalysis = async () => {
      try {
        setLoading(true)
        const response = await api.getAnalysis(analysisId)
        setAnalysisData(response.data)
      } catch (error) {
        console.error('Analysis loading error:', error)
        setError('분석 결과를 불러올 수 없습니다.')
        toast.error('분석 결과를 찾을 수 없습니다.')
      } finally {
        setLoading(false)
      }
    }

    if (analysisId) {
      loadAnalysis()
    }
  }, [analysisId])

  // 섹션 토글
  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  // 분석 결과 공유
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: '사주 분석 결과',
          text: 'AI 기반 전문 사주 분석 결과를 확인해보세요!',
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success('링크가 클립보드에 복사되었습니다!')
      }
    } catch (error) {
      console.error('Share error:', error)
    }
  }

  // PDF 다운로드 (추후 구현)
  const handleDownload = () => {
    toast('PDF 다운로드 기능은 곧 출시됩니다!', { icon: '📄' })
  }

  // 로딩 상태
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="분석 결과를 불러오는 중..." type="brain" />
      </div>
    )
  }

  // 에러 상태
  if (error || !analysisData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">결과를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-6">
            요청하신 분석 결과를 찾을 수 없습니다. 분석을 다시 진행해주세요.
          </p>
          <button
            onClick={() => navigate('/analysis')}
            className="btn-primary px-6 py-3"
          >
            새로운 분석 시작하기
          </button>
        </div>
      </div>
    )
  }

  const { saju_data, step_results } = analysisData

  // 탭 데이터
  const tabs = [
    { id: 'overview', name: '종합 요약', icon: Star },
    { id: 'personality', name: '성격 분석', icon: User },
    { id: 'fortune', name: '운세', icon: TrendingUp },
    { id: 'relationships', name: '인간관계', icon: Heart },
    { id: 'career', name: '직업', icon: Briefcase },
    { id: 'detailed', name: '상세 분석', icon: BookOpen }
  ]

  // 분석 단계 정보
  const stepInfo = {
    step1: { name: '기초 명식', icon: '🎯', color: 'blue' },
    step2: { name: '오행 균형', icon: '⚖️', color: 'green' },
    step3: { name: '용신과 조후', icon: '🔥', color: 'red' },
    step4: { name: '십신 관계', icon: '👥', color: 'purple' },
    step5: { name: '대운과 세운', icon: '📈', color: 'indigo' },
    step6: { name: '형충파해', icon: '⚡', color: 'yellow' },
    step7: { name: '구체적 해석', icon: '💼', color: 'pink' },
    step8: { name: '종합 평가', icon: '🎭', color: 'emerald' }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            {/* 제목 */}
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                사주 분석 결과
              </h1>
              <p className="text-gray-600">
                AI 기반 전문 분석이 완료되었습니다
              </p>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleShare}
                className="btn-outline flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                공유하기
              </button>
              <button
                onClick={handleDownload}
                className="btn-outline flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                PDF 저장
              </button>
              <button
                onClick={() => navigate('/analysis')}
                className="btn-primary flex items-center"
              >
                새 분석하기
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 사이드바 - 기본 정보 */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">출생 정보</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-3 text-gray-500" />
                  <span>
                    {saju_data.birth_info.original_time.split(' ')[0].replace(/-/g, '.')}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-3 text-gray-500" />
                  <span>
                    {saju_data.birth_info.original_time.split(' ')[1]}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-gray-500" />
                  <span>{saju_data.birth_info.city}</span>
                </div>
              </div>

              {/* 사주팔자 */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">사주팔자</h4>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">시주</div>
                    <div className="font-bold hanja text-primary-600">
                      {saju_data.hour_pillar}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">일주</div>
                    <div className="font-bold hanja text-primary-600">
                      {saju_data.day_pillar}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">월주</div>
                    <div className="font-bold hanja text-primary-600">
                      {saju_data.month_pillar}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">년주</div>
                    <div className="font-bold hanja text-primary-600">
                      {saju_data.year_pillar}
                    </div>
                  </div>
                </div>
              </div>

              {/* 오행 분포 */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">오행 분포</h4>
                <div className="space-y-2">
                  {Object.entries(saju_data.elements).map(([element, count]) => (
                    <div key={element} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{element}</span>
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                          <div 
                            className="h-2 bg-primary-500 rounded-full"
                            style={{ width: `${(count / Math.max(...Object.values(saju_data.elements))) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            {/* 탭 네비게이션 */}
            <div className="card mb-6">
              <div className="flex overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        selectedTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 탭 콘텐츠 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {selectedTab === 'overview' && (
                  <div className="space-y-6">
                    {/* 종합 평가 */}
                    {step_results.step8 && (
                      <div className="card">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <span className="text-2xl mr-2">🎭</span>
                          종합 평가
                        </h3>
                        <div className="prose max-w-none text-gray-700">
                          {step_results.step8.content.split('\n').map((paragraph, index) => (
                            paragraph.trim() && (
                              <p key={index} className="mb-3 leading-relaxed">
                                {paragraph.trim()}
                              </p>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedTab === 'detailed' && (
                  <div className="space-y-4">
                    {Object.entries(step_results).map(([stepKey, stepData]) => {
                      const stepNum = stepKey.replace('step', '')
                      const info = stepInfo[stepKey]
                      const isExpanded = expandedSections.has(stepKey)

                      return (
                        <motion.div
                          key={stepKey}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="card"
                        >
                          <button
                            onClick={() => toggleSection(stepKey)}
                            className="w-full flex items-center justify-between p-2 -m-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{info?.icon}</span>
                              <div className="text-left">
                                <h3 className="font-semibold text-gray-900">
                                  {stepNum}단계: {info?.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {stepData.title}
                                </p>
                              </div>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <div className="prose max-w-none text-gray-700">
                                    {stepData.content.split('\n').map((paragraph, index) => (
                                      paragraph.trim() && (
                                        <p key={index} className="mb-3 leading-relaxed">
                                          {paragraph.trim()}
                                        </p>
                                      )
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </div>
                )}

                {/* 다른 탭들 (추후 확장) */}
                {selectedTab === 'personality' && (
                  <div className="card">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <User className="w-6 h-6 mr-2 text-primary-600" />
                      성격 분석
                    </h3>
                    {step_results.step4 && (
                      <div className="prose max-w-none text-gray-700">
                        {step_results.step4.content.split('\n').slice(0, 10).map((paragraph, index) => (
                          paragraph.trim() && (
                            <p key={index} className="mb-3 leading-relaxed">
                              {paragraph.trim()}
                            </p>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {selectedTab === 'fortune' && (
                  <div className="card">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2 text-primary-600" />
                      운세 분석
                    </h3>
                    {step_results.step5 && (
                      <div className="prose max-w-none text-gray-700">
                        {step_results.step5.content.split('\n').slice(0, 10).map((paragraph, index) => (
                          paragraph.trim() && (
                            <p key={index} className="mb-3 leading-relaxed">
                              {paragraph.trim()}
                            </p>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {selectedTab === 'relationships' && (
                  <div className="card">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Heart className="w-6 h-6 mr-2 text-primary-600" />
                      인간관계 분석
                    </h3>
                    {step_results.step7 && (
                      <div className="prose max-w-none text-gray-700">
                        {step_results.step7.content.split('\n').slice(5, 15).map((paragraph, index) => (
                          paragraph.trim() && paragraph.includes('관계') && (
                            <p key={index} className="mb-3 leading-relaxed">
                              {paragraph.trim()}
                            </p>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {selectedTab === 'career' && (
                  <div className="card">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Briefcase className="w-6 h-6 mr-2 text-primary-600" />
                      직업 및 재물운
                    </h3>
                    {step_results.step7 && (
                      <div className="prose max-w-none text-gray-700">
                        {step_results.step7.content.split('\n').slice(0, 10).map((paragraph, index) => (
                          paragraph.trim() && (paragraph.includes('직업') || paragraph.includes('재물')) && (
                            <p key={index} className="mb-3 leading-relaxed">
                              {paragraph.trim()}
                            </p>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* 하단 액션 */}
            <div className="mt-8 text-center">
              <div className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      분석이 도움되셨나요?
                    </h3>
                    <p className="text-sm text-gray-600">
                      더 자세한 분석이나 다른 궁금한 점이 있으시면 언제든 문의해주세요.
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => navigate('/terms')}
                      className="btn-outline flex items-center"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      용어 알아보기
                    </button>
                    <button
                      onClick={() => navigate('/analysis')}
                      className="btn-primary flex items-center"
                    >
                      다시 분석하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 도움말 툴팁 (개발 모드) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 text-sm">
            <div className="flex items-center text-blue-800">
              <Info className="w-4 h-4 mr-2" />
              <span className="font-medium">개발 정보</span>
            </div>
            <div className="mt-1 text-xs text-blue-700">
              <div>분석 ID: {analysisId}</div>
              <div>단계 수: {Object.keys(step_results).length}/8</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultPage