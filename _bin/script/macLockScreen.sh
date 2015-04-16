#!/bin/bash


open '/System/Library/Frameworks/ScreenSaver.framework/Resources/ScreenSaverEngine.app'
while [ $? -eq 0 ]
do
  osascript -e 'tell application "System Events" to key code 123'
  sleep 10
  ps cax | grep ScreenSaverEngine > /dev/null
done
