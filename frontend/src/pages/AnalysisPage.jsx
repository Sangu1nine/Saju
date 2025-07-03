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
  X,
  Zap,
  Brain,
  Target,
  Star,
  CheckCircle,
  Shield,
  Award,
  Info
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
      toast.success('🔮 8단계 전문 사주 분석을 시작합니다!')
      
      // 스트리밍 분석 시작
      await startStreamingAnalysis(formData, (streamData) => {
        console.log('Stream data:', streamData)
        
        switch (streamData.type) {
          case 'start':
            setCurrentStep(0)
            setStepName('분석 시작')
            setAnalysisId(streamData.analysis_id)
            toast('✨ 분석이 시작되었습니다!', { icon: '🚀' })
            break
            
          case 'step_start':
            setCurrentStep(streamData.step)
            setStepName(streamData.step_name)
            toast(`🔄 ${streamData.step}단계: ${streamData.step_name}`, { icon: '⚡' })
            break
            
          case 'step_complete':
            setStepResults(prev => ({
              ...prev,
              [`step${streamData.step}`]: streamData.result
            }))
            toast.success(`✅ ${streamData.step}단계 완료: ${streamData.step_name}`)
            break
            
          case 'complete':
            setIsComplete(true)
            setCurrentStep(8)
            setStepName('분석 완료')
            toast.success('🎉 모든 분석이 완료되었습니다!')
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
    toast('⏹️ 분석이 취소되었습니다.')
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Section */}
      <section className="header-section">
        <div className="section-container py-12">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-neutral-900">
                <span className="text-gradient">8단계 AI 사주 분석</span>
              </h1>
            </div>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
              단계별 실시간 분석으로 전문가 수준의 상세한 사주 해석을 제공합니다.
            </p>
            
            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="badge-primary">
                <Brain className="w-4 h-4 mr-2" />
                AI 기반
              </div>
              <div className="badge-success">
                <Target className="w-4 h-4 mr-2" />
                정밀 분석
              </div>
              <div className="badge-accent">
                <Star className="w-4 h-4 mr-2" />
                전문가급
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="section-container py-12">
        <AnimatePresence mode="wait">
          {!isAnalyzing ? (
            /* Input Form Section */
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="grid-section"
            >
              {/* Form Card */}
              <div className="grid-main">
                <div className="card-section">
                  <div className="bg-gradient-to-r from-primary-600 to-accent-600 px-8 py-8">
                    <h2 className="text-2xl font-bold text-white mb-3 flex items-center">
                      <Calendar className="w-6 h-6 mr-3" />
                      출생 정보 입력
                    </h2>
                    <p className="text-primary-100">
                      정확한 출생 정보로 더욱 정밀한 사주 분석을 받아보세요.
                    </p>
                  </div>
                  
                  <div className="p-8">
                    <SajuForm onSubmit={handleSubmit} />
                  </div>
                </div>
              </div>

              {/* Info Sidebar */}
              <div className="grid-sidebar space-y-6">
                {/* 8단계 분석 과정 */}
                <div className="card">
                  <h3 className="font-bold text-neutral-900 mb-4 flex items-center text-lg">
                    <Zap className="w-5 h-5 mr-2 text-primary-600" />
                    8단계 전문 분석 과정
                  </h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { step: 1, name: '기초 명식 작성' },
                      { step: 2, name: '오행 균형 분석' },
                      { step: 3, name: '용신과 조후' },
                      { step: 4, name: '십신 관계 해석' },
                      { step: 5, name: '대운과 세운' },
                      { step: 6, name: '형충파해 분석' },
                      { step: 7, name: '구체적 해석' },
                      { step: 8, name: '종합 평가' }
                    ].map((item) => (
                      <div key={item.step} className="flex items-center">
                        <span className="inline-flex items-center justify-center w-7 h-7 bg-gradient-to-br from-primary-500 to-accent-500 text-white rounded-xl text-xs font-bold mr-3">
                          {item.step}
                        </span>
                        <span className="font-medium text-neutral-700">{item.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-200">
                    <div className="flex items-center justify-between text-xs text-neutral-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>예상 소요 시간: 5-7분</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 서비스 특징 */}
                <div className="card">
                  <h3 className="font-bold text-neutral-900 mb-4 text-lg">서비스 특징</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm text-neutral-700">100% 무료 서비스</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-primary-500" />
                      <span className="text-sm text-neutral-700">개인정보 보호</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-accent-500" />
                      <span className="text-sm text-neutral-700">전문가급 분석</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <span className="text-sm text-neutral-700">실시간 결과 확인</span>
                    </div>
                  </div>
                </div>

                {/* 개인정보 보호 안내 */}
                <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-emerald-900 mb-2">개인정보 보호</h4>
                      <p className="text-sm text-emerald-800 leading-relaxed">
                        모든 개인정보는 암호화되어 안전하게 보호되며, 분석 완료 후 자동 삭제됩니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Analysis Progress Section */
            <motion.div
              key="analysis"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Cancel Button */}
              {!isComplete && (
                <div className="flex justify-end mb-6">
                  <button
                    onClick={handleCancel}
                    className="btn-secondary flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    분석 취소
                  </button>
                </div>
              )}

              {/* Analysis Info Card */}
              {analysisData && (
                <motion.div 
                  className="card mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-bold text-neutral-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-primary-600" />
                    분석 대상 정보
                    {analysisId && (
                      <span className="ml-auto text-xs text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full font-medium">
                        ID: {analysisId.slice(-8)}
                      </span>
                    )}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center p-3 bg-primary-50 rounded-xl border border-primary-200">
                      <Calendar className="w-4 h-4 mr-2 text-primary-600" />
                      <div>
                        <div className="font-semibold text-primary-900">생년월일</div>
                        <div className="text-primary-700">
                          {analysisData.birth_year}.{analysisData.birth_month}.{analysisData.birth_day}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                      <Clock className="w-4 h-4 mr-2 text-emerald-600" />
                      <div>
                        <div className="font-semibold text-emerald-900">출생시간</div>
                        <div className="text-emerald-700">
                          {String(analysisData.birth_hour).padStart(2, '0')}:
                          {String(analysisData.birth_minute).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-accent-50 rounded-xl border border-accent-200">
                      <User className="w-4 h-4 mr-2 text-accent-600" />
                      <div>
                        <div className="font-semibold text-accent-900">성별</div>
                        <div className="text-accent-700">{analysisData.is_male ? '남성' : '여성'}</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <MapPin className="w-4 h-4 mr-2 text-amber-600" />
                      <div>
                        <div className="font-semibold text-amber-900">출생지</div>
                        <div className="text-amber-700">{analysisData.city}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Analysis Progress */}
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