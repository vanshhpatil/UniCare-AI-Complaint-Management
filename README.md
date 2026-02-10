# UniCare – AI Powered Complaint & Issue Resolution System

UniCare is a web-based AI-powered complaint management system designed for university environments.  
It uses Natural Language Processing (NLP) to automatically predict complaint **category** and **priority**, enabling faster and more efficient resolution.

## Features
- Student complaint registration & tracking
- AI-based category & priority prediction
- Admin dashboard with analytics
- Report export (CSV / PDF)
- Secure authentication

## Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- AI Service: Python, FastAPI, scikit-learn (TF-IDF + Logistic Regression)

## Project Structure
frontend/ → Student & Admin UI
backend/ → REST APIs & business logic
ai-service/ → NLP-based AI microservice


## How to Run

### AI Service
```bash
cd ai-service
pip install -r requirements.txt
uvicorn app:app --reload --port 8000

Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

Future_Scope
Model accuracy improvement
Cloud deployment
Public service complaint support

Author
Vansh Patil