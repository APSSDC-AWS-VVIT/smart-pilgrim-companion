import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, os.pardir))
DATABASE_DIR = os.path.join(PROJECT_ROOT, "database")
DATABASE_PATH = os.path.join(DATABASE_DIR, "smart_pilgrim.db")

class Config:
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{DATABASE_PATH}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_SORT_KEYS = False
    CORS_ORIGINS = ["*"]
    DATA_DIR = os.path.join(PROJECT_ROOT, "data")
