@echo off
echo Uruchamianie backendu Django...

:: Uruchom backend Django w tle
start /min cmd /c "cd backend && python manage.py runserver"

:: Otwórz stronę backendu w przeglądarce
start http://127.0.0.1:8000/api/tasks/

echo Backend został uruchomiony.
pause
