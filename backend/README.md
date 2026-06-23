# Smart Pilgrim Companion Backend

Flask backend for the Smart Pilgrim Companion project. It reads the validated datasets from `data/`, stores them in SQLite, and serves JSON APIs for the frontend.

## What This Backend Does

- Uses the existing CSV and JSON files as the source of truth.
- Seeds a SQLite database at `database/smart_pilgrim.db`.
- Exposes stable JSON APIs under `/api`.
- Enables CORS so the frontend can call the APIs directly.

## Project Layout

- `backend/app.py` - Flask application entry point
- `backend/config.py` - configuration for database and data paths
- `backend/models/` - SQLAlchemy models
- `backend/routes/` - API routes
- `backend/services/` - business logic
- `backend/utils/` - shared helpers
- `database/schema.sql` - SQLite schema
- `database/seed.py` - data loader for CSV and JSON files
- `database/smart_pilgrim.db` - generated SQLite database

## Requirements

- Python 3.10+
- Flask
- Flask-SQLAlchemy
- Flask-Cors
- pandas

## Setup

Run these commands from the project root:

```powershell
python -m venv venv
venv\Scripts\activate
pip install -r backend\requirements.txt
```

If you prefer to reinstall manually, the backend uses:

```powershell
pip install flask flask_sqlalchemy pandas flask_cors
pip freeze > backend\requirements.txt
```

## Database Setup

The database is created from the existing data files only. No data regeneration is required.

```powershell
python database\seed.py
```

This will:

- create `database/smart_pilgrim.db`
- load `temples.csv`
- load `travel_routes.csv`
- load `budgets.csv`
- load `schedules.csv`
- load `temple_places.csv`
- read `metadata.json` and `user_scenarios.json` for validation/logging context

## Run the Backend

Start the Flask app from the project root:

```powershell
python backend\app.py
```

The server runs at:

- `http://127.0.0.1:5000`
- `http://localhost:5000`

## API Endpoints

All APIs return JSON in a consistent structure:

```json
{
	"status": "success",
	"message": "...",
	"data": []
}
```

Available endpoints:

- `GET /api/temples`
- `GET /api/temples/<temple_id-or-name>`
- `GET /api/routes`
- `GET /api/budgets`
- `GET /api/schedules`
- `GET /api/search?q=tirumala`
- `GET /api/planner?temple_id=T001`

## Test Steps

After starting the server, verify the core endpoints:

```powershell
Invoke-RestMethod 'http://127.0.0.1:5000/api/temples'
Invoke-RestMethod 'http://127.0.0.1:5000/api/routes'
Invoke-RestMethod 'http://127.0.0.1:5000/api/budgets'
Invoke-RestMethod 'http://127.0.0.1:5000/api/schedules'
Invoke-RestMethod 'http://127.0.0.1:5000/api/search?q=tirumala'
```

Expected result:

- no crashes
- JSON responses only
- populated `data` arrays
- valid temple, route, budget, and schedule records

## Frontend Integration Notes

Give the frontend team these rules so integration stays minimal:

- Use `http://localhost:5000/api` as the base URL.
- Do not hardcode temple, route, budget, or schedule data in the UI.
- Consume the API response shape exactly as returned: `status`, `message`, `data`.
- Use `GET /api/temples` to populate temple lists.
- Use `GET /api/temples/<temple_id>` when a detail screen needs budgets, schedules, and places together.
- Use `GET /api/search?q=<keyword>` for search boxes.
- Use `GET /api/budgets?temple_id=<id>` and `GET /api/schedules?temple_id=<id>` when a filtered view is needed.
- Keep frontend naming aligned with the backend field names to avoid extra mapping logic.
- CORS is already enabled, so direct browser calls are supported.

## Data Rules Followed

- The repository data is the source of truth.
- CSV structures were not changed.
- No random APIs were created.
- No `users` table was added.
- Seed import skips empty or invalid rows and avoids duplicates.

## Notes

- If you rerun the seed script, it resets and repopulates the database.
- One malformed trailing row in `temple_places.csv` is skipped automatically.
