import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Moon, 
  Sun, 
  Info,
  ArrowRight 
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
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* 생년월일 */}
      <div className="space-y-4">
        <div className="flex items-center mb-3">
          <Calendar className="w-5 h-5 mr-2 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">생년월일</h3>
        </div>

        {/* 양력/음력 선택 */}
        <div className="grid grid-cols-2 gap-4">
          <label className="relative">
            <input
              type="radio"
              value={false}
              {...register('is_lunar')}
              className="sr-only peer"
            />
            <div className="flex items-center justify-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all">
              <Sun className="w-5 h-5 mr-2 text-yellow-500" />
              <span className="font-medium">양력</span>
            </div>
          </label>
          
          <label className="relative">
            <input
              type="radio"
              value={true}
              {...register('is_lunar')}
              className="sr-only peer"
            />
            <div className="flex items-center justify-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all">
              <Moon className="w-5 h-5 mr-2 text-blue-500" />
              <span className="font-medium">음력</span>
            </div>
          </label>
        </div>

        {/* 날짜 입력 */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            {errors.birth_year && (
              <p className="mt-1 text-sm text-red-600">{errors.birth_year.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            {errors.birth_month && (
              <p className="mt-1 text-sm text-red-600">{errors.birth_month.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            {errors.birth_day && (
              <p className="mt-1 text-sm text-red-600">{errors.birth_day.message}</p>
            )}
          </div>
        </div>

        {/* 윤달 체크 (음력일 때만) */}
        {watchIsLunar && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center"
          >
            <input
              type="checkbox"
              {...register('is_leap_month')}
              id="is_leap_month"
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="is_leap_month" className="ml-2 text-sm text-gray-700">
              윤달입니다
            </label>
            <div className="ml-2 group relative">
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="tooltip group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                윤달은 음력에서 같은 달이 두 번 나오는 경우입니다
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 출생 시간 */}
      <div className="space-y-4">
        <div className="flex items-center mb-3">
          <Clock className="w-5 h-5 mr-2 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">출생 시간</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            {errors.birth_hour && (
              <p className="mt-1 text-sm text-red-600">{errors.birth_hour.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            {errors.birth_minute && (
              <p className="mt-1 text-sm text-red-600">{errors.birth_minute.message}</p>
            )}
          </div>
        </div>

        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <Info className="w-4 h-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-yellow-800">
              출생 시간이 정확하지 않다면 대략적인 시간을 입력해주세요. 
              시간이 정확할수록 더 정밀한 분석이 가능합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 성별 */}
      <div className="space-y-4">
        <div className="flex items-center mb-3">
          <User className="w-5 h-5 mr-2 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">성별</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="relative">
            <input
              type="radio"
              value={true}
              {...register('is_male', { required: '성별을 선택해주세요' })}
              className="sr-only peer"
            />
            <div className="flex items-center justify-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all">
              <span className="font-medium">남성</span>
            </div>
          </label>
          
          <label className="relative">
            <input
              type="radio"
              value={false}
              {...register('is_male', { required: '성별을 선택해주세요' })}
              className="sr-only peer"
            />
            <div className="flex items-center justify-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all">
              <span className="font-medium">여성</span>
            </div>
          </label>
        </div>
        {errors.is_male && (
          <p className="mt-1 text-sm text-red-600">{errors.is_male.message}</p>
        )}
      </div>

      {/* 출생 지역 */}
      <div className="space-y-4">
        <div className="flex items-center mb-3">
          <MapPin className="w-5 h-5 mr-2 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">출생 지역</h3>
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
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-blue-800">
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
        className="w-full btn-primary py-4 text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="loading-dots mr-2">
              <div style={{'--i': 0}}></div>
              <div style={{'--i': 1}}></div>
              <div style={{'--i': 2}}></div>
            </div>
            분석 시작 중...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            AI 분석 시작하기
            <ArrowRight className="w-5 h-5 ml-2" />
          </div>
        )}
      </motion.button>
    </form>
  )
}

export default SajuForm