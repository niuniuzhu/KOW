@echo off  
:begin
@echo ----------create databases------------ 
mysql -uroot -pron159753 < createdb.sql

@echo ----------create tables------------ 
mysql -uroot -pron159753 df_accountdb < df_accountdb.sql

mysql -uroot -pron159753 df_gamedb_1 < df_gamedb.sql
pause()