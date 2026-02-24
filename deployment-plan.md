# Deployment Plan (Docker-Ready)

This document outlines the deployment strategy for the DIGITEFA platform.

## Architecture Services
1. **Frontend (Next.js 14)**: Served via standard Node server or standalone build.
2. **Backend (NestJS)**: API Gateway + Business Logic, connects to Postgres.
3. **AI Service (FastAPI)**: Python microservice for embeddings and matching.
4. **Database (PostgreSQL + pgvector)**: Stores relational data and vector embeddings.

## Docker Compose Example

```yaml
version: '3.8'

services:
  db:
    image: ankane/pgvector:latest
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: digitefa
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: "postgresql://postgres:password@db:5432/digitefa?schema=public"
    ports:
      - "3000:3000"
    depends_on:
      - db

  ai-service:
    build:
      context: ./ai-service
      dockerfile: Dockerfile
    ports:
      - "8000:8000"

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3001:3000"
    environment:
      NEXT_PUBLIC_API_URL: "http://localhost:3000"

volumes:
  pgdata:
```

## Dockerfiles
Each service should have a standard multi-stage Dockerfile inside its directory.
- Next.js: `FROM node:18-alpine` using `.next/standalone`
- NestJS: `FROM node:18-alpine` executing `dist/main.js`
- AI Service: `FROM python:3.10-slim` installing PyTorch and running Uvicorn.
