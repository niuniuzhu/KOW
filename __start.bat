ping -n 1 127.0>nul
echo "start db"
start _db.bat

ping -n 1 127.0>nul
echo "start cs"
start _cs.bat

ping -n 1 127.0>nul
echo "start gs"
start _gs.bat

ping -n 1 127.0>nul
echo "start ls"
start _ls.bat

ping -n 1 127.0>nul
echo "start bs"
start _bs.bat

ping -n 1 127.0>nul
ping -n 1 127.0>nul
ping -n 1 127.0>nul
echo "start shell"
start _shell.bat