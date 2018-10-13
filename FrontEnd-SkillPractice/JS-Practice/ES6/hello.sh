# !/bin/bash
# my first hello shell
# run -> sh hello.sh
echo '-----------------------------------------------'
echo "|||||hello,user！"
echo "|||||today is" `date`
json=`curl -s http://www.weather.com.cn/data/sk/101270106.html`
#echo $json
city=`echo $json | sed 's/.*city":"//g'| sed 's/","cityid.*$//g'`
temp=`echo $json | sed 's/.*temp":"//g'| sed 's/","WD.*$//g'`
wd=`echo $json | sed 's/.*WD":"//g'| sed 's/","WS.*$//g'`
ws=`echo $json | sed 's/.*WS":"//g'| sed 's/","SD.*$//g'`
echo '|||||you are now at '$city','$temp'℃,'$ws$wd'.'
echo '-----------------------------------------------'
echo '
..XXX. .XXX..
.XXXXY.TXXXX.
XXXXXYXTXXXXX
.VXXVYXTVXXX.
`.TYXTXYXTV .
` ,YVTXYYV .,
`...XXXXX`..,
.`...XXX...,.
..`   V   , . '
# secret do not open it !!! 
# | tr '.`, VYTX' ' ()__() '
