# Chapter 5: System Design

## 5.1 System Architecture

Smart Pilgrim Companion follows a client-server architecture. The frontend is built using React + Vite and communicates with the Flask backend through REST APIs. The backend uses SQLAlchemy models and database configuration that supports local SQLite and AWS RDS MySQL.

```mermaid
flowchart LR
    User[User] --> Browser[Browser]
    Browser --> Frontend[Frontend<br/>React + Vite]

    Frontend --> GitHubPages[GitHub Pages]
    GitHubPages --> BackendA[Hosted Backend API]
    BackendA --> DBLocal[(Database)]

    Frontend --> EC2[AWS EC2]
    EC2 --> Nginx[Nginx Reverse Proxy]
    Nginx --> Gunicorn[Gunicorn]
    Gunicorn --> Flask[Flask Backend]
    Flask --> RDS[(AWS RDS MySQL)]

    IAM[IAM] -. permissions .-> EC2
    IAM -. database access control .-> RDS
    CloudWatch[CloudWatch] -. logs and metrics .-> EC2
    CloudWatch -. service monitoring .-> Flask
```

## 5.2 Frontend Design

The frontend is organized into pages, components, services, data, styles, and static assets.

Important frontend routes from `frontend/src/App.jsx`:

- `/` -> Home page
- `/temples` -> Temples listing
- `/temples/:templeId` -> Temple details
- `/planner` -> Travel planner
- `/explore` -> Explore page
- `/about` -> About page

The API base configuration is handled in `frontend/src/services/api.js`. It reads `VITE_API_URL` and falls back to `http://localhost:5000`.

## 5.3 Backend Design

The backend is organized into:

- `backend/app.py` - Flask app factory and health route.
- `backend/config.py` - database and environment configuration.
- `backend/routes/temple_routes.py` - API endpoints.
- `backend/services/` - business logic for temples, search, planner, recommendations, analytics.
- `backend/models/` - SQLAlchemy models.
- `backend/utils/` - response and validation helpers.

## 5.4 Module Flow

```mermaid
flowchart TD
    UI[React Page Components] --> Services[Frontend Service Layer]
    Services --> API[Axios API Client]
    API --> Routes[Flask Routes]
    Routes --> Business[Service Layer]
    Business --> Models[SQLAlchemy Models]
    Models --> Database[(SQLite Local / RDS MySQL Production)]
    Business --> Response[JSON Response Helpers]
    Response --> UI
```

## 5.5 Request Lifecycle

```mermaid
sequenceDiagram
    participant User
    participant Page as React Page
    participant Service as Frontend Service
    participant Flask as Flask API
    participant Logic as Backend Service
    participant DB as Database

    User->>Page: Opens planner and selects options
    Page->>Service: loadPlannerData()
    Service->>Flask: GET /api/planner and /api/recommendation
    Flask->>Logic: Validate input and build response
    Logic->>DB: Read temple, route, budget, place data
    DB-->>Logic: Records
    Logic-->>Flask: Planner and recommendation payload
    Flask-->>Service: JSON response
    Service-->>Page: Normalized data
    Page-->>User: Plan, route, budget, timeline, tips
```

## 5.6 Database Relation Diagram

The local schema is defined in `database/schema.sql`. The same logical model supports migration to AWS RDS MySQL.

```mermaid
erDiagram
    TEMPLES ||--o{ BUDGETS : has
    TEMPLES ||--o{ SCHEDULES : has
    TEMPLES ||--o{ TEMPLE_PLACES : has

    TEMPLES {
        string temple_id PK
        string temple_name
        string state
        string district
        string location
        string description
        string best_visit_time
        string speciality
    }

    TRAVEL_ROUTES {
        string route_id PK
        string source
        string destination
        string travel_mode
        string duration
        string estimated_cost
    }

    BUDGETS {
        string budget_id PK
        string temple_id FK
        string budget_type
        int min_cost
        int max_cost
        int persons
        int days
    }

    SCHEDULES {
        string schedule_id PK
        string temple_id FK
        string activity
        string start_time
        string end_time
    }

    TEMPLE_PLACES {
        string place_id PK
        string temple_id FK
        string place_name
        string place_type
        string distance_from_temple
    }
```

## 5.7 AWS Network Flow

```mermaid
flowchart LR
    User[User Browser] --> Internet[Internet]
    Internet --> EC2SG[EC2 Security Group]
    EC2SG --> Nginx[Nginx on EC2]
    Nginx --> Gunicorn[Gunicorn Service]
    Gunicorn --> Flask[Flask Backend]
    Flask --> RDSSG[RDS Security Group]
    RDSSG --> RDS[(AWS RDS MySQL)]
    CloudWatch[CloudWatch] -. metrics/logs .-> EC2SG
    IAM[IAM] -. role and permissions .-> EC2SG
```

## 5.8 CI/CD Flow

The repository uses GitHub for source control and `gh-pages` for frontend deployment. The AWS migration flow is supported by manual build, upload, service configuration, and deployment validation evidence.

```mermaid
flowchart TD
    Dev[Developer Changes] --> Git[Git Commit and Push]
    Git --> Build[npm run build]
    Build --> GHPages[npm run deploy to GitHub Pages]
    Git --> AWSUpload[Transfer Build and Backend Files to EC2]
    AWSUpload --> Service[Gunicorn and Nginx Service Setup]
    Service --> Validate[Validate Frontend, Backend, RDS, CloudWatch]
```

## 5.9 Design Evidence

[INSERT IMAGE:
development/ProjectStructure.png
Caption: Project structure evidence used for system design verification.]

[INSERT IMAGE:
aws_deployment/rds_configuration.png
Caption: AWS RDS configuration evidence for production database setup.]

[INSERT IMAGE:
aws_deployment/security_groups_EC2.png
Caption: EC2 security group evidence for AWS network configuration.]
