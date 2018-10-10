@echo off
for /f "delims=" %%a in ('dir /a-d /b .\ProtoFile\') do protoc --csharp_out=../Protocol --proto_path=./ProtoFile --csharp_opt=file_extension=.g.cs ./ProtoFile/%%a
pause