from models import db


class Place(db.Model):
    __tablename__ = "temple_places"

    place_id = db.Column(db.String, primary_key=True)
    temple_id = db.Column(db.String, db.ForeignKey("temples.temple_id"), nullable=False)
    place_name = db.Column(db.String, nullable=False)
    place_type = db.Column(db.String, nullable=False)
    distance_from_temple = db.Column(db.String)
    description = db.Column(db.Text)
