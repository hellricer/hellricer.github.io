---
layout: post
title: Generating zsh completion functions
tags: [shell, zsh, cli]
reddit: 2cp0l8
---

When I switched from `bash` to `zsh`, I was surprised to find how many
standard programs lacked completion functions. Only few of the coreutils are
supported in `zsh` after the install.

Although there are user-contributed repositories like [zsh-users/zsh-
completions](http://github.com/zsh-users/zsh-completions) I still couldn't
find completion functions for tools like `cat`, `nl`, `df` and others.

So I [wrote some](http://github.com/zsh-users/zsh-completions/pull/250) and
I've realized that I basically just copied the info from help text to the
completion function. Boring! Something that even a machine could do. Well,
almost...

Almost every program with command line arguments implements the `--help`
option, which prints out all the options with their description. So why not
use that for generating the functions?

... Because every program uses slightly different format and it would be
nightmare to cover all the cases, you say? Then you're exactly right. But then again,
I though that I don't anything perfect, just something that mostly works.

So I wrote a `zsh` plugin I wrote [that does exactly that.](http://github.com/RobSis/zsh-completion-generator).

Luckily, most programs do play nice. But help texts are still meant to be for
humans so beware that it still can bork sometimes...

The plugin parses short and long options and their descriptions from commands's help
texts and then generates functions automatically. Read the README of the
project for more info about usage.

Here follows a test file that demonstrates common patterns in help texts and
the generated function:

<hr>

    Usage: imag [options] [target] ...
    Imaginary command the sake of demonstration.

    Options:
      -b, -m                      Few words of description.
      -B --always-make            Short and long variant.
      -C DIRECTORY, --directory=DIRECTORY
                                  This description is on the next line.
      -d                          Short option only.
      --no-print-directory        Long option only.
      --debug[=FLAGS]             Print various types of debugging information.
      -f FILE, --file=FILE, --makefile=FILE
                                  More variants of one option are supported.
      -h --help                   No comma.
      -j [N], --jobs[=N]          Short options can have arguments too!
      -k, --no-description
      -S, --no-keep-going, --stop
                                  Same as --whatever.
      -W FILE, --what-if FILE, --new-file FILE, --assume-new FILE
                                  Even more variants without equals.

    Current caveats: (these cases fail or don't work properly)
      -t        Two column help text   -T     can be found in some programs.
      --only-one-space Between argument and description.
      -D <var>:<type>=<value>     Harder syntax right in the option.
      --help={target|optimizers|warnings|params|[^]{joined|separate|undocumented}}[,...]
                                  This baby from gcc's help text.

    This program built for x86_64-pc-linux-gnu
    Report bugs to <bug@gnu.org>

<hr>

`$ gencomp imag`

<hr>


    #compdef imag

    # zsh completions for 'imag'
    # automatically generated with http://github.com/RobSis/zsh-completion-generator
    local arguments

    arguments=(
        {-b,-m}'[Few words of description.]'
        {-B,--always-make}'[Short and long variant.]'
        {-C,--directory}'[This description is on the next line.]'
        '-d[Short option only.]'
        '--no-print-directory[Long option only.]'
        '--debug[Print various types of debugging information.]'
        {-f,--file,--makefile}'[More variants of one option are supported.]'
        {-h,--help}'[No comma.]'
        {-j,--jobs}'[Short options can have arguments too!]'
        {-k,--no-description}'[]'
        {-S,--no-keep-going,--stop}'[Same as --whatever.]'
        {-W,--what-if,--new-file,--assume-new}'[Even more variants without equals.]'
        '-t[Two column help text   -T     can be found in some programs.]'
        '--only-one-space[argument and description.]'
        '-D[<value>     Harder syntax right in the option.]'
        '--help[^\]{joined|separate|undocumented}}\[,...\]]'
        '*:filename:_files'
    )

    _arguments -s $arguments

<hr>
