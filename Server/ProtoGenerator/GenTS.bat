dotnet bin/ProtoGenerator.dll ts ./ProtoFile ../../Client/src/Net/ProtoHelper.ts
pbts -o ..\..\Client\src\libs\protos.d.ts ..\..\Client\bin\libs\protos.js --no-comments