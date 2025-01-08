@echo off
echo Aktualizowanie migracji...
cd backend
python manage.py makemigrations
python manage.py migrate

echo Uruchamianie backendu Django...
start /min cmd /c "python manage.py runserver"

:: Otwórz stronę backendu w przeglądarce
start http://127.0.0.1:8000/api/

echo Backend został uruchomiony.
pause
