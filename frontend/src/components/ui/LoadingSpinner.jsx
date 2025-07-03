import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Brain, Clock, Zap, Star } from 'lucide-react'

const LoadingSpinner = ({ 
  size = 'medium', 
  text = '로딩 중...', 
  type = 'default',
  showIcon = true 
}) => {
  // 크기별 스타일
  const sizeClasses = {
    small: {
      spinner: 'w-6 h-6',
      text: 'text-sm',
      container: 'space-y-2'
    },
    medium: {
      spinner: 'w-10 h-10',
      text: 'text-base',
      container: 'space-y-3'
    },
    large: {
      spinner: 'w-16 h-16',
      text: 'text-lg',
      container: 'space-y-4'
    }
  }

  const currentSize = sizeClasses[size]

  // 스피너 애니메이션 variants
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  // 펄스 애니메이션 variants
  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // 도트 애니메이션 variants
  const dotVariants = {
    animate: (i) => ({
      y: [0, -15, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        delay: i * 0.15,
        ease: "easeInOut"
      }
    })
  }

  // 타입별 스피너 렌더링
  const renderSpinner = () => {
    switch (type) {
      case 'brain':
        return (
          <div className="relative">
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="relative"
            >
              <div className={`${currentSize.spinner} bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-glow`}>
                <Brain className={`${size === 'large' ? 'w-8 h-8' : size === 'medium' ? 'w-6 h-6' : 'w-4 h-4'} text-white`} />
              </div>
            </motion.div>
            <motion.div
              className="absolute inset-0 border-2 border-primary-300 rounded-2xl"
              variants={spinnerVariants}
              animate="animate"
            />
          </div>
        )

      case 'sparkles':
        return (
          <div className="relative">
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="relative"
            >
              <div className={`${currentSize.spinner} bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center shadow-glow-accent`}>
                <Sparkles className={`${size === 'large' ? 'w-8 h-8' : size === 'medium' ? 'w-6 h-6' : 'w-4 h-4'} text-white`} />
              </div>
            </motion.div>
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        )

      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={dotVariants}
                animate="animate"
                className="w-3 h-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
              />
            ))}
          </div>
        )

      case 'clock':
        return (
          <motion.div
            variants={spinnerVariants}
            animate="animate"
            className="relative"
          >
            <div className={`${currentSize.spinner} bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg`}>
              <Clock className={`${size === 'large' ? 'w-8 h-8' : size === 'medium' ? 'w-6 h-6' : 'w-4 h-4'} text-white`} />
            </div>
          </motion.div>
        )

      case 'gradient':
        return (
          <motion.div
            variants={spinnerVariants}
            animate="animate"
            className={`${currentSize.spinner} rounded-full p-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 shadow-glow`}
          >
            <div className="w-full h-full bg-white rounded-full" />
          </motion.div>
        )

      case 'zap':
        return (
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="relative"
          >
            <div className={`${currentSize.spinner} bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg`}>
              <Zap className={`${size === 'large' ? 'w-8 h-8' : size === 'medium' ? 'w-6 h-6' : 'w-4 h-4'} text-white`} />
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl opacity-50"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )

      default:
        return (
          <motion.div
            variants={spinnerVariants}
            animate="animate"
            className={`${currentSize.spinner} border-4 border-mystic-200 border-t-primary-600 rounded-full`}
          />
        )
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center ${currentSize.container}`}>
      {/* 스피너 */}
      <div className="flex items-center justify-center">
        {renderSpinner()}
      </div>

      {/* 텍스트 */}
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`${currentSize.text} font-semibold text-mystic-700 text-center`}
        >
          {text}
        </motion.p>
      )}

      {/* 진행 점들 (옵션) */}
      {type === 'default' && showIcon && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex space-x-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-1.5 h-1.5 bg-primary-400 rounded-full"
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}

// 전체 화면 로딩 오버레이
export const LoadingOverlay = ({ 
  isVisible, 
  text = '로딩 중...', 
  type = 'brain' 
}) => {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="text-center">
        <LoadingSpinner size="large" text={text} type={type} />
      </div>
    </motion.div>
  )
}

// 인라인 로딩 (작은 공간용)
export const InlineLoading = ({ text = '처리 중...' }) => {
  return (
    <div className="flex items-center space-x-3">
      <LoadingSpinner size="small" type="dots" showIcon={false} />
      <span className="text-sm text-mystic-600 font-medium">{text}</span>
    </div>
  )
}

// 버튼용 로딩
export const ButtonLoading = ({ text = '처리 중...' }) => {
  return (
    <div className="flex items-center space-x-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
      />
      <span>{text}</span>
    </div>
  )
}

// 카드용 스켈레톤 로딩
export const SkeletonCard = () => {
  return (
    <div className="card animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-mystic-200 rounded-xl w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-mystic-200 rounded-xl"></div>
          <div className="h-3 bg-mystic-200 rounded-xl w-5/6"></div>
        </div>
        <div className="h-8 bg-mystic-200 rounded-xl w-1/4"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner