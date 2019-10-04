---
title: ELinks with BeautifulSoup
tags: [tui, terminal, web]
layout: post
reddit: bucyx6
---
{% import 'macros.html' as macros with context %}

For many terminal dwellers like me, browsing the web is one of the last few scenarios where we have to leave our cozy terminals into the harsh cold GUI world. Complexity of today's websites simply won't cut it without graphics, preferably with high screen resolution.

That's not to say that it's not worth to experiment with terminal-based browsers, though! Most people probably know about `w3m` for its ability to display actual images and `lynx` as the oldest one. But in this post, I'd like to talk about [ELinks](http://elinks.cz/).

It's arguably most feature-packed (read “bloated”) and also most user-friendly of the three. It supports tabs, multiple downloads, bookmarks, it has rudimentary support for CSS and even JavaScript. And, after some tweaking, it can actually look pretty good!

{{ macros.figure("/assets/images/elinks-ddg.png", "DuckDuckGo keeps text-browsers in mind.") }}

But the feature that really makes it for me is the ability to extend it via so-called hooks written in Lua, Ruby, Perl or Python. Hooks are functions that are called automatically by ELinks in appropriate circumstances. Like after following the link, entering URL in the Open dialog or before rendering the HTML. You can also bind keys and create custom menus.

I'm most familiar with python, so I tried to play with it a little.

***Note:** ELinks in my Debian was missing the Python support. You might have to compile it from the source, if that's the case for your distribution as well.

# DevTools for ELinks

There's no denying that most pages look terribly broken in ELinks. Sometimes though, removing or changing few elements does wonders!

Luckilly, there's an amazing python library called [`BeautifulSoup`](https://www.crummy.com/software/BeautifulSoup/bs4/doc/genindex.html) which makes this stuff really easy.

Still, I'd like to be able to add new rules as effortlessly as possible, so I created little “framework” for that. It consists of two python scripts `hooks.py` and `devtools.py`, which you place into your `~/.elinks` directory.

Now all the rules can be easily defined in `~/.elinks/rules.py` like this:

<hr>

    # -*- coding: utf-8 -*-

    def remove(e, soup):
        e.decompose()

    def add_border(e, soup):
        e['border'] = 1
        e['frame'] = 'box'

    # hackernews indents with stretched image,
    # so we replace it with table cell with colspan
    def add_padding(e, soup):
        level = int(e['width']) / 40
        td = soup.new_tag('td')
        td['colspan'] = level
        e.parent.insert(0, td)

    modify = {
        'news.ycombinator.com' : [
            # pattern is CSS selector
            ('table.itemlist, table.comment-tree', add_border),
            ('table.comment-tree > tr td img', add_padding),
            ('img[src="y18.gif"]', remove),
        ],

        '…' : [
            # you can also use lambdas:
            ('div.something', lambda e, soup: e.decompose()),
        ]
    }

    # regex substitutions
    replace = {
        '…' : [
            ('<table border="0"', '<table border="1"'),
        ]
    }

<hr>

Here's comparison of before and after:

{{ macros.figure("/assets/images/elinks-beforeafter.png", "Table borders make everything look better.") }}

You can find the scripts [on my Gist.](https://gist.github.com/hellricer/5a5eabc2fc0a4e58c7b0833abe283fce)
