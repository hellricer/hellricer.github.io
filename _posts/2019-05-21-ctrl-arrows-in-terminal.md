---
title: Ctrl+Arrows in terminal
tags: [cli, tui, terminal, bash, zsh, shell, vim]
layout: post
reddit: braux1
---

Basically every program with some kind of input field supports `Ctrl+Arrows` for skipping over words,
`Ctrl+Backspace`, `Ctrl+Del` for deleting words, `Ctrl+Shift+Delete` for deleting rest of the line, etc.

Terminal emulators, on the other hand…

We could go to great lengths explaining reasons, history of vt100, etc… But the reality is that even when you're not particularly fond of GUI apps, you probably use at least a web browser and you likely have these shortcuts engraved into your muscle memory anyway.

Of course, you can use `Alt+Arrow` and other [very powerful](https://readline.kablamo.org/emacs.html) `readline` bindings, but that means learning
whole new, [quite esoteric set of shortcuts for rather basic things](https://clementc.github.io/blog/2018/01/25/moving_cli/) like moving around and deleting text.

So, if you want to join me in spitting on the VT100's grave and admitting that GUI apps won this round, this post is for you.

Settings presented below *should* cover most scenarios, but in case they don't, you will have to find out the sequences your terminal produces.
Easiest way is to run `cat` and see what sequences are printed.

Note that when you use `tmux`, many key codes are different by default. For example, plain `xterm` sends `^[[1;5D` on `Ctrl+Left` while `tmux` sends `^[OD`.
I have no idea what's the reason behind this, but you can save yourself some headache by putting `set-window-option -g xterm-keys on` to your `~/.tmux.conf`.

Unfortunately, binding `Ctrl+Shift+…` is much more problematic and there's actually no way to bind `Ctrl+Shift+Backspace.`-
You can bind `backward-kill-line` to some other shortcut, or use one of the default ones `Ctrl+U` or `Ctrl+X Backspace`.

<em>Note:</em> If your terminal/shell produces sequences that are not listed, I would be grateful if you send me an email, so I can add them here.


# bash/readline (configured in ~/.inputrc)

<hr>

    ### ctrl+arrows
    # works in most terminals: xterm, gnome-terminal, terminator, st, sakura, termit, …
    "\e[1;5C": forward-word
    "\e[1;5D": backward-word
    # urxvt
    "\eOc": forward-word
    "\eOd": backward-word

    ### ctrl+delete
    "\e[3;5~": kill-word
    # in this case, st misbehaves (even with tmux)
    "\e[M": kill-word
    # and of course, urxvt must be always special
    "\e[3^": kill-word

    ### ctrl+backspace
    "\C-h": backward-kill-word

    ### ctrl+shift+delete
    "\e[3;6~": kill-line
    # URxvt note: you have to disable Ctrl+Shift popup in ~/.Xresources:
    # URxvt.iso14755: true
    # URxvt.iso14755_52: false
    "\e[3@": kill-line
    # st sends same sequence as plain delete :(
<hr>


#  zsh/zle (configured in ~/.zshrc)

<hr>

    ### ctrl+arrows
    bindkey "\e[1;5C" forward-word
    bindkey "\e[1;5D" backward-word
    # urxvt
    bindkey "\eOc" forward-word
    bindkey "\eOd" backward-word

    ### ctrl+delete
    bindkey "\e[3;5~" kill-word
    # urxvt
    bindkey "\e[3^" kill-word

    ### ctrl+backspace
    bindkey '^H' backward-kill-word

    ### ctrl+shift+delete
    bindkey "\e[3;6~" kill-line
    # urxvt
    bindkey "\e[3@" kill-line

<hr>


# bonus: vim

If this post wasn't heretical enough, here's also mapping for vim.

I know, there are better ways to move in vim, but it's still an improvement over
deleting/changing 5 lines, which is how vim interprets these sequences by default.

<hr>

    " ctrl+left/right
    nmap <ESC>[1;5D <C-Left>
    nmap <ESC>[1;5C <C-Right>
    cmap <ESC>[1;5D <C-Left>
    cmap <ESC>[1;5C <C-Right>
    imap <ESC>[1;5D <C-o><C-Left>
    imap <ESC>[1;5C <C-o><C-Right>
    " ctrl+backspace
    nmap <C-h> <C-w>
    cmap <C-h> <C-w>
    imap <C-h> <C-w>

<hr>

