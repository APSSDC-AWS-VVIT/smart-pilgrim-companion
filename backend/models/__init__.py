from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from models.temple import Temple  # noqa: E402,F401
from models.route import Route  # noqa: E402,F401
from models.budget import Budget  # noqa: E402,F401
from models.schedule import Schedule  # noqa: E402,F401
from models.place import Place  # noqa: E402,F401
