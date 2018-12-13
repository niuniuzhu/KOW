@echo off
PUSHD %~dp0Server\Bin\
dotnet GateServer.dll -c Config/GSCfg.json -f Config/battle_defs.json