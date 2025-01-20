@echo off
echo Aktualizowanie migracji...

python manage.py makemigrations
python manage.py migrate


echo Uruchamianie backendu Django...
start /min cmd /c "python manage.py runserver"

:: Otwórz stronę backendu w przeglądarce
start http://127.0.0.1:8000/admin/

echo Backend został uruchomiony.
pause
