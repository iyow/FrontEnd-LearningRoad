#!/bin/bash
function changeName(){

  filename=${eachfile%.txt}
  filehead=`echo $1 | awk -F .umd.min.js '{print $1 }'`
  echo $filehead
  echo $filelast
  mv $1 $filehead.js
}
function travFolder(){ 
  echo "travFolder run"
  flist=`ls $1`
  cd $1
  #echo $flist
  for f in $flist
  do
    if test -d $f
    then
      #echo "dir:$f"
      travFolder $f
    else
      #echo "file:$f"
      changeName $f
    fi
  done
  cd ../ 
}
dir=./dist
travFolder $dir