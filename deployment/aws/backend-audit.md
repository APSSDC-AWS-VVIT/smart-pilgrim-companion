# AWS Deployment - Backend Localhost Dependency Audit

| File Path | Code Issue Identified | Required Production Change | Status |
| :--- | :--- | :--- | :--- |
| `backend/app.py` | Hardcoded default fallback host `0.0.0.0` and default port `8000` | Bind variables cleanly to `os.environ.get()` wrappers | ⏳ Pending |
| `backend/config.py` | Hardcoded SQLite URI fallback `sqlite:///temples.db` or local development configurations | Swap out connection string dynamically via an environment secret | ⏳ Pending |
| `backend/app.py` | Missing custom session `SECRET_KEY` variable configuration fallback | Bind to environment state flag parsing | ⏳ Pending |