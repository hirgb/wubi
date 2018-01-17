#!/usr/bin/python3
import json

f = open('jishuang-ciku-6-utf8.txt', 'r', encoding = 'utf-8')
fanalData = {}
l = f.readline()[0:-1]
while(l):
    templist = l.split(' ')
    if(templist[1] in fanalData):
        fanalData[templist[1]].append(templist[0])
    else:
        fanalData[templist[1]] = [templist[0]]
    l = f.readline()[0:-1]
else:
    f.close()
    w = open('jishuang-ciku-translated.txt', 'w+')
    w.write(json.dumps(fanalData))
    w.close()
    print(fanalData)
exit()
