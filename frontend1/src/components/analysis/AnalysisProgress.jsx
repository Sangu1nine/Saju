import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ChevronDown, 
  ChevronUp,
  X,
  Sparkles,
  Eye,
  FileText,
  Beaker,
  Users,
  TrendingUp,
  Shield,
  Briefcase,
  Star
} from 'lucide-react'

const AnalysisProgress = ({ 
  currentStep = 0, 
  totalSteps = 8, 
  stepName = "분석 준비", 
  stepResults = {},
  isComplete = false,
  error = null 
}) => {
  const [expandedStep, setExpandedStep] = useState(null)
  const [showResults, setShowResults] = useState(false)

  // 8단계 분석 단계 정의
  const analysisSteps = [
    {
      id: 1,
      name: "기초 명식 작성",
      description: "사주팔자의 기본 구조를 분석합니다",
      icon: FileText,
      color: "blue",
      estimatedTime: "30초"
    },
    {
      id: 2,
      name: "오행 균형 분석",
      description: "목화토금수의 균형과 상생상극을 파악합니다",
      icon: Beaker,
      color: "green",
      estimatedTime: "45초"
    },
    {
      id: 3,
      name: "용신과 조후",
      description: "핵심 오행과 계절적 조화를 분석합니다",
      icon: Sparkles,
      color: "purple",
      estimatedTime: "40초"
    },
    {
      id: 4,
      name: "십신 관계 해석",
      description: "성격과 적성을 십신을 통해 분석합니다",
      icon: Users,
      color: "pink",
      estimatedTime: "50초"
    },
    {
      id: 5,
      name: "대운과 세운",
      description: "현재와 미래의 운세 흐름을 예측합니다",
      icon: TrendingUp,
      color: "indigo",
      estimatedTime: "55초"
    },
    {
      id: 6,
      name: "형충파해 분석",
      description: "충돌 요소와 해소 방안을 찾습니다",
      icon: Shield,
      color: "orange",
      estimatedTime: "35초"
    },
    {
      id: 7,
      name: "구체적 해석",
      description: "직업, 재물, 건강 등 실생활 조언을 제공합니다",
      icon: Briefcase,
      color: "teal",
      estimatedTime: "60초"
    },
    {
      id: 8,
      name: "종합 평가",
      description: "모든 분석을 종합한 최종 평가를 합니다",
      icon: Star,
      color: "amber",
      estimatedTime: "45초"
    }
  ]

  const getStepStatus = (stepId) => {
    if (error && currentStep === stepId) return 'error'
    if (currentStep > stepId || isComplete) return 'completed'
    if (currentStep === stepId) return 'active'
    return 'pending'
  }

  const getStepIcon = (step) => {
    const status = getStepStatus(step.id)
    const IconComponent = step.icon
    
    if (status === 'completed') {
      return <CheckCircle className="w-6 h-6" />
    } else if (status === 'error') {
      return <AlertTriangle className="w-6 h-6" />
    } else if (status === 'active') {
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <IconComponent className="w-6 h-6" />
        </motion.div>
      )
    }
    return <IconComponent className="w-6 h-6" />
  }

  const getStepColorClasses = (step, status) => {
    const colorMap = {
      blue: {
        completed: 'bg-blue-500 text-white border-blue-500',
        active: 'bg-blue-100 text-blue-700 border-blue-300 shadow-blue-200',
        pending: 'bg-gray-100 text-gray-500 border-gray-200',
        error: 'bg-red-500 text-white border-red-500'
      },
      green: {
        completed: 'bg-green-500 text-white border-green-500',
        active: 'bg-green-100 text-green-700 border-green-300 shadow-green-200',
        pending: 'bg-gray-100 text-gray-500 border-gray-200',
        error: 'bg-red-500 text-white border-red-500'
      },
      purple: {
        completed: 'bg-purple-500 text-white border-purple-500',
        active: 'bg-purple-100 text-purple-700 border-purple-300 shadow-purple-200',
        pending: 'bg-gray-100 text-gray-500 border-gray-200',
        error: 'bg-red-500 text-white border-red-500'
      },
      pink: {
        completed: 'bg-pink-500 text-white border-pink-500',
        active: 'bg-pink-100 text-pink-700 border-pink-300 shadow-pink-200',
        pending: 'bg-gray-100 text-gray-500 border-gray-200',
        error: 'bg-red-500 text-white border-red-500'
      },
      indigo: {
        completed: 'bg-indigo-500 text-white border-indigo-500',
        active: 'bg-indigo-100 text-indigo-700 border-indigo-300 shadow-indigo-200',
        pending: 'bg-gray-100 text-gray-500 border-gray-200',
        error: 'bg-red-500 text-white border-red-500'
      },
      orange: {
        completed: 'bg-orange-500 text-white border-orange-500',
        active: 'bg-orange-100 text-orange-700 border-orange-300 shadow-orange-200',
        pending: 'bg-gray-100 text-gray-500 border-gray-200',
        error: 'bg-red-500 text-white border-red-500'
      },
      teal: {
        completed: 'bg-teal-500 text-white border-teal-500',
        active: 'bg-teal-100 text-teal-700 border-teal-300 shadow-teal-200',
        pending: 'bg-gray-100 text-gray-500 border-gray-200',
        error: 'bg-red-500 text-white border-red-500'
      },
      amber: {
        completed: 'bg-amber-500 text-white border-amber-500',
        active: 'bg-amber-100 text-amber-700 border-amber-300 shadow-amber-200',
        pending: 'bg-gray-100 text-gray-500 border-gray-200',
        error: 'bg-red-500 text-white border-red-500'
      }
    }
    
    return colorMap[step.color][status]
  }

  const progressPercentage = isComplete ? 100 : (currentStep / totalSteps) * 100

  const toggleStepExpansion = (stepId) => {
    if (stepResults[`step${stepId}`]) {
      setExpandedStep(expandedStep === stepId ? null : stepId)
    }
  }

  useEffect(() => {
    if (Object.keys(stepResults).length > 0) {
      setShowResults(true)
    }
  }, [stepResults])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* 전체 진행률 헤더 */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center space-x-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-primary-600" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900">
            8단계 전문 사주 분석
          </h2>
        </div>
        
        <p className="text-lg text-gray-600">
          각 단계별로 상세한 분석 결과를 실시간으로 확인하세요
        </p>
        
        {/* 전체 진행률 바 */}
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              전체 진행률
            </span>
            <span className="text-sm font-medium text-primary-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* 현재 상태 표시 */}
        <motion.div 
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-50 rounded-full border"
          key={currentStep + stepName}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Clock className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-medium text-primary-700">
            {isComplete ? '분석 완료!' : `현재: ${stepName}`}
          </span>
        </motion.div>
      </motion.div>

      {/* 단계별 진행 상황 */}
      <div className="space-y-4">
        {analysisSteps.map((step, index) => {
          const status = getStepStatus(step.id)
          const hasResult = stepResults[`step${step.id}`]
          const isExpanded = expandedStep === step.id
          
          return (
            <motion.div
              key={step.id}
              className={`rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                status === 'active' ? 'shadow-lg' : 'shadow-sm hover:shadow-md'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* 단계 헤더 */}
              <div 
                className={`p-4 border transition-all duration-300 cursor-pointer ${getStepColorClasses(step, status)} ${
                  hasResult ? 'hover:opacity-80' : ''
                }`}
                onClick={() => toggleStepExpansion(step.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getStepIcon(step)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold">
                          {step.id}. {step.name}
                        </h3>
                        {status === 'active' && (
                          <motion.div
                            className="flex space-x-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-current rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                      </div>
                      <p className="text-sm opacity-80 mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-xs opacity-70">
                      {step.estimatedTime}
                    </span>
                    {hasResult && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Eye className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* 단계 결과 (확장 시 표시) */}
              <AnimatePresence>
                {isExpanded && hasResult && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border-t"
                  >
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-primary-600" />
                        분석 결과
                      </h4>
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                          {stepResults[`step${step.id}`]?.content}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* 결과 요약 버튼 */}
      <AnimatePresence>
        {showResults && Object.keys(stepResults).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-gray-900">
                  실시간 분석 결과
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                완료된 {Object.keys(stepResults).length}개 단계의 분석 결과를 확인할 수 있습니다.
                각 단계를 클릭하여 상세 내용을 확인해보세요.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3 border">
                  <div className="font-semibold text-green-600">완료 단계</div>
                  <div className="text-lg font-bold text-gray-900">
                    {Object.keys(stepResults).length}/{totalSteps}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border">
                  <div className="font-semibold text-blue-600">진행률</div>
                  <div className="text-lg font-bold text-gray-900">
                    {Math.round(progressPercentage)}%
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border">
                  <div className="font-semibold text-purple-600">분석 품질</div>
                  <div className="text-lg font-bold text-gray-900">전문가급</div>
                </div>
                <div className="bg-white rounded-lg p-3 border">
                  <div className="font-semibold text-orange-600">예상 완료</div>
                  <div className="text-lg font-bold text-gray-900">5-7분</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 에러 표시 */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-red-50 border border-red-200 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="text-lg font-semibold text-red-900">
                  분석 중 오류 발생
                </h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 완료 축하 메시지 */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center space-y-4"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6, repeat: 3 }}
            >
              <Star className="w-16 h-16 text-yellow-500 mx-auto" />
            </motion.div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-2xl font-bold text-green-900 mb-2">
                🎉 분석 완료!
              </h3>
              <p className="text-green-700">
                8단계 전문 사주 분석이 성공적으로 완료되었습니다.
                <br />
                상세한 결과를 확인해보세요.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AnalysisProgress