@echo off
PUSHD %~dp0Server\Bin\
dotnet BattleServer.dll -c Config/BSCfg.json -f Config/battle_defs.json