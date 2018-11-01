echo off
echo generating for vscode
dotnet bin/ProtoGenerator.dll ts ./ProtoFile ../../Client/src/Net/ProtoHelper.ts
call pbjs -t static-module -w amd --dependency ./protobufjs --force-long -o ..\..\Client\bin\libs\protos.js .\ProtoFile\*.proto
call pbts --no-comments -n -o ..\..\Client\src\libs\protos.d.ts ..\..\Client\bin\libs\protos.js
uglifyjs ..\..\Client\bin\libs\protos.js -o ..\..\Client\bin\libs\protos.js -c -m

echo generating for wx_mini
call pbjs -t static-module -w es6 --es6 --no-comments --dependency protobufjs --force-long -o ..\..\wx\js\Libs\protos.js .\ProtoFile\*.proto