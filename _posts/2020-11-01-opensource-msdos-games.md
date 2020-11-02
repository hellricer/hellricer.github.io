---
layout: post
title: Open source games for MS-DOS
tags: [games, opensource]
# reddit: 34e5fh
# image:
#   feature: genes/head.png
---
{% import 'macros.html' as macros with context %}

## Intro

  Most you of probably remember GORILLA.BAS or DONKEY.BAS co-written by Bill Gates himself and many are probably aware that some FPS shooters like Doom and Quake were open-sourced, but otherwise source code wasn't something you saw very often in the DOS gaming world.

  But turns out that some developers did decide to release the games' sources over the course of years.  Most of them have been already rewritten to SDL, making them portable to pretty much any modern platform, but for me the real question is — how hard is it to compile the actual DOS binaries?

  Why would anyone want to do that, you ask?  Because, well..  uhm.  Anyway, let's get into it!


## Mario & Luigi

  {{ macros.youtube("uu9SO6WOnYY", "") }}

  Let's start with this Mario clone written by dutch developer Mike Wiering in 1994.  It has solid controls, smooth scrolling with parallax background and six levels.  According to the author, Mario assets were just a placeholder for engine which was supposed to be used later for other games.  Some of you might remember Sint Nicolaas, which was even featured in LGR, or Charlie the Duck games from the same author.

  Although unofficial, this was still the only Mario game available on DOS, so it spread like fire through various shareware compilations and the early internet.  [Even Tiger Woods knows what's up!](https://www.youtube.com/watch?v=D8RhCIvsjWc)

  Author shared the source on his website in 2008.  It's written in Pascal and compilation is very straight-forward using Turbo Pascal 5.5 or higher.  Just run `TPC /M /L MARIO` and you're done!  Check out the code for some super secret cheat codes!

### Links
 * [LGR - Sint Nicolaas - DOS PC Game Review](https://www.youtube.com/watch?v=p_WfEnHnMKs)
 * [Wiering Software - DOS Nostalgia](https://www.youtube.com/watch?v=gKL3KPU1czM)
 * [Mario & Luigi on Wiering Software website](https://wieringsoftware.nl/mario/)


## Mr. Boom

  {{ macros.youtube("aGf54PbueSY", "") }}

  Another clone from Super Nintendo.  As a die-hard fan of SNES Bomberman series, I must say it feels just like the real thing — the experience of Super Bomberman series is replicated perfectly plus it supports up to 8 players, network multiplayer over IPX and various other goodies.

  It was released in 1999 by bunch of guys active in demoscene and I was surprised to see it is still pretty popular even today — it continues to live in form of a [libretro core][mrboom_libretro] and you can even install it through package managers on most operating systems.  I didn't see the original source linked from the official websites, but [somebody luckily put it on github][mrboom_source].

 The original code is written in Turbo Assembler and you will also need Watcom linker and PMODE/W extender, both of which can be found online easily.  First, you need to compile `SS\REMDY-PM.ASM` and `P.ASM`, link the and then run `IFF/MAKE.BAT` and `GFX/MAKE.BAT` to pack the data into the executable:

    CD SS
    TASMX /mu /m9 /q REMDY-PM.ASM
    CD ..
    TASMX /mu /m9 /q P.ASM
    WLINK @X:\PMW133\PMODEW.LNK system pmodew file P.OBJ , SS\REMDY-PM.OBJ

    CD IFF
    CALL MAKE.BAT
    CD ..
    CD GFX
    CALL MAKE.BAT
    CD ..

Unfortunately the resulting executable freezes after player selection unless you disable monsters (`-M` argument), so there's either probably something wrong with the code or I'm just missing something.  Anybody in a mood for some assembler debugging?

Also the sound is not working, but I couldn't get that working with the original binary either, so that's another thing worth investigating.

### Links
 * [Mr. Boom libretro core][mrboom_libretro]
 * [Original Mr. Boom source code][mrboom_source]

[mrboom_libretro]: https://github.com/Javanaise/mrboom-libretro
[mrboom_source]: https://github.com/bparker06/mrboom30


## Cyberdogs

  {{ macros.youtube("hbcsTmcyq_w", "") }}

  This bad-ass top-down shooter reminiscent of Chaos Engine, True Lies or Alien Breed series was released in 1994 by Swedish developer Ronny Wester as a freeware.

  For one-man project, it's a surprisingly complete game — you have various missions to pass, consisting of shooting up cyborgs and collecting items, you can buy weapons and power-ups between missions, etc.  There's also a co-operative mode for two players with very interesting split-screen mechanics:  players share the screen unless they're too far from each other at which point the screen splits up.

  The source code is written in Turbo Pascal 7 and it was released in 2000.  It's available through Internet Archive on [author's now-defunct personal website][cyberdogs_website].  Two then-commercial libraries for handling graphics and sound are not included in the source package, but both can now be found online so the game can be compiled just fine.

  First, let's have a look at the sound library DSMI.  According to its author, it was licensed to several commercial DOS games including Disney's Lion King and Aladdin.  I suspect that Cannon Fodder 2 also uses it, because it stores the music in DSMI's custom AMF format.  To build it, use `CASM.BAT` to compile all assembler code into object files and then compile pascal unit files with `TPC -B DSMI.PAS`.

  SPX library was distributed in binary form.  According to its README, the source code could be purchased for "the low price of $220"...  Anyway, we can just point the compiler to unit files for version 7.0 and build the game:

    COPY DSMI\DSMI.INC
    TPC -B -UX:\TP7\UNITS;SPX\TPU70;DSMI -ODSMI DOGS.PAS

  Once again, I'm probably missing something because it runs a bit slower than the original executable, but otherwise everything seems to work fine.

### Links
 * [Cyberdogs website][cyberdogs_website] (web archive)
 * [DSMI library](https://github.com/ochrons/dsmi)
 * [SPX library](http://files.mpoli.fi/software/PROGRAMM/PASCAL/)
[cyberdogs_website]: http://web.archive.org/web/20050212133444/http://www.orcsoftware.com/~ronny/Cyberdogs.html


## C-Dogs

  {{ macros.youtube("69ZdmWsbBHw", "") }}

  C-Dogs is a sequel to Cyberdogs released in 1997.  Getting tired of TP's 16-bit protected mode limitations, author completely re-written the game to Watcom C.  It's essentially the same game, but with ton of improvements.  Most notably joystick support, editor, addition of a "dog-fight" which puts two players against each other, many more weapons, and lots of gameplay tweaks.

  Unlike the previous game, there are no missing 3rd party libraries and the source code even includes Makefile!  So if you have your Watcom C set up correctly, the game can be compiled simply by running `WMAKE`.  Definitely the smoothest compiling experience on this list.

### Links
 * [C-Dogs website](http://web.archive.org/web/20050212133345/http://www.orcsoftware.com/~ronny/C-Dogs.html) (web archive)


## Jump 'n Bump

  {{ macros.youtube("hrxutquiKoo", "So cute!") }}

  This single-screen death-match game featuring cute rabbits killing each other in gruesome manner was developed and self-published by Swedish four-member team Brainchild Design in 1998 and its source code was published a year later.  First linux port, utilizing SDL library for graphics, appeared already in 2001 and it is still being maintained until this day.

  After finding the original source release, I was sad to find out that the library that handles graphics and sound routines is provided only in the form of compiled static library.  But the rest of the code can be compiled using NASM and DJGPP compilers:

    nasm -f coff -o gfx.obj gfx.s
    gcc -I. -c main.c menu.c interrpt.c gfx.c
    gcc -I. -L. -o jump.exe interrpt.o main.o menu.o gfx.o gfx.obj -ldj

### Links
 * [Original source code on RGB Classic Games](https://www.classicdosgames.com/game/Jump_'n_Bump.html)
 * [Current fork](https://gitlab.com/LibreGames/jumpnbump)


## Avalon

  {{ macros.youtube("wyJqHWSfCmA", "") }}

  Critically acclaimed but highly underrated RPG game Avalon was released in 1998 as a freeware.  It doesn't really excel in graphics department, but it has it charm.  It features sound effects & ton of music, large scrolling world, some puzzle-solving and it just feels like a complete game.

  This source code was kind of a stumper for me.  All 3rd-party libraries are in form of Turbo Pascal unit files, so no sources.  By googling the names, I've found out that some TPUs come from MODEX library by Mike Chapin (MXPRPAS), some come from *MiGTracker* (where they're also included without sources), some are from rather obscure sound library *tucgpl12* and you'll need an object file from *a different* library called MODEX written by Matt Pritchard.  There's still one TPU called `CTVOICE.TPU` which I wasn't able to track to its origin...

  Anyway, since they're all included with Avalon source, compilation is easy:

    TPC -B -U..\TPU -OMXPRPAS AVALON.PAS

  You just need to use Turbo Pascal 7.0, because that's apparently the version which was used to compile the TPUs.

### Links
 * [Official Avalon website](https://www.avalonrpg.net/)
 * [MODEX Pascal library by Mike Chapin](https://lostarchives.org/category/51/file/3760)
 * [Mode X by Matt Pritchard](http://ftp.mpoli.fi/unpacked/software/programm/general/over1400/modex/)


## PaybackTime 2

  Paybacktime 2 is a turn-based tactics game for MS-DOS for up to four human players or AI, heavily inspired by X-COM: Enemy Unknown.  Originally developed during 1994-1997 by Finnish developers Niko Nevatie and Kari Luojus - later released into public domain with source code.

  The code written in Turbo Pascal and Turbo Assembler was shared on github by one of the authors in 2014.  There's no makefile and most of batch files are broken/missing, but the batch file `TP.BAT` sufficiently hints at what needs to be done.  For some reason, I've only been able to compile the assembler files with `TASM` included in Borland C++ v3.1.  No other versions of `TASM` worked for me.  (Installing Borland C++ from 15 floppy disks sure was fun!)

### Links
 * [Official PaybackTime 2 website](http://rflxn.com/paybacktime2)


## WetSpot 2

  {{ macros.youtube("h3pbVftmlqk", "") }}

  This one is special — it's the only game on this list written in Basic!  More precisely QuickBasic 4.5.  It shows some pretty advanced stuff like working around QBasic's 64K limit by breaking the code into several modules, utilizing of EMS, sound & music, etc.

  It's also surprisingly addictive game!  Gameplay seems to be inspired by arcade game Pengo, but with better graphics.  It kinda reminded me of Goof Troop on SNES.  There's also a two-player co-op!

  If you want to compile it, the easiest way to do it is over the QBasic IDE with default quicklibrary included (`QB.EXE /L`), then open the `WETSPOT2.PAS` and create an executable from Run menu.  The `SBMIDI.exe` sound driver comes from the official Sound Blaster installation disk.  By the way, this game was also ported to pure C and SDL, so if you want to play it properly, that is probably the better option.

### Links
 * [Official WetSpot 2 website](http://web.archive.org/web/20000116062559fw_/http://www.geocities.com:80/SiliconValley/Lakes/7303/wetspot2.htm) (web archive)
 * [Original QBasic source code by Angelo Mottola](https://archive.org/details/wetspot2_201808) (web archive)
 * [SDL port](https://github.com/dmitrysmagin/wetspot2)


## Keen Dreams

  {{ macros.youtube("pUTCU9m4gzY", "Keen's lucid dreaming episode") }}

  This game is often called "the lost Keen episode" and it's probably not as good as *Goodbye, Galaxy!*, but it's still Keen!

  The story of how the source code came to light is rather interesting.  Written by iD software, the game was owned by Softdisk until company called Flat Rock Software supposedly acquired the whole Softdisk catalog.  In 2014, there was a crowdfunding campaign to buy the rights and code from Flat Rock and make it public, which was successful.  The source code is now [available on github][keendr_source] under GPL license.

  The code includes the project file for Turbo C++, so we can build the executable through the IDE with no problems.  There are multiple versions of the game floating around and you'll need the exact one that the code expects (1.93).  But despite trying with the correct version, the game crashes on scary looking error `CAL_CacheSprite: Bad shifts number!`.  There seem to be some info on the [Keen Wiki](http://www.shikadi.net/keenwiki/Patch:Sprite_shifts) on that topic, but I don't really feel like delving into that rabbit hole...

  Much more interesting is a project called [omnispeak](https://github.com/sulix/omnispeak), which is a modern open-source re-implementation of *Goodbye, Galaxy!* engine.  And the best part?  It compiles to DOS!

  But not *on* DOS.  The project is using modern compilers MinGW and djgpp to cross-compile the code into a DOS executable.  No idea about MinGW, but compilation using the latest version of djgpp went without a problem. Just run `make PLATFORM=dos` or just `make` for SDL version.

### Links
 * [Keen Dreams source code][keendr_source]
 * [OmniSpeak][keendr_omni]

[keendr_source]: https://github.com/keendreams/keen
[keendr_omni]: https://github.com/sulix/omnispeak


## Abuse

  {{ macros.youtube("l8cYYPpRboo", "") }}

  Abuse is a futuristic run-and-gun platformer released in 1996 for DOS and GNU/Linux.  You move with keyboard and aim and shoot with mouse and explore the gloomy sci-fi environment swarming with aliens.

  The source code was released two years later and the game was ported to multiple platforms since then.  It is written in C++ and used Watcom compiler..  Although the project includes Watcom makefiles, compiling is not as easy as running `wmake`.  I'm not really too familiar with Watcom, but it seems that some linker files are missing.  Also, despite all my trying, I couldn't compile with IPX network support.

  One library called Sound Operating System Version 4.0 from company Human Machine (which boasted to be used in over 150 games) is not included in the code.  At first I thought that it disappeared from the internet altogether, but I've eventually found it in the source code to cancelled [sequel to Corridor 7 game](https://github.com/mmoczkowski/corridor-8).

  I won't list all the steps I had to make to build it, but I made a patch that does everything required to compile (and nothing more).  After applying it, all you have to do is to copy the SOS library into root folder and then run `wmake /f makefile.wat` in `imlib` and `abuse` folders.  You can find the patch [on my Gist](https://gist.github.com/hellricer/0c8e9bb01adaaddc08ac3150d075bb60)

  Note, that there are [multiple versions of the game](https://www.dosgames.com/forum/viewtopic.php?p=125982#p125982).  The source code is for version 2.00.  It also works with fRaBs (Free Abuse) data.

### Links
 * [Original code](https://github.com/videogamepreservation/abuse)
 * [SOS Library](http://web.archive.org/web/19970225190838/http://www.humanmachine.com/dev.htm) (web archive)


## Honorable mentions

  Some classic DOS games that were open-sourced didn't make this list.  For example Tyrian and Tyrian 2000 by Jason Emery.  These awesome vertical shooters were open-sourced, but in a peculiar manner — the author entrusted the original Pascal/ASM code only with a small group of developers, who ported it to C and SDL before releasing it as OpenTyrian source port.  Still obviously worth checking out, but sadly the original sources are not public.

  Another hugely popular game Liero had similar fate.  In this case, the original Pascal source code got lost in a hard-drive crash.  Meanwhile, open source community developed 1-to-1 remake called OpenLiero and later got blessings from the author to use the original name, dropping Open from the name.

  Scavenger is another game that I had a lot of fun with, but which was open-sourced only after conversion to SDL.

### Links
 * [OpenTyrian](https://github.com/opentyrian/opentyrian)
 * [Liero](https://www.liero.be/)
 * [Scavenger](https://www.linuxmotors.com/linux/scavenger/index.html)


  So there it is.  I was really surprised how smooth it actually went, knowing how hard can it be to build a code that's just few years old sometimes.

  Next time, I'd like to take a look at some 3D games and engines that we could try to compile.  Stay tuned!
