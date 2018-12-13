@echo off
PUSHD %~dp0Server\Bin\
dotnet LoginServer.dll -c Config/LSCfg.json