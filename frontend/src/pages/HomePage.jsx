import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Brain, 
  Clock, 
  Target, 
  Users, 
  Shield,
  ArrowRight,
  CheckCircle,
  Zap,
  Star,
  TrendingUp,
  Award,
  Lightbulb,
  Heart
} from 'lucide-react'

import Hero from '../components/home/Hero'
import FeatureCard from '../components/home/FeatureCard'
import StepCard from '../components/home/StepCard'
import TestimonialCard from '../components/home/TestimonialCard'

const HomePage = () => {
  // 애니메이션 variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  // 특징 데이터
  const features = [
    {
      icon: Brain,
      title: 'AI 기반 전문 분석',
      description: 'GPT-4와 사주명리학 전문가의 지식을 결합한 8단계 심층 분석으로 정확하고 상세한 해석을 제공합니다.',
      color: 'primary'
    },
    {
      icon: Clock,
      title: '실시간 분석 과정',
      description: '분석이 진행되는 과정을 실시간으로 확인하며 각 단계별 결과를 즉시 받아볼 수 있습니다.',
      color: 'accent'
    },
    {
      icon: Target,
      title: '맞춤형 해석',
      description: '개인의 사주에 최적화된 구체적이고 실용적인 조언으로 인생의 방향을 제시합니다.',
      color: 'secondary'
    },
    {
      icon: Shield,
      title: '정확한 계산',
      description: '한국천문연구원 API를 활용한 정밀한 사주팔자 계산으로 신뢰할 수 있는 결과를 보장합니다.',
      color: 'primary'
    }
  ]

  // 분석 단계 데이터
  const analysisSteps = [
    {
      step: 1,
      title: '기초 명식 작성',
      description: '사주팔자 구성 및 지지장간 분석',
      icon: '🎯'
    },
    {
      step: 2,
      title: '오행 균형 분석',
      description: '상생상극 관계 및 균형 평가',
      icon: '⚖️'
    },
    {
      step: 3,
      title: '용신과 조후',
      description: '핵심 오행 및 계절 조화 분석',
      icon: '🔥'
    },
    {
      step: 4,
      title: '십신 관계 해석',
      description: '성격과 적성 분석',
      icon: '👥'
    },
    {
      step: 5,
      title: '대운과 세운',
      description: '10년/1년 주기 운세 변화',
      icon: '📈'
    },
    {
      step: 6,
      title: '형충파해 분석',
      description: '충돌 요소 및 대처 방안',
      icon: '⚡'
    },
    {
      step: 7,
      title: '구체적 해석',
      description: '직업/재물/인간관계별 상세 분석',
      icon: '💼'
    },
    {
      step: 8,
      title: '종합 평가',
      description: '전체적 인생 방향 제시',
      icon: '🎭'
    }
  ]

  // 후기 데이터
  const testimonials = [
    {
      name: '김○○',
      age: 32,
      content: '정말 자세하고 구체적인 분석이에요. 특히 직업 관련 조언이 매우 도움되었습니다. AI가 이렇게 정확할 줄 몰랐어요!',
      rating: 5
    },
    {
      name: '이○○',
      age: 28,
      content: 'AI 분석이라 걱정했는데, 전문가만큼 정확하고 이해하기 쉽게 설명해주네요. 실시간으로 보는 재미도 있고요.',
      rating: 5
    },
    {
      name: '박○○',
      age: 45,
      content: '8단계 분석 과정을 실시간으로 볼 수 있어서 신뢰감이 높아요. 결과도 매우 만족스럽습니다.',
      rating: 4
    }
  ]

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <Hero />

      {/* 특징 섹션 */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-accent-100 px-4 py-2 rounded-full border border-primary-200">
                <Lightbulb className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-semibold text-primary-700">왜 선택해야 할까요?</span>
              </div>
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-mystic-900 mb-4"
            >
              왜 <span className="text-gradient">AI 사주 분석</span>인가요?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-mystic-600 max-w-2xl mx-auto"
            >
              전통 사주명리학과 최신 AI 기술의 만남으로 더욱 정확하고 구체적인 분석을 제공합니다.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 분석 과정 섹션 */}
      <section className="py-20 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-100 to-primary-100 px-4 py-2 rounded-full border border-accent-200">
                <TrendingUp className="w-4 h-4 text-accent-600" />
                <span className="text-sm font-semibold text-accent-700">분석 프로세스</span>
              </div>
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-mystic-900 mb-4"
            >
              <span className="text-gradient">8단계 전문 분석</span> 과정
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-mystic-600 max-w-2xl mx-auto"
            >
              체계적이고 전문적인 분석 과정을 실시간으로 확인하세요.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {analysisSteps.map((step, index) => (
              <motion.div key={index} variants={itemVariants}>
                <StepCard {...step} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-700 relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10" />
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-6">
              <Sparkles className="w-16 h-16 text-white mx-auto animate-pulse" />
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              지금 바로 나의 사주를 분석해보세요
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              AI 기반 전문 사주 분석으로 더 나은 인생의 방향을 찾아보세요.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                to="/analysis" 
                className="group relative bg-white text-primary-600 px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-accent-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center space-x-3">
                  <Zap className="w-6 h-6" />
                  <span>무료로 분석 시작하기</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              
              <Link 
                to="/terms" 
                className="text-white hover:text-white/80 font-semibold underline underline-offset-4 decoration-2 hover:decoration-white/80 transition-colors duration-200"
              >
                사주 용어 알아보기
              </Link>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>회원가입 없이 바로 이용</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>개인정보 보호</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>전문가급 분석</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 후기 섹션 */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full border border-yellow-200">
                <Heart className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-700">사용자 후기</span>
              </div>
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-mystic-900 mb-4"
            >
              사용자 <span className="text-gradient">후기</span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-mystic-600 max-w-2xl mx-auto"
            >
              실제 사용자들이 전하는 생생한 분석 경험담을 확인해보세요.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 최종 CTA */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-primary-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold text-mystic-900 mb-4"
            >
              준비되셨나요?
            </motion.h3>
            <motion.p 
              variants={itemVariants}
              className="text-mystic-600 mb-8"
            >
              몇 분만 투자하면 평생 도움이 될 인사이트를 얻을 수 있습니다.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link 
                to="/analysis" 
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-glow transform hover:scale-105 transition-all duration-300"
              >
                <Star className="w-6 h-6" />
                <span>나의 사주 분석하기</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage