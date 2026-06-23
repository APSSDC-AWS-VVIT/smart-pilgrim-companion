from models import db


class Schedule(db.Model):
    __tablename__ = "schedules"

    schedule_id = db.Column(db.String, primary_key=True)
    temple_id = db.Column(db.String, db.ForeignKey("temples.temple_id"), nullable=False)
    activity = db.Column(db.String, nullable=False)
    start_time = db.Column(db.String, nullable=False)
    end_time = db.Column(db.String, nullable=False)
    notes = db.Column(db.Text)
