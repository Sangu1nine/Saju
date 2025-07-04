import React from 'react'
import { motion } from 'framer-motion'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* 헤더 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            사주 LangGraph에 대하여
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            전통 사주학과 현대 AI 기술을 결합한 혁신적인 운세 분석 플랫폼입니다.
          </p>
        </motion.div>

        {/* 소개 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 mb-16"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              우리의 미션
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              사주 LangGraph는 수천 년간 전해져 내려온 동양의 지혜인 사주학을 
              현대적인 AI 기술로 재해석하여, 더 많은 사람들이 쉽고 정확하게 
              자신의 운명을 이해할 수 있도록 돕습니다.
            </p>
            <p className="text-gray-600 leading-relaxed">
              복잡한 사주 이론을 누구나 이해할 수 있는 형태로 제공하며, 
              개인의 성향과 미래에 대한 통찰력을 제공합니다.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              기술적 특징
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                LangGraph 기반의 고도화된 분석 엔진
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                전통 사주학 이론과 AI의 완벽한 결합
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                개인 맞춤형 상세 분석 리포트
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                실시간 분석 결과 제공
              </li>
            </ul>
          </div>
        </motion.div>

        {/* 특징 카드 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              정확한 분석
            </h3>
            <p className="text-gray-600">
              전통 사주학 이론을 바탕으로 한 정확하고 상세한 분석을 제공합니다.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              빠른 결과
            </h3>
            <p className="text-gray-600">
              AI 기술을 활용하여 몇 분 내에 상세한 분석 결과를 받아볼 수 있습니다.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              개인정보 보호
            </h3>
            <p className="text-gray-600">
              사용자의 개인정보는 철저히 보호되며 분석 목적으로만 사용됩니다.
            </p>
          </div>
        </motion.div>

        {/* 팀 소개 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            개발팀 소개
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            사주학 전문가와 AI 개발자들이 함께 만든 사주 LangGraph는 
            전통과 현대 기술의 완벽한 조화를 추구합니다. 
            지속적인 연구와 개발을 통해 더 나은 서비스를 제공하기 위해 노력하고 있습니다.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutPage 