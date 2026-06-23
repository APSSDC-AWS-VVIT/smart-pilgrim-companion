from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from models import db
from routes.temple_routes import temple_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    CORS(app)

    app.register_blueprint(temple_bp, url_prefix="/api")

    @app.route("/")
    def health_check():
        return jsonify({
            "status": "success",
            "message": "Smart Pilgrim Companion backend is running",
            "data": {}
        })

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
