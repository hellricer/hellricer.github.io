#!/usr/bin/env bash

lessc assets/less/main.less > assets/css/main.min.css && obraz build && {
    rm -Rf ../hellricer.github.io/*
    mv _site/* ../hellricer.github.io/
    rm -Rf ../hellricer.github.io/assets/less
    rm -f ../hellricer.github.io/*.sh
}
