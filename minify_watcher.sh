#!/usr/bin/env bash

find assets/ ./*.* \
    | entr sh -xc "cat assets/js/plugins/*.js assets/js/_main.js \
        | yui-compressor --type js -o assets/js/scripts.min.js ; \
        lessc assets/less/main.less > assets/css/main.min.css"
