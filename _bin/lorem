#!/bin/sh

if [ $# -eq 2 ] || [ $# -eq 3 ]; then
    OK=0
    if [ "$1" = "-w" ]; then
        LOREM_TYPE="words"
        OK=1
    fi
    if [ "$1" = "-p" ]; then
        LOREM_TYPE="paras"
        OK=1
    fi
    if [ "$1" = "-b" ]; then
        LOREM_TYPE="bytes"
        OK=1
    fi
    AMOUNT=$2
    START="yes"
    if [ $# -eq 3 ] && [ "$3"="-n" ]; then
        START="no"
    fi
    if [ $OK -eq 1 ]; then
        RAW_LIPSUM=$(curl -fsSkL "http://www.lipsum.com/feed/xml?amount=$AMOUNT&what=$LOREM_TYPE&start=$START")
        #delete before lipsum
        LIPSUM=${RAW_LIPSUM#*<lipsum>}
        #delete after lipsum
        LIPSUM=${LIPSUM%</lipsum>*}
        echo "$LIPSUM"
        exit 0
    fi
else
    echo 'Usage: lorem_ipsum [-w|-p|-b] N [-n M]'
    echo '  where'
    echo '  N is an integer indicating the number of words/paragraphs/bytes'
    echo '  M can be yes or no which indicates whether the generated word/paragraph/byte starts with "Lorem ipsum ..." It is optional and default value is yes.'
    echo '  '
    echo 'Examples:'
    echo 'lorem_ipsum -p 3'
    echo 'Generates 3 paragraphs of lorem ipsum.'
    echo '  '
    echo 'lorem_ipsum -p 3 -n no'
    echo 'Generates 3 paragraphs of lorem ipsum which doesnt start with "Lorem ipsum ..."'
    echo '  '
    echo 'lorem_ipsum -w 10'
    echo 'Generates 10 words of lorem ipsum.'
    echo '  '
    echo 'lorem_ipsum -b 64'
    echo 'Generates 64 bytes of lorem ipsum.'
    echo '  '
    echo 'Credits:'
    echo 'The lorem_ipsum script is written by Dogukan Cagatay (http://github.com/dogukancagatay)'
    echo 'The Lorem Ipsum extract taken from http://www.lipsum.com/ courtesy of James Wilson'

fi
