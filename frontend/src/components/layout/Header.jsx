import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Menu, 
  X, 
  Sparkles, 
  User, 
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 메뉴 항목
  const menuItems = [
    { name: '홈', href: '/', active: location.pathname === '/' },
    { name: '사주분석', href: '/analysis', active: location.pathname === '/analysis' },
    { name: '서비스 소개', href: '/about', active: location.pathname === '/about' },
    { name: '이용약관', href: '/terms', active: location.pathname === '/terms' }
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* 로고 */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                AI 사주분석
              </h1>
              <p className="text-xs text-gray-500 -mt-1">전문가급 명리학 AI</p>
            </div>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  item.active
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
                {item.active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* 우측 액션 버튼 */}
          <div className="flex items-center space-x-4">
            {/* CTA 버튼 */}
            <Link
              to="/analysis"
              className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4" />
              <span>무료 분석</span>
            </Link>

            {/* 사용자 메뉴 (추후 구현용) */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {/* 드롭다운 메뉴 */}
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
                >
                  <button className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 w-full">
                    <Settings className="w-4 h-4" />
                    <span>설정</span>
                  </button>
                  <button className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 w-full">
                    <LogOut className="w-4 h-4" />
                    <span>로그아웃</span>
                  </button>
                </motion.div>
              )}
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden border-t border-gray-200 bg-white/95 backdrop-blur-md"
        >
          <div className="py-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  item.active
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* 모바일 CTA */}
            <Link
              to="/analysis"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-3 rounded-lg font-semibold mx-4 mt-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>무료 분석 시작</span>
            </Link>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Header