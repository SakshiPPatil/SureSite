@echo off
echo Starting SureSite Application with Docker...

echo.
echo *** BUILDING AND STARTING DOCKER CONTAINERS ***
echo.

REM Navigate to the project root directory
cd /d "C:\Users\OWNER\Downloads\workingSureSite\workingSureSite\SureSite"

REM Build and start Docker containers
docker-compose up --build

echo.
echo Docker containers are running.
echo Backend: http://localhost:5028
echo Frontend: http://localhost:5029
echo.