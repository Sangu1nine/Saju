import React from 'react'
import { motion } from 'framer-motion'

const FeatureCard = ({ icon: Icon, title, description, color = 'primary' }) => {
  // 색상 매핑
  const colorClasses = {
    primary: {
      bg: 'from-primary-500 to-primary-600',
      border: 'border-primary-200/50',
      text: 'text-primary-600',
      bgLight: 'bg-primary-50/80',
      hover: 'hover:border-primary-300 hover:shadow-glow',
      glow: 'shadow-primary-200/50'
    },
    accent: {
      bg: 'from-accent-500 to-accent-600',
      border: 'border-accent-200/50',
      text: 'text-accent-600',
      bgLight: 'bg-accent-50/80',
      hover: 'hover:border-accent-300 hover:shadow-glow-accent',
      glow: 'shadow-accent-200/50'
    },
    secondary: {
      bg: 'from-mystic-500 to-mystic-600',
      border: 'border-mystic-200/50',
      text: 'text-mystic-600',
      bgLight: 'bg-mystic-50/80',
      hover: 'hover:border-mystic-300 hover:shadow-medium',
      glow: 'shadow-mystic-200/50'
    }
  }

  const colors = colorClasses[color] || colorClasses.primary

  return (
    <motion.div
      whileHover={{ 
        y: -12,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.95 }}
      className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border ${colors.border} ${colors.hover} transition-all duration-300 hover:shadow-strong overflow-hidden`}
    >
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* 상단 장식 라인 */}
      <div className={`absolute top-0 left-8 right-8 h-1 bg-gradient-to-r ${colors.bg} rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* 플로팅 파티클 효과 */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* 아이콘 */}
        <div className="mb-6">
          <motion.div
            whileHover={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: 1.1,
              transition: { duration: 0.6 }
            }}
            className={`w-16 h-16 bg-gradient-to-br ${colors.bg} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ${colors.glow}`}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          
          {/* 아이콘 주변 장식 링 */}
          <motion.div 
            className="absolute w-20 h-20 -mt-18 -ml-2 border-2 border-dashed border-primary-200/50 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* 제목 */}
        <h3 className={`text-xl font-bold text-mystic-900 mb-3 group-hover:${colors.text} transition-colors duration-300`}>
          {title}
        </h3>

        {/* 설명 */}
        <p className="text-mystic-600 leading-relaxed text-sm">
          {description}
        </p>

        {/* 하단 장식 요소 */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0.3 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`w-2 h-2 rounded-full ${colors.bgLight} group-hover:bg-gradient-to-r group-hover:${colors.bg} transition-all duration-300`}
              />
            ))}
          </div>
          
          {/* 화살표 표시 */}
          <motion.div
            initial={{ x: -5, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            className={`${colors.text} opacity-0 group-hover:opacity-100 transition-all duration-300`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* 호버 시 빛나는 효과 */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
    </motion.div>
  )
}

export default FeatureCard