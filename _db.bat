@echo off
PUSHD %~dp0Server\Bin\
dotnet DBServer.dll -c Config/DBCfg.json