@echo off
echo Uruchamianie backendu i frontendu...

:: Uruchom backend Django w tle
start /min cmd /c "cd backend && python manage.py runserver"

:: Uruchom frontend React w tle
start /min cmd /c "cd myfrontend && npm start"

:: Otwórz strony w przeglądarce
start http://127.0.0.1:8000/api/tasks/

echo Wszystkie usługi zostały uruchomione.
pause
