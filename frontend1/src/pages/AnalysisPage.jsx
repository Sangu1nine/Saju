import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  User,
  Moon,
  Sun,
  X
} from 'lucide-react'

import SajuForm from '../components/analysis/SajuForm'
import AnalysisProgress from '../components/analysis/AnalysisProgress'
import { startStreamingAnalysis } from '../services/api'

const AnalysisPage = () => {
  const navigate = useNavigate()
  
  // 상태 관리
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisData, setAnalysisData] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [stepName, setStepName] = useState('')
  const [stepResults, setStepResults] = useState({})
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState(null)
  const [analysisId, setAnalysisId] = useState(null)

  // 폼 제출 핸들러
  const handleSubmit = useCallback(async (formData) => {
    setIsAnalyzing(true)
    setAnalysisData(formData)
    setStepResults({})
    setCurrentStep(0)
    setStepName('분석 준비')
    setIsComplete(false)
    setError(null)
    setAnalysisId(null)
    
    try {
      toast.success('8단계 전문 사주 분석을 시작합니다!')
      
      // 스트리밍 분석 시작
      await startStreamingAnalysis(formData, (streamData) => {
        console.log('Stream data:', streamData)
        
        switch (streamData.type) {
          case 'start':
            setCurrentStep(0)
            setStepName('분석 시작')
            setAnalysisId(streamData.analysis_id)
            toast.success('분석이 시작되었습니다!')
            break
            
          case 'step_start':
            setCurrentStep(streamData.step)
            setStepName(streamData.step_name)
            // 각 단계 시작 시 실시간 알림
            toast(`${streamData.step}단계: ${streamData.step_name}`, {
              icon: '🔄',
              duration: 2000
            })
            break
            
          case 'step_complete':
            // 단계 완료 시 결과 즉시 저장
            setStepResults(prev => ({
              ...prev,
              [`step${streamData.step}`]: streamData.result
            }))
            // 완료 알림
            toast.success(`${streamData.step}단계 완료: ${streamData.step_name}`, {
              icon: '✅',
              duration: 3000
            })
            break
            
          case 'complete':
            setIsComplete(true)
            setCurrentStep(8)
            setStepName('분석 완료')
            toast.success('🎉 모든 분석이 완료되었습니다!', {
              duration: 4000
            })
            // 3초 후 결과 페이지로 이동
            setTimeout(() => {
              navigate(`/result/${streamData.analysis_id}`)
            }, 3000)
            break
            
          case 'error':
            setError(streamData.error)
            setIsAnalyzing(false)
            toast.error(streamData.message || '분석 중 오류가 발생했습니다.')
            break
        }
      })
      
    } catch (error) {
      console.error('Analysis error:', error)
      setError(error.message || '분석 중 오류가 발생했습니다.')
      toast.error('분석 중 오류가 발생했습니다. 다시 시도해주세요.')
      setIsAnalyzing(false)
    }
  }, [navigate])

  // 분석 취소 핸들러
  const handleCancel = useCallback(() => {
    setIsAnalyzing(false)
    setCurrentStep(0)
    setStepName('')
    setStepResults({})
    setIsComplete(false)
    setError(null)
    setAnalysisId(null)
    toast('분석이 취소되었습니다.', { icon: '⏹️' })
  }, [])

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-primary-600" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              <span className="text-gradient">8단계 AI 사주 분석</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            단계별 실시간 분석으로 전문가 수준의 상세한 사주 해석을 제공합니다.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isAnalyzing ? (
            /* 입력 폼 */
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 px-8 py-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    출생 정보 입력
                  </h2>
                  <p className="text-primary-100">
                    정확한 출생 정보로 더욱 정밀한 사주 분석을 받아보세요.
                  </p>
                </div>
                
                <div className="p-8">
                  <SajuForm onSubmit={handleSubmit} />

                  {/* 새로운 8단계 안내 */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-4 flex items-center text-lg">
                      <Sparkles className="w-5 h-5 mr-2" />
                      8단계 전문 분석 과정
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs font-bold mr-3">1</span>
                          <span>기초 명식 작성</span>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-xs font-bold mr-3">2</span>
                          <span>오행 균형 분석</span>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-500 text-white rounded-full text-xs font-bold mr-3">3</span>
                          <span>용신과 조후</span>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-pink-500 text-white rounded-full text-xs font-bold mr-3">4</span>
                          <span>십신 관계 해석</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-500 text-white rounded-full text-xs font-bold mr-3">5</span>
                          <span>대운과 세운</span>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white rounded-full text-xs font-bold mr-3">6</span>
                          <span>형충파해 분석</span>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-500 text-white rounded-full text-xs font-bold mr-3">7</span>
                          <span>구체적 해석</span>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-500 text-white rounded-full text-xs font-bold mr-3">8</span>
                          <span>종합 평가</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <div className="flex items-center justify-between text-xs text-blue-700">
                        <span>⏱️ 예상 소요 시간: 5-7분</span>
                        <span>🔄 실시간 단계별 결과 확인</span>
                        <span>🎯 전문가급 분석 품질</span>
                      </div>
                    </div>
                  </div>

                  {/* 개인정보 보호 안내 */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span>모든 개인정보는 암호화되어 안전하게 보호되며, 분석 완료 후 자동 삭제됩니다.</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* 분석 진행 */
            <motion.div
              key="analysis"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* 취소 버튼 */}
              {!isComplete && (
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    분석 취소
                  </button>
                </div>
              )}

              {/* 입력된 정보 요약 카드 */}
              {analysisData && (
                <motion.div 
                  className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-primary-600" />
                    분석 대상 정보
                    {analysisId && (
                      <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        ID: {analysisId.slice(-8)}
                      </span>
                    )}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <div>
                        <div className="font-medium text-blue-900">생년월일</div>
                        <div className="text-blue-700">
                          {analysisData.birth_year}.{analysisData.birth_month}.{analysisData.birth_day}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Clock className="w-4 h-4 mr-2 text-green-600" />
                      <div>
                        <div className="font-medium text-green-900">출생시간</div>
                        <div className="text-green-700">
                          {String(analysisData.birth_hour).padStart(2, '0')}:
                          {String(analysisData.birth_minute).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                      <User className="w-4 h-4 mr-2 text-purple-600" />
                      <div>
                        <div className="font-medium text-purple-900">성별</div>
                        <div className="text-purple-700">{analysisData.is_male ? '남성' : '여성'}</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                      <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                      <div>
                        <div className="font-medium text-orange-900">출생지</div>
                        <div className="text-orange-700">{analysisData.city}</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-indigo-50 rounded-lg col-span-2 md:col-span-4">
                      {analysisData.is_lunar ? <Moon className="w-4 h-4 mr-2 text-indigo-600" /> : <Sun className="w-4 h-4 mr-2 text-indigo-600" />}
                      <div>
                        <div className="font-medium text-indigo-900">달력 기준</div>
                        <div className="text-indigo-700">
                          {analysisData.is_lunar ? '음력' : '양력'}
                          {analysisData.is_lunar && analysisData.is_leap_month && ' (윤달)'}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 8단계 실시간 진행상황 */}
              <AnalysisProgress
                currentStep={currentStep}
                totalSteps={8}
                stepName={stepName}
                stepResults={stepResults}
                isComplete={isComplete}
                error={error}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AnalysisPage