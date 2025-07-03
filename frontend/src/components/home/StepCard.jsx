import React from 'react'
import { motion } from 'framer-motion'

const StepCard = ({ step, title, description, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      {/* 연결선 (마지막 단계 제외) */}
      {step < 8 && (
        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary-300 to-transparent z-10" />
      )}
      
      <div className="card h-full text-center">
        {/* 단계 번호 */}
        <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
          {step}
        </div>
        
        {/* 아이콘 */}
        <div className="text-2xl mb-3">{icon}</div>
        
        {/* 제목 */}
        <h3 className="font-semibold text-gray-900 mb-2 text-sm">
          {title}
        </h3>
        
        {/* 설명 */}
        <p className="text-xs text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default StepCard