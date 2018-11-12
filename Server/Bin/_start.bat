ping -n 1 127.0>nul
echo "start db"
start db.bat

ping -n 1 127.0>nul
echo "start cs"
start cs.bat

ping -n 1 127.0>nul
echo "start gs"
start gs.bat

ping -n 1 127.0>nul
echo "start ls"
start ls.bat

ping -n 1 127.0>nul
echo "start bs"
start bs.bat

ping -n 1 127.0>nul
ping -n 1 127.0>nul
ping -n 1 127.0>nul
echo "start shell"
start shell.bat