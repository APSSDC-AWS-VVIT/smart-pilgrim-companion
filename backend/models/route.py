from models import db


class Route(db.Model):
    __tablename__ = "travel_routes"

    route_id = db.Column(db.String, primary_key=True)
    source = db.Column(db.String, nullable=False)
    destination = db.Column(db.String, nullable=False)
    travel_mode = db.Column(db.String, nullable=False)
    duration = db.Column(db.String, nullable=False)
    estimated_cost = db.Column(db.String)
    notes = db.Column(db.Text)
