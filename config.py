import os

class Config:
    SECRET_KEY = os.urandom(24)
    SQLALCHEMY_DATABASE_URI = 'sqlite:///iso27001.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
