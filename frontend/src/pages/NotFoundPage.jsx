import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 숫자 */}
          <div className="text-9xl font-bold text-red-500 mb-6">
            404
          </div>
          
          {/* 에러 메시지 */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            페이지를 찾을 수 없습니다
          </h1>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            <br />
            주소를 다시 확인해 주세요.
          </p>
          
          {/* 홈으로 돌아가기 버튼 */}
          <Link
            to="/"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold 
                     hover:bg-red-700 transition-colors duration-200
                     shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            홈으로 돌아가기
          </Link>
          
          {/* 추천 링크 */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">다른 페이지 둘러보기</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/analysis"
                className="text-red-600 hover:text-red-800 underline text-sm"
              >
                사주 분석하기
              </Link>
              <Link
                to="/about"
                className="text-red-600 hover:text-red-800 underline text-sm"
              >
                서비스 소개
              </Link>
              <Link
                to="/terms"
                className="text-red-600 hover:text-red-800 underline text-sm"
              >
                이용약관
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFoundPage 