@echo off
cd Bin
dotnet ..\LuaBinder\bin\Debug\LuaBinder.dll GateServer.dll ..\GateServer\LGen\
dotnet ..\LuaBinder\bin\Debug\LuaBinder.dll CentralServer.dll ..\CentralServer\LGen\
dotnet ..\LuaBinder\bin\Debug\LuaBinder.dll BattleServer.dll ..\BattleServer\LGen\
cd..
