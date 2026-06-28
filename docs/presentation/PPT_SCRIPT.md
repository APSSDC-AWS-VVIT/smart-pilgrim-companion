# PPT Script

## Opening

Good morning respected faculty members and panel members. We are presenting our academic project, **Smart Pilgrim Companion: Cloud-Based Spiritual Travel & Temple Assistance Platform Using AWS**.

This project is a full-stack cloud-ready platform that helps pilgrims explore temples, view temple details, plan trips, compare route and budget information, and receive recommendation-based planning support.

## Slide 1: Cover

This is our project, Smart Pilgrim Companion. It is built as a React + Vite frontend with a Flask backend and AWS deployment architecture. Our team leader is Bhargav Sai Viswanath, and the project was completed with contributions from Meghana, Soumya, Vishnu, and Soumya2.

## Slide 2: Problem Statement + Motivation

Pilgrimage planning is often fragmented. A pilgrim needs temple information, travel routes, budgets, schedules, and nearby places, but these details are usually spread across multiple sources. Our motivation was to bring these planning needs into one simple digital platform.

## Slide 3: Solution Overview

Our solution provides temple discovery, temple details, a trip planner, recommendation output, route and budget support, explore pages, and responsive UI. The project was developed locally, deployed through GitHub Pages for frontend hosting, and migrated to an AWS architecture using EC2, Nginx, Gunicorn, Flask, and RDS.

## Slide 4: System Architecture

The user accesses the React frontend through the browser. In the AWS path, requests are served from EC2 through Nginx. Nginx forwards requests to Gunicorn, Gunicorn runs the Flask backend, and Flask connects to AWS RDS MySQL. IAM is used for access control and CloudWatch is used for monitoring evidence.

## Slide 5: Development Journey

The project followed five phases: planning, development, deployment, testing, and documentation. We prepared datasets, developed the backend APIs, integrated the frontend service layer, validated deployment, captured screenshots, and prepared the final documentation and presentation assets.

## Slide 6: Key Features

The main features are temple search, trip planner, recommendation generation, explore page, about page, and responsive user interface. The planner uses backend APIs to return temple details, selected routes, budget options, timeline steps, nearby places, and smart tips.

## Slide 7: Deployment Showcase

This slide shows our dual deployment architecture. The frontend was deployed through GitHub Pages, and the AWS deployment evidence includes EC2 hosting, Nginx server status, Gunicorn service status, RDS configuration, RDS monitoring, security groups, and CloudWatch monitoring.

## Slide 8: Team Contributions

The team contributions were divided by responsibility. Bhargav handled architecture, integration, and deployment. Meghana handled frontend, UI validation, and assets. Soumya worked on dataset and RDS validation. Vishnu handled testing and CloudWatch monitoring. Soumya2 handled IAM and documentation.

## Slide 9: Results + Metrics

The final result is a working full-stack application with deployment evidence, testing evidence, and final output screenshots. We validated the application screens, backend behavior, AWS deployment, Nginx and Gunicorn services, RDS configuration, and cloud monitoring.

## Slide 10: Learnings + Future Scope

Through this project, we learned frontend development, backend API design, dataset-driven database modeling, EC2 deployment, Nginx reverse proxy setup, Gunicorn service hosting, RDS connectivity, IAM, and CloudWatch monitoring. Future improvements can include CloudFront, Route53, notifications, improved AI recommendations, HTTPS, and admin data management.

## Slide 11: Thank You

Thank you for listening to our project presentation. We are ready to answer your questions.

## Viva Quick Answers

### What is the main objective of the project?

To create a cloud-based spiritual travel and temple assistance platform that helps users explore temples and plan pilgrim journeys with route, budget, schedule, and recommendation support.

### Which frontend technology is used?

React with Vite, React Router DOM, Axios, and Tailwind CSS.

### Which backend technology is used?

Flask with Flask-CORS, Flask-SQLAlchemy, pandas support, and Gunicorn for production.

### Which database is used?

The local implementation uses SQLite. The AWS deployment target uses AWS RDS MySQL through the `DATABASE_URL` environment configuration.

### Why is Nginx used?

Nginx acts as a reverse proxy in front of Gunicorn and Flask. It handles incoming web traffic and forwards backend requests to the application server.

### Why is Gunicorn used?

Gunicorn runs the Flask app as a production WSGI server, which is more suitable for deployment than Flask's development server.

### What is CloudWatch used for?

CloudWatch is used for monitoring evidence, including EC2 and service-level visibility.

### What is IAM used for?

IAM is used for AWS access control and permission management.

### What are the main APIs?

The backend includes APIs such as `/api/health`, `/api/temples`, `/api/temples/<identifier>`, `/api/routes`, `/api/planner`, `/api/recommendation`, `/api/performance`, and `/api/analytics/summary`.

### What is the future scope?

CloudFront, Route53, notifications, improved AI recommendations, HTTPS/domain setup, and admin management screens.
