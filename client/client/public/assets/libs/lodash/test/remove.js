#!/usr/bin/env node
"use strict";var _=require("../lodash"),fs=require("fs"),path=require("path"),args=(args=process.argv).slice(args[0]===process.execPath||"node"===args[0]?2:0),filePath=path.resolve(args[1]),reLine=/.*/gm,pattern=function(){var e=args[0],r=e.charAt(0),a=e.lastIndexOf(r);return RegExp(e.slice(1,a),e.slice(a+1))}();fs.writeFileSync(filePath,fs.readFileSync(filePath,"utf8").replace(pattern,function(e){var r=_.slice(arguments,-3,-2)[0];return e.replace(r,r.replace(reLine,""))}));