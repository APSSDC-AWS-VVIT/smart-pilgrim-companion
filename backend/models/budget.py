from models import db


class Budget(db.Model):
    __tablename__ = "budgets"

    budget_id = db.Column(db.String, primary_key=True)
    temple_id = db.Column(db.String, db.ForeignKey("temples.temple_id"), nullable=False)
    budget_type = db.Column(db.String, nullable=False)
    min_cost = db.Column(db.Integer, nullable=False)
    max_cost = db.Column(db.Integer, nullable=False)
    persons = db.Column(db.Integer, nullable=False)
    days = db.Column(db.Integer, nullable=False)
    includes = db.Column(db.Text)
