@echo off
echo Uruchamianie wszystkich usług...

:: Uruchom backend (niezależnie od frontend)
start /min cmd /c "start_backend.bat"

:: Uruchom frontend
start /min cmd /c "start_frontend.bat"

echo Wszystkie usługi zostały uruchomione.
pause
