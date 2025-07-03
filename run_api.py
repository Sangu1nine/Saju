#!/usr/bin/env python3
"""
사주 분석 API 서버 실행 스크립트
"""
import sys
from pathlib import Path

# 프로젝트 루트를 Python 경로에 추가
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

if __name__ == "__main__":
    try:
        from api.main import main
        main()
    except ImportError as e:
        print(f"❌ 모듈 import 오류: {e}")
        print("💡 다음을 시도해보세요:")
        print("   1. pip install -r requirements.txt")
        print("   2. pip install --upgrade langchain langgraph")
        print("   3. .env 파일에 OPENAI_API_KEY 설정 확인")
    except Exception as e:
        print(f"❌ 실행 오류: {e}")
        print("💡 문제가 지속되면 가상환경을 새로 만들어 보세요.") 