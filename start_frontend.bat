@echo off
echo Uruchamianie frontendu React...

start /min cmd /c "python manage.py runserver"
:: Uruchom frontend React w tle
start /min cmd /c "cd myfrontend && npm start"


echo Frontend został uruchomiony.
pause
