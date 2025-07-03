import React from 'react'
import { motion } from 'framer-motion'
import { Star, User } from 'lucide-react'

const TestimonialCard = ({ name, age, content, rating }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="card h-full"
    >
      {/* 별점 */}
      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      {/* 후기 내용 */}
      <blockquote className="text-gray-700 mb-4 text-sm leading-relaxed">
        "{content}"
      </blockquote>
      
      {/* 작성자 정보 */}
      <div className="flex items-center mt-auto">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
          <User className="w-4 h-4 text-gray-500" />
        </div>
        <div>
          <div className="font-medium text-gray-900 text-sm">{name}</div>
          <div className="text-xs text-gray-500">{age}세</div>
        </div>
      </div>
    </motion.div>
  )
}

export default TestimonialCard