from models import db


class Temple(db.Model):
    __tablename__ = "temples"

    temple_id = db.Column(db.String, primary_key=True)
    temple_name = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    district = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    history = db.Column(db.Text)
    opening_time = db.Column(db.String)
    closing_time = db.Column(db.String)
    best_visit_time = db.Column(db.String)
    speciality = db.Column(db.Text)
    contact_info = db.Column(db.String)
    website = db.Column(db.String)
    notes = db.Column(db.Text)
