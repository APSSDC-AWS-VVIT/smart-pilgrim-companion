# import os
# from dotenv import load_dotenv

# # Explicitly load parameters out of local file if present during dev stage
# load_dotenv()

# BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, os.pardir))
# DATABASE_DIR = os.path.join(PROJECT_ROOT, "database")
# DATABASE_PATH = os.path.join(DATABASE_DIR, "smart_pilgrim.db")

# class Config:
#     # ✅ AWS RDS Priority: Looks for env string first. Falls back to your local path construction safely.
#     SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", f"sqlite:///{DATABASE_PATH}")
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
#     JSON_SORT_KEYS = False
#     CORS_ORIGINS = ["*"]
#     DATA_DIR = os.path.join(PROJECT_ROOT, "data")
#     SECRET_KEY = os.getenv("SECRET_KEY", "dev-fallback-key-123")


import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, os.pardir))
DATABASE_DIR = os.path.join(PROJECT_ROOT, "database")
DATABASE_PATH = os.path.join(DATABASE_DIR, "smart_pilgrim.db")

class Config:
    # 1. Fetch raw URL value string
    _raw_url = os.getenv("DATABASE_URL", "")
    
    # 2. ✅ FORCE INJECTION: If it connects to AWS MySQL but lacks a database name context, append it explicitly
    if "rds.amazonaws.com" in _raw_url and _raw_url.endswith("/"):
        SQLALCHEMY_DATABASE_URI = _raw_url + "smart_pilgrim"
    elif "rds.amazonaws.com" in _raw_url and not _raw_url.split('/')[-1]:
        SQLALCHEMY_DATABASE_URI = _raw_url + "/smart_pilgrim"
    else:
        # Normal fallback for clean environment entries or local SQLite instances
        SQLALCHEMY_DATABASE_URI = _raw_url if _raw_url else f"sqlite:///{DATABASE_PATH}"

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_SORT_KEYS = False
    CORS_ORIGINS = ["*"]
    DATA_DIR = os.path.join(PROJECT_ROOT, "data")
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-fallback-key-123")