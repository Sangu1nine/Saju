import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin,
  Github,
  Twitter,
  Facebook,
  Instagram,
  Heart,
  Shield,
  Zap,
  Award,
  Star
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  // 링크 섹션
  const footerSections = [
    {
      title: '서비스',
      links: [
        { name: '사주 분석', href: '/analysis' },
        { name: '서비스 소개', href: '/about' },
        { name: '이용 방법', href: '/how-to-use' },
        { name: 'FAQ', href: '/faq' }
      ]
    },
    {
      title: '정보',
      links: [
        { name: '이용약관', href: '/terms' },
        { name: '개인정보처리방침', href: '/privacy' },
        { name: '서비스 약관', href: '/service-terms' },
        { name: '고객센터', href: '/support' }
      ]
    },
    {
      title: '회사',
      links: [
        { name: '회사 소개', href: '/company' },
        { name: '팀 소개', href: '/team' },
        { name: '채용 정보', href: '/careers' },
        { name: '파트너십', href: '/partnership' }
      ]
    }
  ]

  // 소셜 미디어 링크
  const socialLinks = [
    { name: 'Github', icon: Github, href: '#', color: 'hover:text-gray-900' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-500' },
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' }
  ]

  // 특징 포인트
  const features = [
    { icon: Shield, text: '100% 무료 서비스', color: 'text-emerald-500' },
    { icon: Zap, text: '실시간 AI 분석', color: 'text-blue-500' },
    { icon: Award, text: '전문가급 정확도', color: 'text-purple-500' }
  ]

  return (
    <footer className="bg-gradient-to-br from-mystic-900 via-mystic-800 to-mystic-900 text-mystic-300 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-5" />
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl"
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

      {/* 메인 푸터 */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* 브랜드 섹션 */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200 shadow-glow">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">
                  AI 사주분석
                </h1>
                <p className="text-sm text-mystic-400 -mt-1">운명을 읽는 AI</p>
              </div>
            </Link>

            <p className="text-mystic-400 mb-6 leading-relaxed">
              전통 사주명리학과 최신 AI 기술의 만남으로 누구나 쉽게 이용할 수 있는 
              전문적인 사주 분석 서비스를 제공합니다.
            </p>

            {/* 특징 포인트 */}
            <div className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <feature.icon className={`w-4 h-4 ${feature.color}`} />
                  <span className="text-sm text-mystic-300">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* 소셜 미디어 */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 bg-mystic-800 hover:bg-mystic-700 rounded-xl flex items-center justify-center transition-all duration-200 ${social.color} border border-mystic-700 hover:border-mystic-600`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* 링크 섹션들 */}
          {footerSections.map((section, sectionIndex) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-white font-bold mb-6 text-lg">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                  >
                    <Link
                      to={link.href}
                      className="text-mystic-400 hover:text-primary-400 transition-colors duration-200 text-sm flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 연락처 정보 */}
        <div className="mt-12 pt-8 border-t border-mystic-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">이메일</p>
                <p className="text-sm text-mystic-400">contact@ai-saju.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">고객센터</p>
                <p className="text-sm text-mystic-400">1588-0000 (평일 9-18시)</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">주소</p>
                <p className="text-sm text-mystic-400">서울시 강남구 테헤란로 123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 저작권 */}
      <div className="relative border-t border-mystic-700 bg-mystic-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-mystic-400">
              <span>© {currentYear} AI 사주분석. All rights reserved.</span>
              <span className="hidden md:inline">|</span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>in Korea</span>
              </span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-mystic-400">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>서비스 정상 운영 중</span>
              </div>
              <div className="flex items-center space-x-1 text-mystic-500">
                <Star className="w-3 h-3" />
                <span>v2.1.0</span>
              </div>
            </div>
          </div>

          {/* 법적 고지 */}
          <div className="mt-4 pt-4 border-t border-mystic-800">
            <p className="text-xs text-mystic-500 leading-relaxed">
              본 서비스는 엔터테인먼트 목적으로 제공되며, 의학적, 법적, 재정적 조언을 대체하지 않습니다. 
              중요한 결정은 반드시 전문가와 상담하시기 바랍니다. 
              AI 분석 결과의 정확성을 보장하지 않으며, 서비스 이용에 따른 결과에 대해 책임지지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer