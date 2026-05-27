#!/bin/bash

echo "Installing frontend dependencies..."
cd frontend
npm install
npm run build

echo "Starting FastAPI .."

cd ../backend
guvicorn -w 4 -k
uvicorn.workers.UvicornWorker
main:app --bind=0.0.0.0:8000

