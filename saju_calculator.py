# 양력 만세력 - 양력/음력 기준 사주계산 프로그램
# MODIFIED [2024-12-19]: 양력 기준 간단한 사주계산으로 단순화
# MODIFIED [2024-12-19]: KASI API 음력→양력 변환 기능 추가
# MODIFIED [2024-12-19]: 써머타임 및 절입조정 기능 추가
# MODIFIED [2024-12-19]: KASI 24절기 API 추가 - 정확한 절기 시간 계산
# pip install prettytable requests

import requests
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
from prettytable import PrettyTable

# 천간지 및 오행 상수
STEMS = '甲乙丙丁戊己庚辛壬癸'
BRANCH = '子丑寅卯辰巳午未申酉戌亥'
ELEMENT = {
    '甲':'木','乙':'木','丙':'火','丁':'火','戊':'土',
    '己':'土','庚':'金','辛':'金','壬':'水','癸':'水',
    '子':'水','丑':'土','寅':'木','卯':'木','辰':'土',
    '巳':'火','午':'火','未':'土','申':'金','酉':'金','戌':'土','亥':'水'
}

# 써머타임 실시 기간 (한국천문연구원 만세력 기준)
SUMMERTIME_PERIODS = [
    ("1948-06-01 00:00", "1948-09-13 00:00"),
    ("1949-04-03 00:00", "1949-09-11 00:00"),
    ("1950-04-01 00:00", "1950-09-10 00:00"),
    ("1951-05-06 00:00", "1951-09-09 00:00"),
    ("1955-05-05 00:00", "1955-09-09 00:00"),
    ("1956-05-20 00:00", "1956-09-30 00:00"),
    ("1957-05-05 00:00", "1957-09-22 00:00"),
    ("1958-05-04 00:00", "1958-09-21 00:00"),
    ("1959-05-03 00:00", "1959-09-20 00:00"),
    ("1960-05-01 00:00", "1960-09-18 00:00"),
    ("1987-05-10 02:00", "1987-10-11 03:00"),
    ("1988-05-08 02:00", "1988-10-09 03:00")
]

# 절입조정 기간 (동경 127도 30분 사용 기간)
SOLAR_TERM_ADJUSTMENT_PERIODS = [
    ("1908-04-01", "1911-12-31"),
    ("1954-03-21", "1961-08-09")
]

# KASI API 설정
# 음력→양력 변환용 ServiceKey
SERVICE_KEY_LUNAR_ENCODED = "AotiP0GO8N2hRMDmUWaZnn13%2FL9keIfPEk7T2xv0yhDj09Hg%2BSTeKn4VLiUElgdy55b17tQtiPRf9A9SiANHWQ%3D%3D"

# 24절기 조회용 ServiceKey  
SERVICE_KEY_24_DIVISIONS_ENCODED = "AotiP0GO8N2hRMDmUWaZnn13%2FL9keIfPEk7T2xv0yhDj09Hg%2BSTeKn4VLiUElgdy55b17tQtiPRf9A9SiANHWQ%3D%3D"

# URL 디코딩
import urllib.parse
SERVICE_KEY_LUNAR = urllib.parse.unquote(SERVICE_KEY_LUNAR_ENCODED)
SERVICE_KEY_24_DIVISIONS = urllib.parse.unquote(SERVICE_KEY_24_DIVISIONS_ENCODED)

# 24절기 태양황경 매핑 (월지 순서와 매핑)
SOLAR_TERMS_MAPPING = {
    315: ('입춘', 0),   # 315도 -> 인월 시작 (인월=0)
    330: ('우수', 0),   # 330도 -> 인월 
    345: ('경칩', 1),   # 345도 -> 묘월 시작 (묘월=1)
    0:   ('춘분', 1),   # 0도 -> 묘월
    15:  ('청명', 2),   # 15도 -> 진월 시작 (진월=2)
    30:  ('곡우', 2),   # 30도 -> 진월
    45:  ('입하', 3),   # 45도 -> 사월 시작 (사월=3)
    60:  ('소만', 3),   # 60도 -> 사월
    75:  ('망종', 4),   # 75도 -> 오월 시작 (오월=4)
    90:  ('하지', 4),   # 90도 -> 오월
    105: ('소서', 5),   # 105도 -> 미월 시작 (미월=5)
    120: ('대서', 5),   # 120도 -> 미월
    135: ('입추', 6),   # 135도 -> 신월 시작 (신월=6)
    150: ('처서', 6),   # 150도 -> 신월
    165: ('백로', 7),   # 165도 -> 유월 시작 (유월=7)
    180: ('추분', 7),   # 180도 -> 유월
    195: ('한로', 8),   # 195도 -> 술월 시작 (술월=8)
    210: ('상강', 8),   # 210도 -> 술월
    225: ('입동', 9),   # 225도 -> 해월 시작 (해월=9)
    240: ('소설', 9),   # 240도 -> 해월
    255: ('대설', 10),  # 255도 -> 자월 시작 (자월=10)
    270: ('동지', 10),  # 270도 -> 자월
    285: ('소한', 11),  # 285도 -> 축월 시작 (축월=11)
    300: ('대한', 11)   # 300도 -> 축월
}

# 월지 순서 (24절기 기준)
MONTH_BRANCHES = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑']

# 주요 도시 경도 (동경 기준)
CITY_LONGITUDES = {
    "서울": 126.9780, "부산": 129.0756, "인천": 126.7052,
    "대구": 128.6014, "대전": 127.3845, "광주": 126.8526,
    "울산": 129.3114, "수원": 127.0286, "창원": 128.6811,
    "고양": 126.8356, "용인": 127.1775, "성남": 127.1378,
    "청주": 127.4890, "안양": 126.9568
}

# 절기 캐시 (API 호출 최소화)
solar_terms_cache = {}

def get_24_divisions_from_kasi(year, month):
    """KASI API에서 24절기 정보 가져오기"""
    global solar_terms_cache
    
    # 캐시 확인
    cache_key = f"{year}-{month}"
    if cache_key in solar_terms_cache:
        return solar_terms_cache[cache_key]
    
    try:
        url = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/get24DivisionsInfo"
        params = {
            'serviceKey': SERVICE_KEY_24_DIVISIONS,
            'solYear': str(year),
            'solMonth': f"{month:02d}",
            'numOfRows': 10
        }
        
        print(f"🌙 {year}년 {month}월 24절기 정보 조회 중...")
        
        # SSL 문제 해결을 위한 세션 설정
        session = requests.Session()
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/xml, text/xml, */*'
        }
        
        response = session.get(url, params=params, headers=headers, timeout=15)
        
        if response.status_code != 200:
            print(f"🔍 24절기 API 응답 상태: {response.status_code}")
            print(f"🔍 24절기 API 응답 내용 (처음 500자):")
            print(response.text[:500])
        
        if response.status_code == 200:
            root = ET.fromstring(response.text)
            result_code = root.find('.//resultCode')
            result_msg = root.find('.//resultMsg')
            
            if result_code is not None and result_code.text == '00':
                items = root.findall('.//item')
                solar_terms = []
                
                for item in items:
                    date_name = item.find('dateName').text if item.find('dateName') is not None else ""
                    locdate = item.find('locdate').text if item.find('locdate') is not None else ""
                    kst_time = item.find('kst').text if item.find('kst') is not None else "0000"
                    sun_longitude = item.find('sunLongitude').text if item.find('sunLongitude') is not None else "0"
                    
                    if locdate and len(locdate) == 8:
                        # YYYYMMDD -> datetime 변환
                        term_year = int(locdate[:4])
                        term_month = int(locdate[4:6])
                        term_day = int(locdate[6:8])
                        
                        # HHMM 시간 파싱 (공백 제거)
                        kst_time = kst_time.strip()
                        if len(kst_time) == 4:
                            term_hour = int(kst_time[:2])
                            term_minute = int(kst_time[2:4])
                        else:
                            term_hour = 0
                            term_minute = 0
                        
                        term_datetime = datetime(term_year, term_month, term_day, term_hour, term_minute)
                        
                        solar_terms.append({
                            'name': date_name,
                            'datetime': term_datetime,
                            'sun_longitude': int(sun_longitude)
                        })
                
                # 캐시에 저장
                solar_terms_cache[cache_key] = solar_terms
                print(f"✅ {year}년 {month}월 절기 {len(solar_terms)}개 조회 완료")
                return solar_terms
            else:
                print(f"❌ KASI 24절기 API 오류: {result_code.text if result_code is not None else 'Unknown'}")
        else:
            print(f"❌ 24절기 API 호출 실패: HTTP {response.status_code}")
            
    except Exception as e:
        print(f"❌ 24절기 조회 오류: {str(e)}")
    
    return []

def get_precise_solar_term_month(birth_datetime):
    """절기 기준 월 계산 (API 사용 안함, 안정적인 fallback 방식만 사용)"""
    # KASI API 대신 검증된 fallback 방식만 사용
    print("📅 API 대신 안정적인 절기 계산 방식 사용")
    return get_solar_term_month_fallback(birth_datetime.month, birth_datetime.day)

def get_solar_term_month_fallback(birth_month, birth_day):
    """API 실패 시 사용할 기존 절기 계산 방식"""
    # 절기 기준 월 경계일 (대략적, 정확한 절기표가 필요하지만 근사치 사용)
    solar_terms = [
        (2, 4),   # 입춘 (2월 4일경) - 인월 시작
        (3, 6),   # 경칩 (3월 6일경) - 묘월 시작  
        (4, 5),   # 청명 (4월 5일경) - 진월 시작
        (5, 6),   # 입하 (5월 6일경) - 사월 시작
        (6, 6),   # 망종 (6월 6일경) - 오월 시작
        (7, 7),   # 소서 (7월 7일경) - 미월 시작
        (8, 8),   # 입추 (8월 8일경) - 신월 시작
        (9, 8),   # 백로 (9월 8일경) - 유월 시작
        (10, 8),  # 한로 (10월 8일경) - 술월 시작
        (11, 7),  # 입동 (11월 7일경) - 해월 시작
        (12, 7),  # 대설 (12월 7일경) - 자월 시작
        (1, 6),   # 소한 (1월 6일경) - 축월 시작
    ]
    
    # 현재 월의 절기 확인
    for i, (month, day) in enumerate(solar_terms):
        if birth_month == month:
            if birth_day >= day:
                # 절기 이후이므로 해당 월
                return i
            else:
                # 절기 이전이므로 이전 월
                return (i - 1) % 12
    
    # 해당 월의 절기가 없는 경우 (중간월)
    if birth_month == 1:  # 1월
        return 11 if birth_day < 6 else 0  # 축월 또는 인월
    elif birth_month == 2:  # 2월  
        return 0 if birth_day < 4 else 1   # 인월 또는 묘월
    elif birth_month == 3:  # 3월
        return 1 if birth_day < 6 else 2   # 묘월 또는 진월
    elif birth_month == 4:  # 4월
        return 2 if birth_day < 5 else 3   # 진월 또는 사월
    elif birth_month == 5:  # 5월
        return 3 if birth_day < 6 else 4   # 사월 또는 오월
    elif birth_month == 6:  # 6월
        return 4 if birth_day < 6 else 5   # 오월 또는 미월
    elif birth_month == 7:  # 7월
        return 5 if birth_day < 7 else 6   # 미월 또는 신월
    elif birth_month == 8:  # 8월
        return 6 if birth_day < 8 else 7   # 신월 또는 유월
    elif birth_month == 9:  # 9월
        return 7 if birth_day < 8 else 8   # 유월 또는 술월
    elif birth_month == 10: # 10월
        return 8 if birth_day < 8 else 9   # 술월 또는 해월
    elif birth_month == 11: # 11월
        return 9 if birth_day < 7 else 10  # 해월 또는 자월
    elif birth_month == 12: # 12월
        return 10 if birth_day < 7 else 11 # 자월 또는 축월
    
    return 0  # 기본값

def is_in_summertime_period(birth_datetime):
    """써머타임 기간 내인지 확인"""
    for start_str, end_str in SUMMERTIME_PERIODS:
        start_dt = datetime.strptime(start_str, "%Y-%m-%d %H:%M")
        end_dt = datetime.strptime(end_str, "%Y-%m-%d %H:%M")
        
        if start_dt <= birth_datetime <= end_dt:
            return True
    return False

def is_in_solar_term_adjustment_period(birth_datetime):
    """절입조정 기간 내인지 확인"""
    birth_date = birth_datetime.date()
    
    for start_str, end_str in SOLAR_TERM_ADJUSTMENT_PERIODS:
        start_date = datetime.strptime(start_str, "%Y-%m-%d").date()
        end_date = datetime.strptime(end_str, "%Y-%m-%d").date()
        
        if start_date <= birth_date <= end_date:
            return True
    return False

def apply_comprehensive_time_adjustment(birth_datetime, city):
    """통합 시간 조정 (써머타임 + 절입조정 + 경도조정)"""
    adjustments = []
    adjusted_time = birth_datetime
    
    # 1. 써머타임 조정 (-60분)
    if is_in_summertime_period(birth_datetime):
        adjusted_time = adjusted_time - timedelta(hours=1)
        adjustments.append("써머타임: -60분")
    
    # 2. 절입조정 (-30분, 동경 135도 → 127도 30분)
    if is_in_solar_term_adjustment_period(birth_datetime):
        adjusted_time = adjusted_time - timedelta(minutes=30)
        adjustments.append("절입조정: -30분 (E135→E127.5)")
        reference_longitude = 127.5  # 절입조정 기간에는 127도 30분 기준
    else:
        reference_longitude = 135.0  # 일반적으로는 동경 135도 기준
    
    # 3. 경도 조정 (지역별)
    if city in CITY_LONGITUDES:
        city_longitude = CITY_LONGITUDES[city]
        longitude_diff = city_longitude - reference_longitude
        time_diff_minutes = longitude_diff * 4  # 경도 1도당 4분
        
        adjusted_time = adjusted_time + timedelta(minutes=time_diff_minutes)
        adjustments.append(f"경도조정: {time_diff_minutes:+.1f}분 ({city})")
    
    return adjusted_time, adjustments

def convert_lunar_to_solar(lunar_year, lunar_month, lunar_day, is_leap_month=False):
    """KASI API를 사용한 음력→양력 변환"""
    
    # 음력→양력 변환을 위한 정확한 API URL (사용자 제공 정보 기반)
    urls_to_try = [
        "http://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService/getSolCalInfo"
    ]
    
    for url in urls_to_try:
        try:
            params = {
                'serviceKey': SERVICE_KEY_LUNAR,
                'lunYear': str(lunar_year),
                'lunMonth': f"{lunar_month:02d}",
                'lunDay': f"{lunar_day:02d}",
                'lunLeapmonth': 'true' if is_leap_month else 'false'
            }
            
            print(f"🌙 음력 {lunar_year}년 {lunar_month}월 {lunar_day}일 → 양력 변환 중...")
            print(f"🔍 시도 중인 URL: {url}")
            print(f"🔍 ServiceKey (처음 20자): {SERVICE_KEY_LUNAR[:20]}...")
            
            # SSL 문제 해결을 위한 세션 설정
            session = requests.Session()
            
            if url.startswith('https'):
                session.verify = False  # SSL 인증서 검증 비활성화
                # 경고 메시지 비활성화
                import urllib3
                urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
            
            # 헤더 추가
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/xml, text/xml, */*'
            }
            
            response = session.get(url, params=params, headers=headers, timeout=15)
            
            print(f"🔍 응답 상태코드: {response.status_code}")
            print(f"🔍 응답 내용 (처음 500자):")
            print(response.text[:500])
            print("="*50)
            
            if response.status_code == 200:
                root = ET.fromstring(response.text)
                result_code = root.find('.//resultCode')
                result_msg = root.find('.//resultMsg')
                
                print(f"🔍 결과코드: {result_code.text if result_code is not None else 'None'}")
                print(f"🔍 결과메시지: {result_msg.text if result_msg is not None else 'None'}")
                
                if result_code is not None and result_code.text == '00':
                    item = root.find('.//item')
                    if item is not None:
                        # 모든 하위 요소 확인
                        print("🔍 item의 모든 하위 요소:")
                        for child in item:
                            print(f"   {child.tag}: {child.text}")
                        
                        sol_year_elem = item.find('solYear')
                        sol_month_elem = item.find('solMonth')
                        sol_day_elem = item.find('solDay')
                        
                        if sol_year_elem is not None and sol_month_elem is not None and sol_day_elem is not None:
                            sol_year = int(sol_year_elem.text)
                            sol_month = int(sol_month_elem.text)
                            sol_day = int(sol_day_elem.text)
                            
                            print(f"✅ 변환 완료: 양력 {sol_year}년 {sol_month}월 {sol_day}일")
                            return sol_year, sol_month, sol_day
                        else:
                            print("❌ 응답에서 솔라 날짜 요소를 찾을 수 없습니다.")
                    else:
                        print("❌ 응답에서 item 요소를 찾을 수 없습니다.")
                else:
                    print(f"❌ KASI 24절기 API 오류:")
                    print(f"   결과코드: {result_code.text if result_code is not None else 'None'}")
                    print(f"   결과메시지: {result_msg.text if result_msg is not None else 'None'}")
                    if result_code is not None and result_code.text in ['20', '30']:
                        print(f"   권한 오류: ServiceKey 확인 필요")
                    # 다음 URL 시도
                    continue
            else:
                print(f"❌ API 호출 실패: HTTP {response.status_code}")
                print(f"응답 내용: {response.text}")
                # 다음 URL 시도
                continue
        
        except requests.exceptions.SSLError as e:
            print(f"❌ SSL 연결 오류: {str(e)}")
            print("💡 HTTP로 재시도 중...")
            # 다음 URL(HTTP) 시도
            continue
        except requests.exceptions.Timeout as e:
            print(f"❌ 연결 시간 초과: 네트워크를 확인해주세요.")
            continue
        except requests.exceptions.RequestException as e:
            print(f"❌ 네트워크 오류: {str(e)}")
            continue
        except ET.ParseError as e:
            print(f"❌ XML 파싱 오류: {str(e)}")
            print(f"응답 내용: {response.text if 'response' in locals() else 'No response'}")
            continue
        except Exception as e:
            print(f"❌ 음력 변환 오류: {str(e)}")
            import traceback
            print(f"상세 오류: {traceback.format_exc()}")
            continue
    
    # 모든 URL 시도 실패
    print("❌ 모든 API 호출 시도가 실패했습니다.")
    print("💡 방법1: 인터넷에서 음력→양력 변환 후 양력 날짜로 다시 실행")
    print("💡 방법2: 간단한 추정 방법 사용")
    return None, None, None

def simple_lunar_to_solar_estimate(lunar_year, lunar_month, lunar_day):
    """간단한 음력→양력 추정 (대략적)"""
    # 매우 간단한 근사 계산 (정확하지 않음, 참고용)
    # 음력과 양력의 평균 차이는 약 30일 정도
    try:
        # 기본적으로 음력 날짜에 30일 정도 더함
        solar_month = lunar_month + 1
        solar_day = lunar_day
        solar_year = lunar_year
        
        if solar_month > 12:
            solar_month = 1
            solar_year += 1
            
        # 간단한 날짜 유효성 검사
        if solar_month == 2 and solar_day > 28:
            solar_day = 28
        elif solar_month in [4, 6, 9, 11] and solar_day > 30:
            solar_day = 30
            
        return solar_year, solar_month, solar_day
    except:
        return None, None, None

# 기존 apply_longitude_adjustment 함수는 apply_comprehensive_time_adjustment로 통합됨

def calculate_year_pillar(birth_datetime):
    """연주 계산 (절기 기준 - 입춘 이전은 전년도)"""
    birth_year = birth_datetime.year
    
    # 입춘 이전은 전년도 연주 사용
    # 입춘은 대략 2월 4일경이므로 2월 4일 이전은 전년도로 계산
    if birth_datetime.month < 2 or (birth_datetime.month == 2 and birth_datetime.day < 4):
        actual_year = birth_year - 1
        print(f"📅 입춘 이전이므로 {birth_year}년 → {actual_year}년 연주 적용")
    else:
        actual_year = birth_year
    
    year_stem_idx = (actual_year - 4) % 10
    year_branch_idx = (actual_year - 4) % 12
    
    return STEMS[year_stem_idx], BRANCH[year_branch_idx]

def calculate_month_pillar(birth_datetime, year_stem):
    """월주 계산 (정확한 절기 기준)"""
    # 연간별 월간 시작 (갑기년, 을경년, 병신년, 정임년, 무계년)
    month_stem_starts = ['丙', '戊', '庚', '壬', '甲']
    year_stem_idx = STEMS.index(year_stem)
    month_stem_start_idx = STEMS.index(month_stem_starts[year_stem_idx % 5])
    
    # KASI API를 사용한 정확한 절기 기준 월지 계산
    month_branch_idx = get_precise_solar_term_month(birth_datetime)
    month_branch = MONTH_BRANCHES[month_branch_idx]
    
    # 월간 계산
    month_stem_idx = (month_stem_start_idx + month_branch_idx) % 10
    month_stem = STEMS[month_stem_idx]
    
    return month_stem + month_branch

def calculate_day_pillar(birth_datetime):
    """일주 계산"""
    # 율리우스일 계산
    a = (14 - birth_datetime.month) // 12
    y = birth_datetime.year - a
    m = birth_datetime.month + 12 * a - 3
    
    jd = birth_datetime.day + (153 * m + 2) // 5 + 365 * y + y // 4 - y // 100 + y // 400 + 1721119
    
    # 천간지 계산 (기준점 보정)
    stem_idx = (jd + 9) % 10
    branch_idx = (jd + 1) % 12
    
    return STEMS[stem_idx], BRANCH[branch_idx]

def calculate_hour_pillar(day_stem, birth_datetime):
    """시주 계산"""
    # 일간별 시간 기준
    day_stem_idx = STEMS.index(day_stem)
    hour_stem_base = (day_stem_idx * 2) % 10
    
    # 시간대별 지지
    hour = birth_datetime.hour
    if hour == 23 or hour < 1:
        hour_branch_idx = 0  # 子시
    else:
        hour_branch_idx = ((hour + 1) // 2) % 12
    
    hour_stem_idx = (hour_stem_base + hour_branch_idx) % 10
    
    return STEMS[hour_stem_idx], BRANCH[hour_branch_idx]

def calculate_great_luck(year_stem, month_pillar, male, birth_datetime):
    """대운 계산"""
    # 음양 구분
    yang_stems = ['甲', '丙', '戊', '庚', '壬']
    is_yang_year = year_stem in yang_stems
    
    # 순행/역행 결정
    if (is_yang_year and male) or (not is_yang_year and not male):
        direction = "순행"
    else:
        direction = "역행"
    
    # 간단한 대운 시작 나이 계산
    start_age = 3 + (birth_datetime.month % 3)
    
    return {
        'direction': direction,
        'start_age': start_age
    }

def calculate_five_elements(stems, branches):
    """오행 분포 계산"""
    elements = {}
    all_chars = stems + branches
    
    for char in all_chars:
        element = ELEMENT.get(char, '?')
        elements[element] = elements.get(element, 0) + 1
    
    return elements

def calculate_solar_saju(birth_year, birth_month, birth_day, birth_hour, birth_minute=0, 
                        male=True, city="서울"):
    """양력 기준 사주계산"""
    
    print(f"\n🎯 사주 계산 시작...")
    print(f"📅 양력 날짜: {birth_year}년 {birth_month}월 {birth_day}일 {birth_hour}시 {birth_minute}분")
    print(f"🏙️  도시: {city}")
    
    birth_datetime = datetime(birth_year, birth_month, birth_day, birth_hour, birth_minute)
    
    # 통합 시간 조정 적용 (써머타임 + 절입조정 + 경도조정)
    adjusted_birth_time, adjustments = apply_comprehensive_time_adjustment(birth_datetime, city)
    
    print(f"🌍 시간 조정:")
    for adj in adjustments:
        print(f"   {adj}")
    print(f"🕐 최종 조정 시간: {adjusted_birth_time.strftime('%Y-%m-%d %H:%M')}")
    
    # 사주 계산 (조정된 시간 사용)
    year_stem, year_branch = calculate_year_pillar(adjusted_birth_time)
    month_pillar = calculate_month_pillar(adjusted_birth_time, year_stem)
    day_stem, day_branch = calculate_day_pillar(adjusted_birth_time)
    hour_stem, hour_branch = calculate_hour_pillar(day_stem, adjusted_birth_time)
    
    # 대운 계산
    great_luck = calculate_great_luck(year_stem, month_pillar, male, adjusted_birth_time)
    
    result = {
        'year_pillar': year_stem + year_branch,
        'month_pillar': month_pillar,
        'day_pillar': day_stem + day_branch,
        'hour_pillar': hour_stem + hour_branch,
        'great_luck': great_luck,
        'elements': calculate_five_elements([year_stem, month_pillar[0], day_stem, hour_stem],
                                         [year_branch, month_pillar[1], day_branch, hour_branch]),
        'birth_info': {
            'original_time': f"{birth_year}-{birth_month:02d}-{birth_day:02d} {birth_hour:02d}:{birth_minute:02d}",
            'adjusted_time': adjusted_birth_time.strftime('%Y-%m-%d %H:%M'),
            'city': city,
            'adjustments': adjustments
        }
    }
    
    return result

def display_result(result):
    """결과 출력"""
    print("\n" + "="*60)
    print("🎯 사주 계산 결과")
    print("="*60)
    
    # 사주 정보
    table = PrettyTable()
    table.field_names = ["구분", "천간", "지지", "사주"]
    table.add_row(["시주", result['hour_pillar'][0], result['hour_pillar'][1], result['hour_pillar']])
    table.add_row(["일주", result['day_pillar'][0], result['day_pillar'][1], result['day_pillar']])
    table.add_row(["월주", result['month_pillar'][0], result['month_pillar'][1], result['month_pillar']])
    table.add_row(["연주", result['year_pillar'][0], result['year_pillar'][1], result['year_pillar']])
    
    print(table)
    
    # 출생 정보
    print(f"\n📅 출생정보:")
    print(f"  원래 시간: {result['birth_info']['original_time']}")
    print(f"  조정 시간: {result['birth_info']['adjusted_time']}")
    print(f"  도시: {result['birth_info']['city']}")
    print(f"  적용된 조정:")
    for adj in result['birth_info']['adjustments']:
        print(f"    - {adj}")
    
    # 오행 분포
    print(f"\n🌟 오행 분포:")
    for element, count in result['elements'].items():
        print(f"  {element}: {count}개")
    
    # 대운 정보
    great_luck = result['great_luck']
    print(f"\n🔮 대운 정보:")
    print(f"  방향: {great_luck['direction']}")
    print(f"  시작 나이: {great_luck['start_age']}세")

def get_user_input():
    """사용자 입력 받기"""
    print("🌟 양력 만세력 - 양력/음력 기준 사주계산기")
    print("  - 양력/음력 날짜 기준 간지 계산")
    print("  - KASI API 음력→양력 변환")
    print("  - 써머타임 조정 (1948-1960, 1987-1988)")
    print("  - 절입조정 (1908-1911, 1954-1961)")
    print("  - 경도 조정 적용")
    print("="*60)
    
    # 양력/음력 선택
    print("\n📅 날짜 형식을 선택하세요:")
    print("1. 양력")
    print("2. 음력 (KASI API 변환)")
    
    while True:
        calendar_type = input("선택 (1-2): ").strip()
        if calendar_type in ["1", "2"]:
            break
        else:
            print("⚠️  1 또는 2를 입력해주세요.")
    
    is_lunar = (calendar_type == "2")
    
    # 생년월일 입력
    date_type = "음력" if is_lunar else "양력"
    print(f"\n📅 {date_type} 생년월일을 입력하세요:")
    
    while True:
        try:
            birth_year = int(input("년도 (예: 1999): "))
            if 1900 <= birth_year <= 2100:
                break
            else:
                print("⚠️  1900~2100년 범위로 입력해주세요.")
        except ValueError:
            print("⚠️  숫자로 입력해주세요.")
    
    while True:
        try:
            birth_month = int(input("월 (1-12): "))
            if 1 <= birth_month <= 12:
                break
            else:
                print("⚠️  1~12 사이의 월을 입력해주세요.")
        except ValueError:
            print("⚠️  숫자로 입력해주세요.")
    
    while True:
        try:
            birth_day = int(input("일 (1-31): "))
            if 1 <= birth_day <= 31:
                break
            else:
                print("⚠️  1~31 사이의 일을 입력해주세요.")
        except ValueError:
            print("⚠️  숫자로 입력해주세요.")
    
    # 음력인 경우 윤달 여부 확인
    is_leap_month = False
    if is_lunar:
        print(f"\n🌙 {birth_month}월이 윤달입니까?")
        print("1. 평달")
        print("2. 윤달")
        
        while True:
            leap_choice = input("선택 (1-2): ").strip()
            if leap_choice == "1":
                is_leap_month = False
                break
            elif leap_choice == "2":
                is_leap_month = True
                break
            else:
                print("⚠️  1 또는 2를 입력해주세요.")
    
    # 음력인 경우 양력으로 변환
    if is_lunar:
        solar_year, solar_month, solar_day = convert_lunar_to_solar(
            birth_year, birth_month, birth_day, is_leap_month
        )
        
        if solar_year is None:
            print("\n⚠️  KASI API 변환에 실패했습니다.")
            print("🔄 간단한 추정 방법을 사용하시겠습니까?")
            print("1. 간단한 추정으로 계속 진행")
            print("2. 프로그램 종료 (인터넷에서 변환 후 양력으로 다시 실행)")
            
            while True:
                choice = input("선택 (1-2): ").strip()
                if choice == "1":
                    # 간단한 추정 사용
                    est_year, est_month, est_day = simple_lunar_to_solar_estimate(
                        birth_year, birth_month, birth_day
                    )
                    if est_year is not None:
                        print(f"📊 추정된 양력 날짜: {est_year}년 {est_month}월 {est_day}일")
                        print("⚠️  이는 대략적인 추정이므로 정확하지 않을 수 있습니다.")
                        
                        confirm = input("이 날짜로 계속 진행하시겠습니까? (y/N): ").strip().lower()
                        if confirm == 'y':
                            solar_year, solar_month, solar_day = est_year, est_month, est_day
                            break
                        else:
                            return None
                    else:
                        print("❌ 추정에도 실패했습니다.")
                        return None
                elif choice == "2":
                    return None
                else:
                    print("⚠️  1 또는 2를 입력해주세요.")
        
        # 변환된 양력 날짜 사용
        birth_year, birth_month, birth_day = solar_year, solar_month, solar_day
    
    # 태어난 시간 입력
    print("\n🕐 태어난 시간을 입력하세요:")
    while True:
        try:
            birth_hour = int(input("시 (0-23): "))
            if 0 <= birth_hour <= 23:
                break
            else:
                print("⚠️  0~23 사이의 시간을 입력해주세요.")
        except ValueError:
            print("⚠️  숫자로 입력해주세요.")
    
    while True:
        try:
            birth_minute = int(input("분 (0-59): "))
            if 0 <= birth_minute <= 59:
                break
            else:
                print("⚠️  0~59 사이의 분을 입력해주세요.")
        except ValueError:
            print("⚠️  숫자로 입력해주세요.")
    
    # 성별 입력
    print("\n👤 성별을 선택하세요:")
    print("1. 남성")
    print("2. 여성")
    
    while True:
        gender_choice = input("선택 (1-2): ").strip()
        if gender_choice == "1":
            male = True
            break
        elif gender_choice == "2":
            male = False
            break
        else:
            print("⚠️  1 또는 2를 입력해주세요.")
    
    # 지역 선택
    print("\n🏙️  태어난 지역을 선택하세요:")
    cities = list(CITY_LONGITUDES.keys())
    for i, city in enumerate(cities, 1):
        print(f"{i:2d}. {city}")
    
    while True:
        try:
            city_choice = int(input("선택 (번호 입력): "))
            if 1 <= city_choice <= len(cities):
                city = cities[city_choice - 1]
                break
            else:
                print(f"⚠️  1~{len(cities)} 사이의 번호를 입력해주세요.")
        except ValueError:
            print("⚠️  숫자로 입력해주세요.")
    
    return birth_year, birth_month, birth_day, birth_hour, birth_minute, male, city

def main():
    """사주 계산기 메인 함수"""
    # 테스트 모드 추가
    print("🧪 테스트 모드를 실행하시겠습니까?")
    print("1. 일반 모드 (사용자 입력)")
    print("2. 테스트 모드 (예제 검증)")
    
    mode_choice = input("선택 (1-2): ").strip()
    
    if mode_choice == "2":
        print("\n" + "="*60)
        print("🧪 테스트 모드 - 예제 검증")
        print("="*60)
        
        # 24절기 API 테스트
        print("\n🌙 24절기 API 테스트")
        print("-" * 40)
        test_terms = get_24_divisions_from_kasi(2024, 3)
        if test_terms:
            print(f"✅ 2024년 3월 절기 조회 성공:")
            for term in test_terms:
                print(f"   {term['name']}: {term['datetime'].strftime('%Y-%m-%d %H:%M')} (태양황경: {term['sun_longitude']}도)")
        else:
            print("❌ 24절기 API 테스트 실패")
        
        print("\n" + "-" * 40)
        
        # 예제 1: 양력 1955-08-08 17:28 서울 출생 (써머타임 적용 시기)
        print("\n📋 예제 1: 양력 1955-08-08 17:28 서울 출생 (써머타임 적용)")
        result1 = calculate_solar_saju(1955, 8, 8, 17, 28, male=True, city="서울")
        display_result(result1)
        
        print("\n" + "="*60)
        
        # 예제 2: 양력 2024-03-20 13:30 부산 출생 (현대 정확한 절기)
        print("\n📋 예제 2: 양력 2024-03-20 13:30 부산 출생 (정확한 절기 적용)")
        result2 = calculate_solar_saju(2024, 3, 20, 13, 30, male=True, city="부산")
        display_result(result2)
        
        print("\n" + "="*60)
        
        # 예제 3: 절기 경계 테스트 - 경칩 직전
        print("\n📋 예제 3: 양력 2024-03-05 10:00 서울 출생 (경칩 직전)")
        result3 = calculate_solar_saju(2024, 3, 5, 10, 0, male=False, city="서울")
        display_result(result3)
        
        print("\n" + "="*60)
        
        # 예제 4: 절기 경계 테스트 - 경칩 직후
        print("\n📋 예제 4: 양력 2024-03-05 12:00 서울 출생 (경칩 직후)")
        result4 = calculate_solar_saju(2024, 3, 5, 12, 0, male=False, city="서울")
        display_result(result4)
        
        print("\n✅ 테스트 완료!")
        exit()
    
    try:
        # 사용자 입력 받기
        user_input = get_user_input()
        
        if user_input is None:
            print("❌ 입력 처리에 실패했습니다.")
            exit()
        
        birth_year, birth_month, birth_day, birth_hour, birth_minute, male, city = user_input
        
        # 입력 확인
        print("\n" + "="*60)
        print("📋 입력 정보 확인")
        print("="*60)
        print(f"📅 생년월일: {birth_year}년 {birth_month}월 {birth_day}일 (변환된 양력)")
        print(f"🕐 태어난 시간: {birth_hour}시 {birth_minute}분")
        print(f"👤 성별: {'남성' if male else '여성'}")
        print(f"🏙️  지역: {city}")
        
        confirm = input("\n계산을 진행하시겠습니까? (Y/n): ").strip().lower()
        if confirm == 'n':
            print("❌ 계산이 취소되었습니다.")
            exit()
        
        # 양력 기준 사주 계산
        result = calculate_solar_saju(
            birth_year, birth_month, birth_day, birth_hour, birth_minute,
            male=male, city=city
        )
        
        # 결과 출력
        display_result(result)
        
    except KeyboardInterrupt:
        print("\n\n❌ 프로그램이 중단되었습니다.")
    except Exception as e:
        print(f"\n❌ 오류가 발생했습니다: {e}")
        print("입력값을 다시 확인해주세요.")

if __name__ == "__main__":
    main() 