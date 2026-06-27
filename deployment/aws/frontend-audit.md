# AWS Deployment - Frontend Localhost Dependency Audit

| File Path | Code Issue Identified | Required Production Change | Status |
| :--- | :--- | :--- | :--- |
| `frontend/src/services/api.js` | Static references tracking development fallback endpoints like `http://localhost:8000/api` | Switch base url configurations to leverage `import.meta.env.VITE_API_URL` | ⏳ Pending |