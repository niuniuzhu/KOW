dotnet bin/ProtoGenerator.dll ts ./ProtoFile ../../Client/src/Net/ProtoHelper.ts
call pbjs -t static-module -w amd --dependency libs/protobufjs --force-long -o ..\..\Client\bin\libs\protos.js .\ProtoFile\*.proto
call pbts -o ..\..\Client\src\libs\protos.d.ts ..\..\Client\bin\libs\protos.js --no-comments
call pbjs -t static-module -w amd --no-comments --dependency libs/protobufjs --force-long -o ..\..\Client\bin\libs\protos.js .\ProtoFile\*.proto