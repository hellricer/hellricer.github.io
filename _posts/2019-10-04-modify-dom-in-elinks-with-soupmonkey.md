---
title: Soupmonkey
tags: [tui, terminal, web]
layout: post
---

[In my last blog-post](/2019/05/29/elinks-with-beautifulsoup.html) , I discovered an easy way to manipulate DOM before rendering it in Elinks using BeautifulSoup library.

I called it DevTools for ELinks, but as one reddit user correctly noted, it's conceptually more similar to user-scripts.

That gave me an idea to completely separate rule-files for individual domains in a similar way that Greasemonkey, Tampermonkey and similar user-script managers do.

So, I introduce [soupmonkey!](https://github.com/hellricer/soupmonkey)

The usage is simplified as well - all you have to do is clone the repository into your `~/.elinks/` folder and decorate the `pre_format_html_hook` in the hooks file.  So your `~/.elinks/hooks.py` might look like this:

<hr/>

    import soupmonkey

    @soupmonkey.inject
    def pre_format_html_hook(url, html):
        return html

<hr/>

And that's it!

As of writing this article, there are only scripts for Wikipedia, DuckDuckGo, HackerNews and [nixers.net](https://nixers.net/), but I hope that more will follow.

If you find this interesting and would like to help or just suggest a webpage, feel free to fire-up an issue or PR on github!

**[Note](Note):** The latest elinks package in Debian is missing the Python support.  You might have to build it with python support manually, if that's the case for your distribution as well.
