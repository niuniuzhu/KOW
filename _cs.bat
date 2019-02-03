@echo off
PUSHD %~dp0Server\Bin\
dotnet CentralServer.dll -c Config/CSCfg.json -f Config/battle_defs.json