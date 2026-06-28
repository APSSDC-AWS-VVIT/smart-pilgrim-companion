# Abstract

Smart Pilgrim Companion is a cloud-based spiritual travel and temple assistance platform designed to help pilgrims explore temples, view temple details, plan visits, estimate budgets, review travel routes, and receive recommendation-based planning support.

The implemented project uses a React + Vite frontend and a Flask backend. The frontend contains pages for Home, Temples, Temple Details, Explore, Planner, and About. The backend exposes REST APIs under `/api` for temples, planner data, recommendations, routes, analytics summary, performance metrics, and health validation. The data model is based on temple information, travel routes, budgets, schedules, nearby places, user scenarios, and metadata stored in repository datasets and connected through SQLAlchemy models.

For local development, the project supports a localhost workflow using Vite and Flask. For public hosting, the frontend supports GitHub Pages deployment using the `gh-pages` package. For AWS migration, the architecture uses EC2, Nginx reverse proxy, Gunicorn, Flask, AWS RDS MySQL, IAM permissions, and CloudWatch monitoring. The backend configuration reads `DATABASE_URL` and falls back to the local SQLite database when a cloud database URL is not supplied.

The project includes deployment screenshots, testing evidence, GitHub deployment evidence, AWS deployment proof, team contribution proof, and final output screenshots. The resulting system demonstrates full-stack development, cloud migration, deployment validation, and project documentation suitable for academic submission.
