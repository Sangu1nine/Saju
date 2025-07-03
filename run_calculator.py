#!/usr/bin/env python3
"""
사주 계산기 실행 스크립트
"""
import sys
from pathlib import Path

# 프로젝트 루트를 Python 경로에 추가
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

if __name__ == "__main__":
    try:
        from saju_calculator import main
        main()
    except ImportError as e:
        print(f"❌ 모듈 import 오류: {e}")
        print("💡 필요한 패키지를 설치해주세요: pip install -r requirements.txt")
    except Exception as e:
        print(f"❌ 실행 오류: {e}") 