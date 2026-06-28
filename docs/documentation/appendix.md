# Appendix

## A.1 Commands Used

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Frontend Build

```bash
cd frontend
npm run build
npm run preview
```

### GitHub Pages Deployment

```bash
cd frontend
npm run deploy
```

### Backend Setup

```bash
python -m venv venv
venv\Scripts\activate
pip install -r backend\requirements.txt
```

### Database Seeding

```bash
python database\seed.py
```

### Backend Run

```bash
python backend\app.py
```

### API Validation Commands

```bash
Invoke-RestMethod 'http://127.0.0.1:5000/api/health'
Invoke-RestMethod 'http://127.0.0.1:5000/api/temples'
Invoke-RestMethod 'http://127.0.0.1:5000/api/routes'
Invoke-RestMethod 'http://127.0.0.1:5000/api/planner?temple=T001&days=3&budget=low&persons=1'
Invoke-RestMethod 'http://127.0.0.1:5000/api/recommendation?temple=T001&days=3&budget=low&persons=1'
```

## A.2 Git Commands

```bash
git status
git add .
git commit -m "Add project documentation"
git push
```

## A.3 AWS Setup Commands

These commands represent the deployment command categories used for EC2-hosted Flask applications. Exact values such as hostnames, users, and service names should match the actual EC2 environment.

### Install Server Packages

```bash
sudo apt update
sudo apt install python3-pip python3-venv nginx
```

### Backend Environment

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
```

### Gunicorn Run Example

```bash
gunicorn --bind 127.0.0.1:8000 backend.app:app
```

### Nginx Validation

```bash
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx
```

### Gunicorn Service Validation

```bash
sudo systemctl daemon-reload
sudo systemctl restart gunicorn
sudo systemctl status gunicorn
```

### Environment Variables

```bash
export DATABASE_URL="mysql+pymysql://USER:PASSWORD@RDS-ENDPOINT:3306/smart_pilgrim"
export SECRET_KEY="replace-with-production-secret"
```

## A.4 Mermaid Export Commands

```bash
npx @mermaid-js/mermaid-cli -i docs/documentation/chapter_5_system_design.md -o system_design.svg
npx @mermaid-js/mermaid-cli -i docs/documentation/chapter_7_aws_deployment.md -o aws_deployment.svg
npx @mermaid-js/mermaid-cli -i docs/documentation/chapter_8_testing_and_results.md -o testing_flow.svg
```

## A.5 Folder Structure

```text
smart-pilgrim-companion/
  backend/
    app.py
    config.py
    models/
    routes/
    services/
    utils/
    requirements.txt
  data/
    temples.csv
    travel_routes.csv
    budgets.csv
    schedules.csv
    temple_places.csv
    metadata.json
    user_scenarios.json
  database/
    schema.sql
    seed.py
    smart_pilgrim.db
    DATA_DICTIONARY.md
  deployment/
    aws/
    docs/
    ProjectProofs/
      aws_deployment/
      development/
      final_output/
      github_deployment/
      localhost/
      project_initialization/
      team_contribution/
      testing_evidence/
  docs/
    documentation/
  frontend/
    src/
    public/
    dist/
    package.json
    vite.config.js
```

## A.6 Screenshot Placeholder Rules

Screenshot placeholders in this documentation use:

```text
[INSERT IMAGE:
folder_name/filename.png
Caption: Image caption.]
```

The image folders are available under `deployment/ProjectProofs/`.
