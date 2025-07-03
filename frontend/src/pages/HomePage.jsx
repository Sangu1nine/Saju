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
  BarChart3,
  Cpu,
  Globe,
  Play
} from 'lucide-react'

const HomePage = () => {
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
      description: 'GPT-4와 사주명리학 전문가의 지식을 결합한 8단계 심층 분석으로 정확한 결과를 제공합니다.',
    },
    {
      icon: Clock,
      title: '실시간 분석 과정',
      description: '분석이 진행되는 과정을 실시간으로 확인하며 각 단계별 결과를 즉시 확인할 수 있습니다.',
    },
    {
      icon: Target,
      title: '맞춤형 해석',
      description: '개인의 사주에 최적화된 구체적이고 실용적인 조언으로 인생의 방향을 제시합니다.',
    },
    {
      icon: Shield,
      title: '정확한 계산',
      description: '한국천문연구원 API를 활용한 정밀한 사주팔자 계산으로 신뢰할 수 있는 결과를 보장합니다.',
    }
  ]

  // 분석 단계 데이터
  const analysisSteps = [
    { step: 1, title: '기초 명식 작성', description: '사주팔자 구성 및 지지장간 분석' },
    { step: 2, title: '오행 균형 분석', description: '상생상극 관계 및 균형 평가' },
    { step: 3, title: '용신과 조후', description: '핵심 오행 및 계절 조화 분석' },
    { step: 4, title: '십신 관계 해석', description: '성격과 적성 분석' },
    { step: 5, title: '대운과 세운', description: '10년/1년 주기 운세 변화' },
    { step: 6, title: '형충파해 분석', description: '충돌 요소 및 대처 방안' },
    { step: 7, title: '구체적 해석', description: '직업/재물/인간관계별 상세 분석' },
    { step: 8, title: '종합 평가', description: '전체적 인생 방향 제시' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="section-container">
          <div className="text-center">
            {/* 배지 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-primary-200 shadow-soft mb-8"
            >
              <Cpu className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">AI 기반 전문 사주 분석</span>
              <Sparkles className="w-5 h-5 text-accent-600" />
            </motion.div>

            {/* 메인 헤드라인 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="block text-neutral-900">당신의 운명을</span>
                <span className="block text-gradient">정밀하게 분석</span>
                <span className="block text-neutral-900">해드립니다</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                전통 사주명리학과 최신 AI 기술의 완벽한 조화로<br />
                <strong className="text-primary-600">8단계 심층 분석</strong>을 통해 당신만의 인생 설계도를 제공합니다
              </p>
            </motion.div>

            {/* CTA 버튼들 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link
                to="/analysis"
                className="btn-gradient px-8 py-4 text-lg font-bold flex items-center space-x-3"
              >
                <Zap className="w-6 h-6" />
                <span>무료로 분석 시작하기</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <button className="btn-secondary px-6 py-4 flex items-center space-x-3">
                <Play className="w-5 h-5" />
                <span>서비스 소개 영상</span>
              </button>
            </motion.div>

            {/* 통계 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-neutral-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
              <Target className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">핵심 특징</span>
            </div>
            <h2 className="section-title">
              왜 <span className="text-gradient">AI 사주 분석</span>인가요?
            </h2>
            <p className="section-subtitle">
              전통 사주명리학과 최신 AI 기술의 만남으로 더욱 정확하고 구체적인 분석을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-hover p-8"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Analysis Process Section */}
      <section className="section bg-white">
        <div className="section-container">
          <div className="section-header">
            <div className="inline-flex items-center space-x-2 bg-accent-100 px-4 py-2 rounded-full mb-6">
              <BarChart3 className="w-4 h-4 text-accent-600" />
              <span className="text-sm font-semibold text-accent-700">분석 프로세스</span>
            </div>
            <h2 className="section-title">
              <span className="text-gradient">8단계 전문 분석</span> 과정
            </h2>
            <p className="section-subtitle">
              체계적이고 전문적인 분석 과정을 실시간으로 확인하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analysisSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 text-white rounded-xl flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <Sparkles className="w-20 h-20 text-white mx-auto mb-6" />
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
                className="bg-white text-primary-600 px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
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

      {/* Final CTA Section */}
      <section className="section bg-white border-t border-neutral-100">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              준비되셨나요?
            </h3>
            <p className="text-neutral-600 mb-8 text-lg max-w-2xl mx-auto">
              몇 분만 투자하면 평생 도움이 될 인사이트를 얻을 수 있습니다.
            </p>
            <Link 
              to="/analysis" 
              className="btn-gradient px-8 py-4 text-lg font-bold inline-flex items-center space-x-3"
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