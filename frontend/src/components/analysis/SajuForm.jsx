import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Moon, 
  Sun, 
  Info,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react'

const SajuForm = ({ onSubmit }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      birth_year: new Date().getFullYear() - 25,
      birth_month: new Date().getMonth() + 1,
      birth_day: new Date().getDate(),
      birth_hour: 12,
      birth_minute: 0,
      is_male: true,
      city: '서울',
      is_lunar: false,
      is_leap_month: false
    }
  })

  // 상태 관리
  const [isSubmitting, setIsSubmitting] = useState(false)
  const watchIsLunar = watch('is_lunar')

  // 도시 목록
  const cities = [
    '서울', '부산', '인천', '대구', '대전', '광주', '울산',
    '수원', '창원', '고양', '용인', '성남', '청주', '안양'
  ]

  // 폼 제출 핸들러
  const onFormSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 현재 연도 기준 범위
  const currentYear = new Date().getFullYear()
  const minYear = currentYear - 100
  const maxYear = currentYear

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
        {/* 생년월일 섹션 */}
        <div className="card space-y-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mr-3">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">생년월일</h3>
          </div>

          {/* 양력/음력 선택 */}
          <div className="grid grid-cols-2 gap-4">
            <label className="relative cursor-pointer">
              <input
                type="radio"
                value={false}
                {...register('is_lunar')}
                className="sr-only peer"
              />
              <div className="flex items-center justify-center p-4 border-2 border-neutral-200 rounded-2xl cursor-pointer peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all duration-300 hover:border-primary-300">
                <Sun className="w-6 h-6 mr-3 text-amber-500" />
                <span className="font-semibold text-neutral-900">양력</span>
              </div>
            </label>
            
            <label className="relative cursor-pointer">
              <input
                type="radio"
                value={true}
                {...register('is_lunar')}
                className="sr-only peer"
              />
              <div className="flex items-center justify-center p-4 border-2 border-neutral-200 rounded-2xl cursor-pointer peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all duration-300 hover:border-primary-300">
                <Moon className="w-6 h-6 mr-3 text-blue-500" />
                <span className="font-semibold text-neutral-900">음력</span>
              </div>
            </label>
          </div>

          {/* 날짜 입력 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                년도
              </label>
              <select
                {...register('birth_year', { 
                  required: '년도를 선택해주세요',
                  min: { value: minYear, message: `${minYear}년 이후만 가능합니다` },
                  max: { value: maxYear, message: `${maxYear}년 이전만 가능합니다` }
                })}
                className="select"
              >
                {Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i).map(year => (
                  <option key={year} value={year}>{year}년</option>
                ))}
              </select>
              <AnimatePresence>
                {errors.birth_year && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.birth_year.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                월
              </label>
              <select
                {...register('birth_month', { 
                  required: '월을 선택해주세요',
                  min: { value: 1, message: '1-12월만 가능합니다' },
                  max: { value: 12, message: '1-12월만 가능합니다' }
                })}
                className="select"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <option key={month} value={month}>{month}월</option>
                ))}
              </select>
              <AnimatePresence>
                {errors.birth_month && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.birth_month.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                일
              </label>
              <select
                {...register('birth_day', { 
                  required: '일을 선택해주세요',
                  min: { value: 1, message: '1-31일만 가능합니다' },
                  max: { value: 31, message: '1-31일만 가능합니다' }
                })}
                className="select"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day}>{day}일</option>
                ))}
              </select>
              <AnimatePresence>
                {errors.birth_day && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.birth_day.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 윤달 체크 (음력일 때만) */}
          <AnimatePresence>
            {watchIsLunar && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-200"
              >
                <input
                  type="checkbox"
                  {...register('is_leap_month')}
                  id="is_leap_month"
                  className="w-5 h-5 text-primary-600 border-2 border-neutral-300 rounded focus:ring-primary-500 focus:ring-2"
                />
                <label htmlFor="is_leap_month" className="ml-3 text-sm font-medium text-neutral-700">
                  윤달입니다
                </label>
                <div className="ml-auto group relative">
                  <Info className="w-5 h-5 text-neutral-400 cursor-help" />
                  <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-neutral-800 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    윤달은 음력에서 같은 달이 두 번 나오는 경우입니다
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 출생 시간 섹션 */}
        <div className="card space-y-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl flex items-center justify-center mr-3">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">출생 시간</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                시
              </label>
              <select
                {...register('birth_hour', { 
                  required: '시간을 선택해주세요',
                  min: { value: 0, message: '0-23시만 가능합니다' },
                  max: { value: 23, message: '0-23시만 가능합니다' }
                })}
                className="select"
              >
                {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                  <option key={hour} value={hour}>
                    {String(hour).padStart(2, '0')}시
                  </option>
                ))}
              </select>
              <AnimatePresence>
                {errors.birth_hour && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.birth_hour.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                분
              </label>
              <select
                {...register('birth_minute', { 
                  min: { value: 0, message: '0-59분만 가능합니다' },
                  max: { value: 59, message: '0-59분만 가능합니다' }
                })}
                className="select"
              >
                {Array.from({ length: 60 }, (_, i) => i).map(minute => (
                  <option key={minute} value={minute}>
                    {String(minute).padStart(2, '0')}분
                  </option>
                ))}
              </select>
              <AnimatePresence>
                {errors.birth_minute && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.birth_minute.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-amber-800 leading-relaxed">
                출생 시간이 정확하지 않다면 대략적인 시간을 입력해주세요. 
                시간이 정확할수록 더 정밀한 분석이 가능합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 성별 섹션 */}
        <div className="card space-y-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">성별</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="relative cursor-pointer">
              <input
                type="radio"
                value={true}
                {...register('is_male', { required: '성별을 선택해주세요' })}
                className="sr-only peer"
              />
              <div className="flex items-center justify-center p-4 border-2 border-neutral-200 rounded-2xl cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all duration-300 hover:border-blue-300">
                <span className="font-semibold text-neutral-900">남성 👨</span>
              </div>
            </label>
            
            <label className="relative cursor-pointer">
              <input
                type="radio"
                value={false}
                {...register('is_male', { required: '성별을 선택해주세요' })}
                className="sr-only peer"
              />
              <div className="flex items-center justify-center p-4 border-2 border-neutral-200 rounded-2xl cursor-pointer peer-checked:border-pink-500 peer-checked:bg-pink-50 transition-all duration-300 hover:border-pink-300">
                <span className="font-semibold text-neutral-900">여성 👩</span>
              </div>
            </label>
          </div>
          <AnimatePresence>
            {errors.is_male && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.is_male.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 출생 지역 섹션 */}
        <div className="card space-y-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mr-3">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">출생 지역</h3>
          </div>

          <div>
            <select
              {...register('city', { required: '출생 지역을 선택해주세요' })}
              className="select"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <AnimatePresence>
              {errors.city && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.city.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-blue-800 leading-relaxed">
                출생 지역은 경도 보정을 위해 사용됩니다. 
                정확한 사주 계산을 위해 실제 출생 지역을 선택해주세요.
              </p>
            </div>
          </div>
        </div>

        {/* 제출 버튼 */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn-gradient py-5 text-lg font-bold relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="loading-dots mr-3">
                <div style={{'--i': 0}} className="bg-white w-2 h-2 rounded-full animate-pulse"></div>
                <div style={{'--i': 1}} className="bg-white w-2 h-2 rounded-full animate-pulse"></div>
                <div style={{'--i': 2}} className="bg-white w-2 h-2 rounded-full animate-pulse"></div>
              </div>
              AI 분석 시작 중...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Zap className="w-6 h-6 mr-3" />
              AI 분석 시작하기
              <ArrowRight className="w-5 h-5 ml-3" />
            </div>
          )}
        </motion.button>
      </form>
    </div>
  )
}

export default SajuForm