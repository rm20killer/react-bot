#!/bin/bash
info=$(youtube-dl -o "%(width)d-%(height)d-%(fps)d-%(vbr)d-%(abr)d-%(tbr)d-%(duration)d-.%(ext)s" --get-filename -f bestvideo/best "$1")
IFS="-" read -a infoarray <<< $info
w=${infoarray[0]}
h=${infoarray[1]}
f=${infoarray[2]}
v=${infoarray[3]}
a=${infoarray[4]}
t=${infoarray[5]}
d=${infoarray[6]}
fail=0
if [[ $w != "NA" && $h != "NA" ]] ; then
  a=$(echo "${infoarray[0]} * 1000 / ${infoarray[1]}" | bc)
else
  a="NA"
fi
if [[ $w != "NA" && $w -lt 1280 ]] ; then
  echo "Width requirement FAILED! Must be 1280, was $w"
  fail=1
fi
if [[ $h != "NA" && $h -lt 720 ]] ; then
  echo "Height requirement FAILED! Must be 720, was $h"
  fail=1
fi
if [[ $f != "NA" && $f -lt 29 ]] ; then
  echo "FPS requirement FAILED! Must be 30, was $f"
  fail=1
fi
if [[ $v != "NA" && $v -lt 1500 ]] ; then
  echo "vBitrate requirement FAILED! Must be 1500kbps, was $v"
  fail=1
fi
if [[ $a != "NA" && $a -lt 120 ]] ; then
  echo "aBitrate requirement FAILED! Must be 120kbps, was $a"
  fail=1
fi
if [[ $t != "NA" && $t -lt 1500 ]] ; then
  echo "tBitrate requirement FAILED! Must be 1500kbps, was $t"
  fail=1
fi
if [[ $a != "NA" && ($a -gt 2000 || $a -lt 1600) ]] ; then
  echo "Aspect ratio requirement FAILED! Was $a"
  fail=1
fi
if [[ $fail -eq 0 ]] ; then
  echo "All requirements passed!"
  exit 0
else
  echo "This clip fails!"
  exit 1
fi
