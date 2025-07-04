import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  ArrowRight, 
  Play,
  Star,
  Users,
  Clock,
  Shield,
  TrendingUp,
  Zap,
  Brain,
  Target
} from 'lucide-react'

const Hero = () => {
  const [currentStat, setCurrentStat] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // 통계 데이터
  const stats = [
    { number: '50,000+', label: '분석 완료', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { number: '99%', label: '만족도', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { number: '2분', label: '평균 분석시간', icon: Clock, color: 'from-green-500 to-emerald-500' },
    { number: '24/7', label: '언제든 이용', icon: Shield, color: 'from-purple-500 to-pink-500' }
  ]

  // 통계 로테이션
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // 마우스 위치 추적
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // 애니메이션 variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 동적 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-primary-50/30">
        {/* 움직이는 그라데이션 오브 */}
        <motion.div 
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-r from-primary-200/40 to-accent-200/40 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-r from-accent-200/40 to-primary-200/40 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* 마우스 따라다니는 효과 */}
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-primary-300/20 to-accent-300/20 rounded-full blur-2xl pointer-events-none"
          animate={{
            x: mousePosition.x - 128,
            y: mousePosition.y - 128,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20
          }}
        />

        {/* 플로팅 아이콘들 */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 text-4xl opacity-60"
        >
          🎯
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-40 right-20 text-3xl opacity-60"
          style={{ animationDelay: '1s' }}
        >
          ⚖️
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-40 left-20 text-3xl opacity-60"
          style={{ animationDelay: '2s' }}
        >
          🔥
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-20 right-10 text-4xl opacity-60"
          style={{ animationDelay: '3s' }}
        >
          💫
        </motion.div>

        {/* 격자 패턴 */}
        <div className="absolute inset-0 bg-pattern opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* 배지 */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100/80 to-accent-100/80 backdrop-blur-sm px-6 py-3 rounded-full border border-primary-200/50 shadow-soft">
              <Brain className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">
                AI 기반 전문 사주 분석 서비스
              </span>
              <TrendingUp className="w-5 h-5 text-accent-600" />
            </div>
          </motion.div>

          {/* 메인 헤드라인 */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              <span className="block text-mystic-900">당신의 운명을</span>
              <span className="block text-gradient text-balance">
                정밀하게 분석
              </span>
              <span className="block text-mystic-900">해드립니다</span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-mystic-600 leading-relaxed">
              전통 사주명리학과 최신 AI 기술의 완벽한 조화로<br />
              <strong className="text-gradient-accent">8단계 심층 분석</strong>을 통해 당신만의 인생 설계도를 제공합니다
            </p>
          </motion.div>

          {/* CTA 버튼들 */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/analysis"
              className="group relative bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-glow transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Zap className="w-6 h-6 group-hover:animate-pulse relative z-10" />
              <span className="relative z-10">무료로 분석 시작하기</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </Link>
            
            <button className="group flex items-center space-x-3 px-6 py-4 rounded-2xl border-2 border-mystic-200 hover:border-primary-300 hover:bg-white/80 backdrop-blur-sm transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full shadow-lg flex items-center justify-center group-hover:shadow-glow transition-shadow">
                <Play className="w-5 h-5 text-white ml-1" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-mystic-900">서비스 소개</div>
                <div className="text-sm text-mystic-500">2분 영상 보기</div>
              </div>
            </button>
          </motion.div>

          {/* 통계 섹션 */}
          <motion.div variants={itemVariants} className="pt-12">
            <div className="glass-strong rounded-3xl shadow-strong border border-white/50 p-6 sm:p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  const isActive = currentStat === index
                  return (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ 
                        scale: isActive ? 1.1 : 1,
                        opacity: isActive ? 1 : 0.7
                      }}
                      transition={{ duration: 0.5 }}
                      className={`text-center p-4 rounded-2xl transition-all duration-500 ${
                        isActive 
                          ? 'bg-gradient-to-br from-white/80 to-primary-50/80 border-2 border-primary-200 shadow-medium' 
                          : 'hover:bg-white/40'
                      }`}
                    >
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl flex items-center justify-center bg-gradient-to-br ${stat.color} ${
                        isActive ? 'shadow-glow' : 'shadow-md'
                      } transition-all duration-500`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`text-2xl font-bold transition-colors duration-500 ${
                        isActive ? 'text-gradient' : 'text-mystic-900'
                      }`}>
                        {stat.number}
                      </div>
                      <div className="text-sm text-mystic-600 font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* 신뢰성 지표 */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center items-center gap-8 text-sm text-mystic-500 pt-8">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>100% 무료</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-amber-500" />
              <span>전문가 수준 분석</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>실시간 처리</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-purple-500" />
              <span>개인정보 보호</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-mystic-500 font-medium">더 알아보기</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-mystic-300 rounded-full flex justify-center bg-white/50 backdrop-blur-sm"
          >
            <div className="w-1 h-3 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero