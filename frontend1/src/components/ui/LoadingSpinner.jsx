import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Brain, Clock } from 'lucide-react'

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
      spinner: 'w-8 h-8',
      text: 'text-base',
      container: 'space-y-3'
    },
    large: {
      spinner: 'w-12 h-12',
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
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // 도트 애니메이션 variants
  const dotVariants = {
    animate: (i) => ({
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        delay: i * 0.1,
        ease: "easeInOut"
      }
    })
  }

  // 타입별 스피너 렌더링
  const renderSpinner = () => {
    switch (type) {
      case 'brain':
        return (
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="relative"
          >
            <Brain className={`${currentSize.spinner} text-primary-600`} />
            <motion.div
              className="absolute inset-0 border-2 border-primary-300 rounded-full"
              variants={spinnerVariants}
              animate="animate"
            />
          </motion.div>
        )

      case 'sparkles':
        return (
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="relative"
          >
            <Sparkles className={`${currentSize.spinner} text-accent-600`} />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )

      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={dotVariants}
                animate="animate"
                className="w-2 h-2 bg-primary-500 rounded-full"
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
            <Clock className={`${currentSize.spinner} text-blue-600`} />
          </motion.div>
        )

      case 'gradient':
        return (
          <motion.div
            variants={spinnerVariants}
            animate="animate"
            className={`${currentSize.spinner} rounded-full border-4 border-transparent bg-gradient-to-r from-primary-500 to-accent-500 p-1`}
          >
            <div className="w-full h-full bg-white rounded-full" />
          </motion.div>
        )

      default:
        return (
          <motion.div
            variants={spinnerVariants}
            animate="animate"
            className={`${currentSize.spinner} border-4 border-gray-200 border-t-primary-600 rounded-full`}
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
          className={`${currentSize.text} font-medium text-gray-700 text-center`}
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
              className="w-1 h-1 bg-gray-400 rounded-full"
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
      className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <LoadingSpinner size="large" text={text} type={type} />
    </motion.div>
  )
}

// 인라인 로딩 (작은 공간용)
export const InlineLoading = ({ text = '처리 중...' }) => {
  return (
    <div className="flex items-center space-x-2">
      <LoadingSpinner size="small" type="dots" showIcon={false} />
      <span className="text-sm text-gray-600">{text}</span>
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
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner