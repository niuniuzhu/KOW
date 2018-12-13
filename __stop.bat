@echo off
taskkill /f /t /fi "windowtitle eq LS*"
taskkill /f /t /fi "windowtitle eq GS*"
taskkill /f /t /fi "windowtitle eq CS*"
taskkill /f /t /fi "windowtitle eq BS*"
taskkill /f /t /fi "windowtitle eq DB*"
taskkill /f /t /fi "windowtitle eq shell"