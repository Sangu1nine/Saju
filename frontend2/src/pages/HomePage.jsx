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
  Heart,
  Play,
  BarChart3,
  Cpu,
  Globe
} from 'lucide-react'

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

  // 통계 데이터
  const stats = [
    { number: '50,000+', label: '분석 완료', icon: Users },
    { number: '99%', label: '만족도', icon: Star },
    { number: '2분', label: '평균 분석시간', icon: Clock },
    { number: '24/7', label: '언제든 이용', icon: Shield }
  ]

  // 특징 데이터
  const features = [
    {
      icon: Brain,
      title: 'AI 기반 전문 분석',
      description: 'GPT-4와 사주명리학 전문가의 지식을 결합한 8단계 심층 분석',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Clock,
      title: '실시간 분석 과정',
      description: '분석이 진행되는 과정을 실시간으로 확인하며 각 단계별 결과를 즉시 확인',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      title: '맞춤형 해석',
      description: '개인의 사주에 최적화된 구체적이고 실용적인 조언으로 인생의 방향 제시',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: '정확한 계산',
      description: '한국천문연구원 API를 활용한 정밀한 사주팔자 계산으로 신뢰할 수 있는 결과',
      color: 'from-orange-500 to-red-500'
    }
  ]

  // 분석 단계 데이터
  const analysisSteps = [
    { step: 1, title: '기초 명식 작성', description: '사주팔자 구성 및 지지장간 분석', icon: '🎯' },
    { step: 2, title: '오행 균형 분석', description: '상생상극 관계 및 균형 평가', icon: '⚖️' },
    { step: 3, title: '용신과 조후', description: '핵심 오행 및 계절 조화 분석', icon: '🔥' },
    { step: 4, title: '십신 관계 해석', description: '성격과 적성 분석', icon: '👥' },
    { step: 5, title: '대운과 세운', description: '10년/1년 주기 운세 변화', icon: '📈' },
    { step: 6, title: '형충파해 분석', description: '충돌 요소 및 대처 방안', icon: '⚡' },
    { step: 7, title: '구체적 해석', description: '직업/재물/인간관계별 상세 분석', icon: '💼' },
    { step: 8, title: '종합 평가', description: '전체적 인생 방향 제시', icon: '🎭' }
  ]

  // 후기 데이터
  const testimonials = [
    {
      name: '김○○',
      age: 32,
      content: '정말 자세하고 구체적인 분석이에요. 특히 직업 관련 조언이 매우 도움되었습니다.',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: '이○○',
      age: 28,
      content: 'AI 분석이라 걱정했는데, 전문가만큼 정확하고 이해하기 쉽게 설명해주네요.',
      rating: 5,
      avatar: '👩‍💻'
    },
    {
      name: '박○○',
      age: 45,
      content: '8단계 분석 과정을 실시간으로 볼 수 있어서 신뢰감이 높아요.',
      rating: 4,
      avatar: '👨‍🏫'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-200 shadow-lg">
                <Cpu className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">AI 기반 전문 사주 분석</span>
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-gray-900">당신의 운명을</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                  정밀하게 분석
                </span>
                <span className="block text-gray-900">해드립니다</span>
              </h1>
              
              <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
                전통 사주명리학과 최신 AI 기술의 완벽한 조화로<br />
                <strong className="text-blue-600">8단계 심층 분석</strong>을 통해 당신만의 인생 설계도를 제공합니다
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/analysis"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <Zap className="w-6 h-6 group-hover:animate-pulse" />
                <span>무료로 분석 시작하기</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group flex items-center space-x-3 px-6 py-4 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:bg-white/80 backdrop-blur-sm transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow">
                  <Play className="w-5 h-5 text-white ml-1" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">서비스 소개</div>
                  <div className="text-sm text-gray-500">2분 영상 보기</div>
                </div>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="pt-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8 max-w-4xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {stat.number}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
              <Lightbulb className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">핵심 특징</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              왜 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI 사주 분석</span>인가요?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              전통 사주명리학과 최신 AI 기술의 만남으로 더욱 정확하고 구체적인 분석을 제공합니다.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Analysis Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
              <BarChart3 className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">분석 프로세스</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">8단계 전문 분석</span> 과정
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              체계적이고 전문적인 분석 과정을 실시간으로 확인하세요.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analysisSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Step Number */}
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl flex items-center justify-center text-sm font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="text-3xl mb-3">{step.icon}</div>
                
                {/* Content */}
                <h3 className="font-bold text-gray-900 mb-2 text-sm">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Connection Line */}
                {index < analysisSteps.length - 1 && index % 4 !== 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <Sparkles className="w-16 h-16 text-white mx-auto animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              지금 바로 나의 사주를 분석해보세요
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              AI 기반 전문 사주 분석으로 더 나은 인생의 방향을 찾아보세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/analysis" 
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <Zap className="w-6 h-6" />
                <span>무료로 분석 시작하기</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link 
                to="/terms" 
                className="text-white hover:text-white/80 font-semibold underline underline-offset-4 decoration-2"
              >
                사주 용어 알아보기
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80">
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-700">사용자 후기</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              사용자 <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">후기</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              실제 사용자들이 전하는 생생한 분석 경험담을 확인해보세요.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Content */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-2xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.age}세</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              준비되셨나요?
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              몇 분만 투자하면 평생 도움이 될 인사이트를 얻을 수 있습니다.
            </p>
            <Link 
              to="/analysis" 
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Star className="w-6 h-6" />
              <span>나의 사주 분석하기</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage