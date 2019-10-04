---
title: New webpage
tags: [cli, tui, terminal, vim, bash, zsh, shell, web]
layout: post
---
{% import 'macros.html' as macros with context %}

Hello!

My name is Hellricer.

This blog will serve as a place to talk about my experiences with terminals and terminal-based programs, great software I've found, tricks & tips for making your time in terminal more enjoyable, “ricing” and GNU/Linux in general.

Most posts will revolve around programs like `vim`, `tmux`, `bash` and so on.

# About this website

This website is based on Jekyll and uses modified version of [so-simple-theme](https://github.com/mmistakes/so-simple-theme), but I'm using [Obraz](http://obraz.pirx.ru) for generating it.

It aims to be modern-looking and responsive, while still being tiny (~1MB) and usable even in terminal-based browsers like `w3m`, `lynx` or `elinks` (pictured below).

{{ macros.figure("/assets/images/editing-webpage.png", "Editing the webpage with elinks for preview.") }}

Styles are written in LESS and minified with `lessc`. JavaScript is minified using `yui-compressor`. I'm using [`entr`](http://eradman.com/entrproject/) to automatically re-minify them when their sources change:

<hr>

    find assets/ ./*.* \
        | entr sh -xc "cat assets/js/plugins/*.js assets/js/_main.js \
            | yui-compressor --type js -o assets/js/scripts.min.js ; \
            lessc assets/less/main.less > assets/css/main.min.css" &

<hr>

You can find the markdown sources at `src` branch of [this repository](https://github.com/hellricer/hellricer.github.io/tree/src).
