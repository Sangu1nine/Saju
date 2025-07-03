#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
사주 분석 테스트 스크립트
LangGraph 워크플로우의 종합적인 분석 결과를 확인할 수 있습니다.
"""

import requests
import json
import time
from datetime import datetime

# API 서버 URL
BASE_URL = "http://localhost:8000"

def test_saju_analysis():
    """사주 분석 테스트"""
    
    print("🔮 사주 분석 테스트를 시작합니다...")
    print("=" * 60)
    
    # 테스트 데이터
    test_data = {
        "birth_year": 1990,
        "birth_month": 5,
        "birth_day": 15,
        "birth_hour": 14,
        "birth_minute": 30,
        "is_male": True,
        "city": "서울",
        "is_lunar": False,
        "is_leap_month": False
    }
    
    print(f"📅 분석 대상: {test_data['birth_year']}년 {test_data['birth_month']}월 {test_data['birth_day']}일 {test_data['birth_hour']}시 {test_data['birth_minute']}분")
    print(f"👤 성별: {'남성' if test_data['is_male'] else '여성'}")
    print(f"🌍 지역: {test_data['city']}")
    print(f"📆 력법: {'음력' if test_data['is_lunar'] else '양력'}")
    print()
    
    try:
        # 분석 요청
        print("🚀 분석을 요청합니다...")
        response = requests.post(f"{BASE_URL}/api/v1/saju/analyze", json=test_data)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ 분석이 완료되었습니다!")
            print()
            
            # 결과 출력
            display_analysis_result(result)
            
        else:
            print(f"❌ 분석 실패: {response.status_code}")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("❌ 서버에 연결할 수 없습니다.")
        print("💡 api/main.py가 실행되고 있는지 확인해주세요.")
        print("💡 명령어: python api/main.py")
    except Exception as e:
        print(f"❌ 오류 발생: {e}")

def display_analysis_result(result):
    """분석 결과를 보기 좋게 출력"""
    
    print("📊 **종합 분석 결과**")
    print("=" * 60)
    
    # 기본 정보
    if "saju_data" in result:
        saju = result["saju_data"]
        print("🔹 **사주팔자**")
        print(f"   년주: {saju['year_pillar']}")
        print(f"   월주: {saju['month_pillar']}")
        print(f"   일주: {saju['day_pillar']}")
        print(f"   시주: {saju['hour_pillar']}")
        print()
    
    # 단계별 분석 결과
    if "analysis_results" in result:
        steps = result["analysis_results"]
        print("📋 **8단계 상세 분석**")
        print("-" * 40)
        
        for step_key, step_data in steps.items():
            if isinstance(step_data, dict) and "title" in step_data:
                print(f"\n🔸 **{step_data['title']}**")
                print(f"{step_data['content'][:300]}...")
                if len(step_data['content']) > 300:
                    print("   (더 자세한 내용은 전체 결과에서 확인)")
                print()
    
    # 분석 ID 및 추가 정보
    if "analysis_id" in result:
        print(f"🆔 분석 ID: {result['analysis_id']}")
        print(f"📅 분석 완료: {result['created_at']}")
        print()
        
        # 상세 결과 조회 방법 안내
        print("🔍 **상세 결과 확인 방법:**")
        print(f"   브라우저: {BASE_URL}/api/v1/saju/analysis/{result['analysis_id']}")
        print(f"   API 문서: {BASE_URL}/docs")
        print()

def test_streaming_analysis():
    """스트리밍 분석 테스트"""
    
    print("🌊 스트리밍 분석 테스트를 시작합니다...")
    print("=" * 60)
    
    test_data = {
        "birth_year": 1985,
        "birth_month": 3,
        "birth_day": 20,
        "birth_hour": 10,
        "birth_minute": 0,
        "is_male": False,
        "city": "부산",
        "is_lunar": False
    }
    
    try:
        # 스트리밍 요청
        print("📡 스트리밍 분석을 시작합니다...")
        response = requests.post(
            f"{BASE_URL}/api/v1/saju/analyze/stream", 
            json=test_data,
            stream=True
        )
        
        if response.status_code == 200:
            print("✅ 스트리밍 연결 성공!")
            print("-" * 40)
            
            # 스트리밍 데이터 처리
            for line in response.iter_lines():
                if line:
                    line_str = line.decode('utf-8')
                    if line_str.startswith('data: '):
                        try:
                            data = json.loads(line_str[6:])  # 'data: ' 제거
                            
                            if data.get("type") == "progress":
                                step = data.get("current_step", 0)
                                total = data.get("total_steps", 8)
                                name = data.get("step_name", "")
                                progress = data.get("progress_percentage", 0)
                                
                                print(f"⏳ [{step}/{total}] {name} ({progress:.1f}%)")
                                
                            elif data.get("type") == "step_complete":
                                result = data.get("result", {})
                                title = result.get("title", "단계 완료")
                                print(f"✅ {title} 완료!")
                                
                            elif data.get("type") == "final_result":
                                print("\n🎉 **최종 분석 완료!**")
                                analysis = data.get("analysis", {})
                                if "analysis_id" in analysis:
                                    print(f"🆔 분석 ID: {analysis['analysis_id']}")
                                break
                                
                        except json.JSONDecodeError:
                            continue
                            
        else:
            print(f"❌ 스트리밍 실패: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"❌ 스트리밍 오류: {e}")

def main():
    """메인 함수"""
    
    print("🔮 **사주 분석 시스템 테스트**")
    print("=" * 60)
    print()
    
    # 서버 상태 확인
    try:
        health = requests.get(f"{BASE_URL}/health")
        if health.status_code == 200:
            print("✅ 서버가 정상 동작 중입니다!")
            health_data = health.json()
            print(f"   📊 분석기: {'활성' if health_data['services']['analyzer'] else '비활성'}")
            print(f"   📊 워크플로우: {'활성' if health_data['services']['workflow'] else '비활성'}")
            print(f"   📊 LangSmith: {'활성' if health_data['services']['langsmith'] else '비활성'}")
            print()
        else:
            print("⚠️  서버 상태 확인 실패")
            return
    except:
        print("❌ 서버에 연결할 수 없습니다.")
        print("💡 python api/main.py 명령으로 서버를 먼저 실행해주세요.")
        return
    
    # 테스트 메뉴
    while True:
        print("\n🎯 **테스트 옵션을 선택하세요:**")
        print("1. 📊 일반 분석 테스트")
        print("2. 🌊 스트리밍 분석 테스트")
        print("3. 🌐 브라우저에서 API 문서 보기")
        print("4. ❌ 종료")
        
        choice = input("\n선택 (1-4): ").strip()
        
        if choice == "1":
            test_saju_analysis()
        elif choice == "2":
            test_streaming_analysis()
        elif choice == "3":
            print(f"\n🌐 브라우저에서 다음 주소를 열어보세요:")
            print(f"   📖 API 문서: {BASE_URL}/docs")
            print(f"   🏠 홈페이지: {BASE_URL}/")
        elif choice == "4":
            print("\n👋 테스트를 종료합니다!")
            break
        else:
            print("\n❌ 잘못된 선택입니다. 1-4 중에서 선택해주세요.")

if __name__ == "__main__":
    main() 