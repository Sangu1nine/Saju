import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  BookOpen, 
  Tag, 
  ChevronRight,
  Star,
  Filter,
  X
} from 'lucide-react'

import { api } from '../services/api'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const TermsPage = () => {
  // 상태 관리
  const [terms, setTerms] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTerm, setSelectedTerm] = useState(null)
  const [relatedTerms, setRelatedTerms] = useState([])

  // 데이터 로드
  useEffect(() => {
    const loadTermsData = async () => {
      try {
        setLoading(true)
        const response = await api.getAllTerms()
        setTerms(response.data.terms || [])
        setCategories(['all', ...response.data.categories || []])
      } catch (error) {
        console.error('Terms loading error:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTermsData()
  }, [])

  // 용어 선택 시 상세 정보 및 관련 용어 로드
  useEffect(() => {
    const loadTermDetails = async () => {
      if (!selectedTerm) {
        setRelatedTerms([])
        return
      }

      try {
        const [termResponse, relatedResponse] = await Promise.all([
          api.getTerm(selectedTerm),
          api.getRelatedTerms(selectedTerm)
        ])
        
        setRelatedTerms(relatedResponse.data.related_terms || [])
      } catch (error) {
        console.error('Term details loading error:', error)
      }
    }

    loadTermDetails()
  }, [selectedTerm])

  // 필터링된 용어 목록
  const filteredTerms = useMemo(() => {
    let filtered = terms

    // 카테고리 필터링
    if (selectedCategory !== 'all') {
      // 실제로는 API에서 카테고리별 용어를 가져와야 함
      // 여기서는 간단한 예시
      filtered = filtered.filter(term => {
        if (selectedCategory === '기본') return ['사주팔자', '천간', '지지', '일간', '월령'].includes(term)
        if (selectedCategory === '오행') return ['오행', '상생', '상극', '조후'].includes(term)
        if (selectedCategory === '십신') return ['십신', '비겁', '인성', '관성', '재성', '식상'].includes(term)
        return true
      })
    }

    // 검색 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(term => 
        term.toLowerCase().includes(query)
      )
    }

    return filtered.sort()
  }, [terms, selectedCategory, searchQuery])

  // 용어 상세 정보 가져오기
  const getTermDetail = async (term) => {
    try {
      const response = await api.getTerm(term)
      return response.data
    } catch (error) {
      console.error('Term detail error:', error)
      return null
    }
  }

  // 카테고리 한글 이름
  const categoryNames = {
    'all': '전체',
    '기본': '기본 개념',
    '오행': '오행',
    '십신': '십신',
    '운세': '운세',
    '강약': '신강신약',
    '충돌': '형충파해',
    '조화': '합 관계',
    '고급': '고급 개념'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="용어 사전을 불러오는 중..." type="brain" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center mb-4"
            >
              <BookOpen className="w-8 h-8 text-primary-600 mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                사주 용어 사전
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              사주명리학의 핵심 용어들을 쉽게 이해할 수 있도록 정리했습니다.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 사이드바 - 검색 및 카테고리 */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* 검색 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card"
              >
                <h3 className="font-semibold text-gray-900 mb-4">검색</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="용어를 검색하세요..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* 카테고리 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="card"
              >
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  카테고리
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary-100 text-primary-800 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {categoryNames[category] || category}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* 통계 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="card"
              >
                <h3 className="font-semibold text-gray-900 mb-4">통계</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">전체 용어</span>
                    <span className="font-semibold text-primary-600">{terms.length}개</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">카테고리</span>
                    <span className="font-semibold text-primary-600">{categories.length - 1}개</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">검색 결과</span>
                    <span className="font-semibold text-primary-600">{filteredTerms.length}개</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2">
            {/* 용어 목록 */}
            {!selectedTerm ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedCategory === 'all' ? '전체 용어' : categoryNames[selectedCategory]}
                  </h2>
                  <div className="text-sm text-gray-500">
                    {filteredTerms.length}개 용어
                  </div>
                </div>

                {filteredTerms.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredTerms.map((term, index) => (
                      <motion.button
                        key={term}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedTerm(term)}
                        className="group p-4 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-200 rounded-lg text-left transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                              {term}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              용어 설명 보기
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      검색 결과가 없습니다
                    </h3>
                    <p className="text-gray-500">
                      다른 키워드로 검색해보세요.
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              /* 용어 상세 */
              <TermDetail 
                term={selectedTerm}
                onBack={() => setSelectedTerm(null)}
                relatedTerms={relatedTerms}
                onSelectTerm={setSelectedTerm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// 용어 상세 컴포넌트
const TermDetail = ({ term, onBack, relatedTerms, onSelectTerm }) => {
  const [termData, setTermData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTermData = async () => {
      try {
        setLoading(true)
        const response = await api.getTerm(term)
        setTermData(response.data)
      } catch (error) {
        console.error('Term data loading error:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTermData()
  }, [term])

  if (loading) {
    return (
      <div className="card">
        <LoadingSpinner text="용어 정보를 불러오는 중..." />
      </div>
    )
  }

  if (!termData) {
    return (
      <div className="card text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          용어 정보를 찾을 수 없습니다
        </h3>
        <button onClick={onBack} className="btn-primary mt-4">
          목록으로 돌아가기
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* 헤더 */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            ← 목록으로 돌아가기
          </button>
          <Tag className="w-5 h-5 text-gray-400" />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {termData.term}
          </h1>
          <p className="text-lg text-gray-600 hanja">
            {termData.korean_name}
          </p>
        </div>

        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <p className="text-primary-800 font-medium">
            {termData.short_description}
          </p>
        </div>
      </div>

      {/* 상세 설명 */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">상세 설명</h2>
        <div className="prose max-w-none text-gray-700">
          <p className="leading-relaxed">
            {termData.detailed_description}
          </p>
        </div>
      </div>

      {/* 예시 */}
      {termData.examples && termData.examples.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">예시</h2>
          <div className="space-y-3">
            {termData.examples.map((example, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                <p className="text-gray-700 font-medium hanja">
                  {example}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 관련 용어 */}
      {relatedTerms && relatedTerms.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            관련 용어
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedTerms.map((relatedTerm) => (
              <button
                key={relatedTerm.term}
                onClick={() => onSelectTerm(relatedTerm.term)}
                className="group p-3 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-200 rounded-lg text-left transition-all duration-200"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                  {relatedTerm.term}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {relatedTerm.short_description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default TermsPage