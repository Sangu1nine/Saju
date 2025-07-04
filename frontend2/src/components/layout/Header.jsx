import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Sparkles, 
  User, 
  Settings,
  LogOut,
  ChevronDown,
  Zap,
  Moon,
  Sun
} from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
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
    { name: '용어사전', href: '/terms', active: location.pathname === '/terms' }
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-medium border-b border-white/20' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* 로고 */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-primary-600 via-accent-500 to-primary-700 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-glow"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles className="w-7 h-7 text-white" />
              </motion.div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full animate-pulse" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary-400 rounded-full animate-bounce-slow" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold text-gradient">
                AI 사주분석
              </h1>
              <p className="text-xs text-mystic-500 -mt-1 font-medium">운명을 읽는 AI</p>
            </div>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  item.active
                    ? 'text-primary-600 bg-primary-50 shadow-md'
                    : 'text-mystic-700 hover:text-primary-600 hover:bg-white/60'
                }`}
              >
                {item.name}
                {item.active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* 우측 액션 버튼 */}
          <div className="flex items-center space-x-3">
            {/* 다크모드 토글 */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl hover:bg-white/60 transition-colors duration-200"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-mystic-600" />
              )}
            </button>

            {/* CTA 버튼 */}
            <Link
              to="/analysis"
              className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-glow transform hover:scale-105 transition-all duration-200"
            >
              <Zap className="w-4 h-4" />
              <span>무료 분석</span>
            </Link>

            {/* 사용자 메뉴 */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/60 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-accent-500 rounded-xl flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-mystic-500" />
              </button>

              {/* 드롭다운 메뉴 */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-lg rounded-2xl shadow-strong border border-white/50 py-2"
                  >
                    <button className="flex items-center space-x-3 px-4 py-3 text-mystic-700 hover:bg-primary-50 w-full transition-colors duration-200">
                      <Settings className="w-4 h-4" />
                      <span>설정</span>
                    </button>
                    <button className="flex items-center space-x-3 px-4 py-3 text-mystic-700 hover:bg-primary-50 w-full transition-colors duration-200">
                      <LogOut className="w-4 h-4" />
                      <span>로그아웃</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/60 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-mystic-700" />
              ) : (
                <Menu className="w-6 h-6 text-mystic-700" />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-white/20 bg-white/90 backdrop-blur-lg"
            >
              <div className="py-4 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-semibold transition-colors duration-200 ${
                      item.active
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-mystic-700 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* 모바일 CTA */}
                <Link
                  to="/analysis"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-3 rounded-xl font-semibold mx-4 mt-4 shadow-lg"
                >
                  <Zap className="w-4 h-4" />
                  <span>무료 분석 시작</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Header