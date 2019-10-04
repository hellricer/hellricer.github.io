---
layout: post
title: Genes in Middle-earth
tags: [tolkien, ea]
reddit: 34e5fh
image:
  feature: genes/head.png
---
{% import 'macros.html' as macros with context %}

*...one script to find them all,
and into GEDCOM bind them...*

Ever since I was a child, Middle-earth was a special place for me.  Out of all the imaginary places invented for the entertainment, *Arda* is arguably the most complex one.  The amount of information that accompanies the stories is overwhelming.  Tolkien is known to be genius linguist - languages of his world evolve in time, fork into dialects and influence each other.  But his sense for geography and history is just as incredible.  There are more than 70 kingdoms with several hundreds of people documented at least to some extent.  Some can be find in family trees printed in appendices of the books, some family relations are only mentioned in stories, but there's lot of them.  So, how about we map them?

I'm obviously not the first one to think of digitalizing Tolkien's genealogies.  [There are](http://www.minastirith.com/cgi-bin/ultimatebb.cgi?ubb=get_topic;f=1;t=000070) some ancient forum threads that dealt with digitalizing the hobbit family trees with [GEDCOM](http://homepages.rootsweb.ancestry.com/~pmcbride/gedcom/55gctoc.htm).  But the GEDCOM files themselves were probably lost in time.

Few years ago Mr. Emil Johansson stirred up the waves when he came up with his amazing [lotrproject.com](http://lotrproject.com).  It's definitely the place to go if you want to get immersed in family trees, maps, statistics and lots of other stuff.  But the thing is that in the end it's "just" a website.  The actual data are stored in mysql database, but as an end-user the HTML "render" is all you got. *(Note: also, there are more than a few factual errors with his tree, which I reported to him.).*

You can do so much more with the GEDCOM!  All the genealogy programs I've seen support import/export to it and even software libraries exist for several languages.  Plus, you can start querying the data for less trivial questions like common ancestors of individuals, distance from the root, etc.

## Crawling people

The data were extracted from the [tolkiengateway.net](http://tolkiengateway.net) which is both most comprehensive & sourced Tolkien wiki out there.  There is an [infobox](http://en.wikipedia.org/wiki/Help:Infobox) for nearly all individuals which consists of structured information about names, birth and death dates, gender and mainly - children & parents. So I whipped out this Groovy script which starts on given individuals and crawls the tree of their descendants [breadth-first](http://en.wikipedia.org/wiki/Breadth-first_search):

<hr>

    package info.childcrawler;

    def queue = new LinkedList<String>(["Marach", "Bëor", "Haldad"])
    while (!queue.isEmpty()) {
        def wikiTitle = queue.remove()

        def infoBox
        if (new File(directory + wikiTitle).exists()) {
            println "Processing ${wikiTitle}"
            // convert the infobox to Map<String, String>
            infoBox = WikiInfoboxParser.getInfoBoxFromFile(new File(directory + wikiTitle))
        } else {
            println "Requesting ${wikiTitle}"
            infoBox = WikiInfoboxParser.getInfoBoxFromWiki(wikiTitle)
            new File(directory + wikiTitle).withWriter { out ->
                infoBox.each { entry ->
                    out.println "${entry.key}=${entry.value}"
                }
            }
            Thread.sleep(20000)  // let's not spam the server
        }
        if (infoBox["spouse"]) {
            def spouses = WikiInfoboxParser.decodeLinks(infoBox["spouse"])
            for (String spouse : spouses) {
                // prevent the loop
                if (!new File(directory + spouse).exists()) {
                    queue.add(spouse)
                }
            }
        }
        if (infoBox["children"]) {
            queue.addAll(WikiInfoboxParser.decodeLinks(infoBox["children"]))
        }
        Thread.sleep(100)
    }

<hr>

Now we just have to find all individuals without a parent to capture the whole thing. (*lotrproject.com* helped a big deal here).

If you miss, someone, you can always re-run it - the script doesn't download already downloaded data again.

The problem here is that the infoboxes, however structured, are still meant for humans so there are some things that need to be considered.  For instance, [Maglor](http://tolkiengateway.net/wiki/Maglor) has Elrond and Elros listed as his children, even though he just fostered them.  Also individuals with multiple families cause problems with this simple approach. To work around it, you'd have to check both parents of all children to find out which family they belong to. Because [Finwë](http://tolkiengateway.net/wiki/Finw%C3%AB) is only guy with two wifes, I resolved this case manually...


## Building the tree

Now that we have the data downloaded, we can start constructing the GEDCOM tree.  I decided to do it in three steps:

 1. put every individual into the tree (without any relations),
 2. for every individual with spouse, create (or update existing spouse's) family + check for non-existing parents & siblings,
 3. for every individual with children, create (or update existing) family.

This means that I have to go through all individuals three times, but the fact I don't have to travel individuals in any special order makes building the tree so much easier than building it from the top or the bottom.  The second step informs me if the crawling script missed someone (which is useful for finding the individuals I overlooked).


## Playing with our toy

Alright, we have the complete tree so now we can start to play!  The reason I used Groovy for this project is the Java library
[gedcom4j](http://gedcom4j.org/main/) which is IMHO the most mature GEDCOM implementation.  It's mainly the parser
and builder, but it also features some tool classes - like the AncestorCalculator.  This snippet finds all “spouses”
that have a common ancestor and displays the number of generations between them:

<hr>

    def gp = new GedcomParser()
    def ac = new AncestryCalculator()
    gp.load("/arda.ged")
    def g = gp.gedcom

    for (Family f : g.families.values()) {
        if (f.husband != null && f.wife != null) {
            Set<Individual> common = ac.getLowestCommonAncestors(f.husband, f.wife)

            if (!common.isEmpty()) {
                def anc = common[0]
                println "${f.husband.names[0].basic} and ${f.wife.names[0].basic} have a common ancestor: ${anc.names[0].basic}"
                println "\t Generations from husband: " + ac.getGenerationCount(f.husband, anc)
                println "\t Generations from wife: " + ac.getGenerationCount(f.wife, anc)
                println ""
            }
        }
    }

<hr>

The lowest score win the infamous cases of [Túrin](http://tolkiengateway.net/wiki/Túrin) &
[Nienor](http://tolkiengateway.net/wiki/Nienor) and [Ar-Pharazôn](http://tolkiengateway.net/wiki/Ar-Pharazôn)
& [Tar-Míriel](http://tolkiengateway.net/wiki/Tar-Míriel), but there are many others.

Perhaps the most interesting is the case of [Aragorn](http://tolkiengateway.net/wiki/Aragorn) and [Arwen](http://tolkiengateway.net/wiki/Arwen) which shows that while
their common is ancestor is a grandfather or Arwen, there are 56 generations between him and Aragorn:

{{ macros.figure("/assets/images/genes/aragorn-arwen.png", "Relation between Aragorn and Arwen (created with GenealogicaGraphica)") }}

The importance of find cases of mixing blood starts to be obvious once we notice that they meant a lot to Tolkien.  Already mentioned Túrin and his cousin Tuor were two of the greatest heroes of the ancient times and it's not a coincidence that their births were the fusion of all three [Houses of Edain](http://tolkiengateway.net/wiki/Edain#The_Three_Houses):

{{ macros.figure("/assets/images/genes/turin-tuor.png", "Badass-ness visualised") }}

Tuor's son Eärendil further improved on this by adding elvish (and even [Ainur](http://tolkiengateway.net/wiki/Melian)) blood into the man's bloodline for the first time.
It's sad that we don't hear more about Aragorn's son Eldarion, because he gained eldar blood from yet another house - House of Finarfin through Arwen's grandma Galadriel.

Some free programs that support GEDCOM are [Genj](http://sourceforge.net/projects/genj/), [Gramps](http://gramps-project.org/) & [Ancestris](http://www.ancestris.org/).
Apart from that there are some PHP-based viewers, tools for creating trees in Wikimedia markup, etc.
There's lot to play with, so [get the data](http://github.com/RobSis/middle-earth-genealogy-project) and happy hacking!
