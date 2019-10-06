---
title: Test-drive your terminal
tags: [terminal, tui]
layout: post
reddit: ddqeip
---

{% import 'macros.html' as macros with context %}

Along with shell, terminal emulator is for many the most important part of operating system.  It's where you spend most of your time!

There are tones of them to choose from.  Some prefer them as leightweight as possible, others like them to handle things like tabs, splits, etc.

But how does your terminal perform at actually displaying stuff?  I wrote this shell script to test how various terminals handle colors, extended text decorations and few other things.

<div>
  <script src="https://gist.github.com/hellricer/e514d9615d02838244d8de74d0ab18b3.js"></script>
</div>

Here's how decorations look in `gnome-terminal`:

{{ macros.figure("/assets/images/terminal-decorations.jpg", "gnome-terminal getting it almost right.") }}

## Results

|            | double underline | curly underline | overline | color underline | bitmap emoji | right-to-left
| ---------- |:----------------:|:---------------:|:--------:|:---------------:|:------------:|:-------------:
| alacritty  | ✗                | ✗               | ✗        | ✗               | ✗            | ✗
| mlterm     | ✓                | ✗               | ✓        | ✗               | ✗            | ✓
| kitty      | ✓                | ✓               | ✗        | ✓               | ✓            | ✓
| gnome-terminal | ✓                | ✓               | ✓        | ✓               | ✓            | ✗

From what I tried, `gnome-terminal` and `kitty` check all but one feature and there's actually none that can do it all.

`mlterm` came as a bit of surprise with double underline and overline support.  It also displays RTL text actually on the right side of the terminal.  It's also interesting that it supports sixel graphics out-of-the-box.

How does your terminal compare?

**Disclaimer:** Although I love working with terminals, I do not claim to be a expert on the subject. Nor do I suggest that every terminal *should* be able to display these things.

## References

 * [https://gist.github.com/XVilka/8346728](https://gist.github.com/XVilka/8346728)
 * [https://sw.kovidgoyal.net/kitty/protocol-extensions.html](https://sw.kovidgoyal.net/kitty/protocol-extensions.html)
 * [https://lwn.net/Articles/749992/](https://lwn.net/Articles/749992/)
