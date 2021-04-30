---
title: "Goodbye, October"
date: 2021-04-30
slug: goodbye-october
excerpt: |
  For the better part of the last decade, I built all my websites using October CMS. However, due to a change in their policy, that won't work anymore. So I need to migrate all my pages to a new system. After some fiddling around, I settled with Jekyll. In this post I just want to quickly summarise the why, the how, and the next steps.
---

If you wanted to “be” on the internet around 1995, it was both easy and difficult at the same time. Easy because writing a website was possible using Open Source tools even back then, and since HTML and CSS were much less powerful, it didn’t took ages until you got something nice (compared to those standards). However, it was also difficult because the knowledge of how to take that HTML and put it somewhere where other people could _find_ it was not widely known (but maybe that’s just my impression since I was, like, 5 or 6 years old back then).

## CMS and October

When HTML became more complicated and more people wanted to put their faces out there – that is, when the trend began that people wanted to have their own personal website – they didn’t want to spend too much time writing code and just wanted to blog. So people who knew how to write code came up with solutions for those who didn’t: Content Management Systems, CMS. The first really popular was possibly MySpace. But soon thereafter, stuff like Tumblr and Wordpress gained traction and that’s more or less where we still are today.

Content Management Systems are legion on the internet; counting just the ones I remember from the top of my head, I get to 10. However, depending on what you need a lot of these systems fall out of the equation quickly. If you don’t have a big e-commerce page or some large corporate website, you probably wont need Drupal or Typo3. And if you’re not from Germany you probably never heard of smaller niche-systems such as Contao. Furthermore, if you would like to keep your site lightweight and/or modify the theme, Wordpress is not an option since theming this CMS is quite the task.

After years of fiddling around; even writing my own solutions, I finally settled with one called October CMS. October CMS ticks all the boxes: It’s a system where I can quickly change this or that HTML code so that my website does something it didn’t do previously. Or change some variable in the styling, so that the font looks a tad nicer. But I also don’t want to write my blogposts in literal HTML. And then the images! October CMS was the nice middle ground between customisability and ease of use. In fact, I used October CMS so much that I even wrote two plugins, [one of which got relatively popular](https://github.com/nathanlesage/oc-campaignr).

But all that changed a few days ago. At first, I stumbled upon a message in one of the updates of the system that said it was “the last patch for October 1.0”. At first I thought “Oh, cool, a big update?! Let’s have a look.” However, I was already suspicious that there was an update coming and I didn’t hear anything about that. And then, I stumbled upon [this blogpost](https://octobercms.com/blog/post/october-cms-moves-become-paid-platform). “October CMS moves to become a paid platform.” Are you f\*\*\*ing kidding me?!

## Why Open Source Matters

If you know me just a little bit, you know that I’m a fervent defender of Open Source software. I cannot really trust closed source, and let’s be really honest: Most paid software is not worth the price. Or do you think that last mobile game really was innovative enough to justify the three Euros you paid to get it? Right? I thought so. The thing is, companies have become quite versatile at pulling out money from employee’s wallets. Many have already switched to subscription services, that is: You pay more for Adobe per month than for the internet access required to run the software in the first place, so it’s out of the question for anyone who just wants to learn it. It’s similar with other software.

And right now, at this very moment, there is a large gap between completely free of charge Open Source software whose code is publicly visible, and some atrociously expensive proprietary software that literally drains the money out of your bank account. But I digress. If you want to know more about my stance on Software and why I think closed source software is bad for your health, have a seat and [watch a video I made](https://www.youtube.com/watch?v=A7N4NJWtq-s) about this.

Long story short: I cannot host my websites and projects on closed source services, because that means that I will vanish from the internet once I cannot pay for the service anymore. Any paid solution requires I never run out of a job and/or money, and I won’t risk that[^1] — in today’s world and in my position I can’t afford to not be on the internet. So I had to switch.

## Going Headless

But the internet 2021 is a different one than it was in 2010: CMS systems are on the retreat. Wordpress won’t get any better no matter how hard their devs might try, Drupal and Typo3 are still too big for most projects, and now that one of the few good alternatives hides their source code from me, I feel a little bit like standing in the rain. In fact, the internet has become so corporate that it’s almost impossible to find anything “click and write” that doesn’t try to rob you.

So I had to change my mindset. And, funny enough, the internet seems to move back into a direction it came from in 1995. Today, the best shot you got at highly customisable, highly available, and scalable homepages is to not use a CMS system, but to divide these tasks up again; between what is called a “headless CMS” that hosts your _data_, and a static site that hosts your _frontend_. I won’t go into the distinction between frontend and backend here, but suffice to say that this blog now runs on what is called a static site generator, more specifically, on [Jekyll](https://jekyllrb.com).

A static site generator functions as follows: You have some source code for a website, code that includes your HTML, some CSS to style the page, and content, mostly using Markdown. The static site generator is a small program that takes all of this, processes it and outputs a folder on your computer that contains static HTML pages. These you can then upload somewhere, just like in 1995 and you have a website.

## Conclusion

I don’t have too much time today to dive into what this all means, and why – viewed from a certain angle – this is even better than CMS systems, but it does have many benefits. Let me close today’s post with a few comments on what has changed, and where you might need to adapt something on your site:

* Most information should still be exactly where it was previously. However, the blogposts now require an `.html` appended to the URL. I’m trying to fix that over the weekend, but for now that’s how I got it to work
* I took the liberty of exchanging the main font. While I do like Crimson (the previous font), I always felt it was a little big “fat.” While migrating my page to Jekyll, I stumbled upon the page from [Yehuda Katz](https://yehudakatz.com), and I really like the font he uses, Cardo
* A few other CSS improvements here and there have also happened, since it’s much easier editing CSS files using VS Code than in some online editor.
* The feed is now reachable at a different location. It’s now https://www.hendrik-erz.de/feed.xml, not https://www.hendrik-erz.de/blog/feed.rss (the latter link now redirects, but I found that RSS readers don’t recognise HTML redirect requests, so you might want to exchange that one).

So much for this week; I hope I can finally continue my How I Work series next week. See you then!

[^1]: To be fair: _Of course_ it costs money to put your face out on the internet. However, there is a large difference in paying $10 _per website_ you want to make, and the $15 per month I pay for all my websites in total since that is how much my webserver costs.