@echo off
PUSHD %~dp0Server\Bin\
dotnet GateServer.dll --id=30002 -n local2 --external_port=40002