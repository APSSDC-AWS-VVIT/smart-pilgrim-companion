from flask import jsonify


def success_response(data=None, message="success", status_code=200):
    return jsonify({
        "status": "success",
        "message": message,
        "data": data if data is not None else []
    }), status_code


def error_response(message, status_code=400, data=None):
    return jsonify({
        "status": "error",
        "message": message,
        "data": data if data is not None else []
    }), status_code
