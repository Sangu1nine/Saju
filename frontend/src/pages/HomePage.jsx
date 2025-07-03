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
  CheckCircle
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
      description: 'GPT-4와 사주명리학 전문가의 지식을 결합한 8단계 심층 분석',
      color: 'primary'
    },
    {
      icon: Clock,
      title: '실시간 분석 과정',
      description: '분석이 진행되는 과정을 실시간으로 확인하며 기다리는 재미',
      color: 'accent'
    },
    {
      icon: Target,
      title: '맞춤형 해석',
      description: '개인의 사주에 최적화된 구체적이고 실용적인 조언 제공',
      color: 'secondary'
    },
    {
      icon: Shield,
      title: '정확한 계산',
      description: '한국천문연구원 API를 활용한 정밀한 사주팔자 계산',
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
      content: '정말 자세하고 구체적인 분석이에요. 특히 직업 관련 조언이 매우 도움되었습니다.',
      rating: 5
    },
    {
      name: '이○○',
      age: 28,
      content: 'AI 분석이라 걱정했는데, 전문가만큼 정확하고 이해하기 쉽게 설명해주네요.',
      rating: 5
    },
    {
      name: '박○○',
      age: 45,
      content: '8단계 분석 과정을 실시간으로 볼 수 있어서 신뢰감이 높아요.',
      rating: 4
    }
  ]

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <Hero />

      {/* 특징 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              왜 <span className="text-gradient">AI 사주 분석</span>인가요?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
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
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              <span className="text-gradient">8단계 전문 분석</span> 과정
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
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
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
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
                className="btn-primary bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                무료로 분석 시작하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <Link 
                to="/terms" 
                className="text-white hover:text-white/80 font-medium underline underline-offset-4"
              >
                사주 용어 알아보기
              </Link>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-8 flex items-center justify-center text-white/80"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>회원가입 없이 바로 이용 가능</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 후기 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              사용자 <span className="text-gradient">후기</span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
            >
              준비되셨나요?
            </motion.h3>
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 mb-8"
            >
              몇 분만 투자하면 평생 도움이 될 인사이트를 얻을 수 있습니다.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link 
                to="/analysis" 
                className="btn-primary px-8 py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                나의 사주 분석하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage