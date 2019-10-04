---
layout: post
title: Color me impressed
tags: [shell, bash, zsh, cli, tui]
---
{% import 'macros.html' as macros with context %}

I'm crazy about colors.

I work with terminal emulators all the time and nothings is more deterrent to
me than big wall of black & white text spitted out into my 300x100 terminal.

I want my errors red and successes green, I want numbers, URLs and paths pop
out from the rest of the text, I want colored logs, compiler outputs, source
code snippets... It really makes your terminal experience much more fun.

So let's take a look where my obsession brought me so far.

## Brief history

In the late 70s, the number of character-oriented terminals was rapidly
expanding. Of course there was no "de jure" standard and each manufacturer
handled their [escape sequences](http://en.wikipedia.org/wiki/Escape_sequence)
differently. That meant that every screen-handling program had to be written
for one (type of) terminal only.

To deal with these incompatibilities, Bill Joy foresightedly created the
`termcap` library (**term**inal **cap**abilities), mainly to make his
legendary `vi` editor more portable. This also allowed others to write screen-
oriented applications not dependent on one particular terminal. Brilliant
idea, which was over time gradually pushed out by `terminfo` implementing the
same principle with several improvements. Later, even more abstract libraries
like `curses` emerged, using `termcap` or `terminfo` under the hood.

Big change was the terminal VT100 by DEC in 1978. It was the first terminal
with its escape sequences based on the [ANSI escape
codes](https://en.wikipedia.org/wiki/ANSI_escape_code), which was a new
standard that gradually gained popularity as more and more software started to
assume its presence on terminals. This led yet another terminals and terminal
emulators to implement it. Almost every terminal emulator on modern
distributions emulate VT100 or its successors.

This standard allowed to control the formatting, emphasis, blinking,
positioning the cursor, deleting lines and - colors. Eight of them, each in
normal and bright variant. Unlike the Web colors or X Window color standards,
ANSI only defines color _names_. Each terminal can assign color values
differently, which can be configured most of the time. Nowadays, majority of
terminal emulators support 8-bit palette.

## Prompt

The first thing you should do is to make your prompt pop out of the wall of
applications' outputs. This way you can easily navigate on screen, see what
commands did what etc. I won't go into details (which differ shell to shell
anyway), just look at the difference:

{{ macros.figure("/assets/images/colors/command_line.png", "Colored command line") }}

This picture demonstrates also [zsh syntax highlighting](https://github.com
/zsh-users/zsh-syntax-highlighting) syntactically coloring the command line
and [stderred](https://github.com/sickill/stderred) coloring the STDERR red.

## Out of the box

Some of the standard GNU coreutils have to colored output support built in,
but it might not be enabled by default on all distributions.

You probably do have colors in your `ls`, but the `--color=auto` option works
also on `grep` or `cal`. Naturally, colors of `grep` and `ls` can be
customized. In `grep` there's only one color (the match) and you can change it
by setting `GREP_COLOR` environment variable.


    export GREP_OPTIONS='--color=auto'
    export GREP_COLOR='1;33'


But you're already using `ag` anyway, aren't you? ;)

It's a bit more complicated with `ls`. First off, there are currently two
widespread implementations - the GNU `ls` on most unices and BSD `ls` on BSDs
and Mac Os X. Each have different syntax for defining colors. And secondly,
there is lot to configure.

Fortunately, there is [`LSCOLORS` generator](http://geoff.greer.fm/lscolors/)
by Geof Greer (famous for his amazing Silver Searcher - also colored!), which
turns it into fun.

Note: `--color=always` produces ANSI sequences also when using the program
non-interactively, which may cause difficulties in scripts.

## Man pages

Colored man pages can achieved in multiple ways. You can use `less`, `most`,
or `vim` depending on what your needs are.

I chose `less` because I'm most used to it. Again, I won't go into details
about how to set it up - there are lot of blog posts on web about it. In
short, you basically have redefine some `termcap` sequences to display colors.

{{ macros.figure("/assets/images/colors/man_pages.png", "Did you ever enjoy reading these? Now you can!") }}

The `most` works out of the box - just set `$MANPAGER` (or `$PAGER`) variable
and you're done. One slight problem is that the shortcuts are different from
`less` (you can re-bind them, though).

## The rest

What about the tools that don't have built-in color support? Should one search
for alternatives written in ncurses, like `htop` to `top` or `most` to `less`
and use them instead? That's one option, but remember that one of the
fundamental principles of Unix philosophy is to write small programs that work
well together.

So let's leave the job to colorizers! After wading through several colorizers
for different purposes (Maven, syslog, traceroute), I started feeling that
this is not the best way.

Fortunately, others had that feeling before me, so there's already few
general-purpose colorizers that can be extended to other purposes easily.

I tried four most famous ones `ccze`, `source-highlight`, `grc` and `rainbow`,
in chronological order.

`ccze` is a C port of `colorize` written in perl. It focuses on colorizing
logs in various formats. It is probably intended mainly for system
administrators as it supports `syslog`, `procmail`, `httpd` and the like.

[GNU source-highlight](http://www.gnu.org/software/src-highlite/source-
highlight.html) focuses on colorizing programming languages, which isn't
really useful for command-line work. On the other hand, this program has the
most powerful language for defining the syntax. All the other tools presented
here work only with regex.

Relatively young programs are
[`grc`](http://kassiopeia.juls.savba.sk/~garabik/software/grc.html). and
[`rainbow`](https://github.com/nicoulaj/rainbow). They're both written in
Python, each have the same philosophy, similar library of config files, but
each realizes it slightly differently.

They can be easily installed through `pip` and writing new extensions is
really easy. The advantage of `rainbow` is that it can be configured "inline"
without config files, but I also ran against some issues with usability (i.e.
no `--color=auto`?). So no judging, try both!

{{ macros.figure("/assets/images/colors/grc.png", "grc in action.") }}

Note for `zsh` users: if you define alias for e.g. `ping` as `ping=grc ping`,
then you'll lose smart completion of arguments, because `zsh` completion
system expands it before finding relevant completion function.

To get around this, define function instead:


    ping() { grc --colour=auto /usr/bin/ping "$@" }


## Conclusion

Colors make your work more fun and allow you to navigate in text more easily.
Most of the widely used programs like `git` or `gcc` already have colored
output support. For the rest, you can still write new module for one of the
existing colorizers.

Bonus: I mostly work with Java, so I wrote `grc` config file [for
Maven](https://gist.github.com/RobSis/50af3d3ef8e747a0bd18). If you write
another one, contribute it to the original project, or share them somewhere!
At least with me ;)
