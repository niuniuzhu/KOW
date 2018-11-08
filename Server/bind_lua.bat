@echo off
cd Bin
dotnet ..\LuaBinder\bin\Debug\LuaBinder.dll GateServer.dll ..\GateServer\LGen\
cd..
