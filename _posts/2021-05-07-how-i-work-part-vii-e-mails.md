---
title: "How I work, Part VII: E-Mails"
date: 2021-05-07
slug: how-i-work-part-vii-e-mails
excerpt: |
  Today is finally the day I continue my series on "How I work." After a few digressions, I focus on our habit of mailing, not so much because I want to advocate for a specific program, but rather because I would like to advocate against a practice I see well too often. The TL;DR this week is short: Don't use webmailers; except if you have to.
---

Emails are almost as old as the internet. The use of e-mails for asynchronous communication goes back until the 1970s, when there was no public internet yet. The basic idea behind email is simple: Given that we now have computers which are connected, give users the ability to send telegrams without those outdated telegraphic lines. Asynchronous remote communication is much older than synchronous remote communication, such as telephone calls or (much more recently) messenger apps. (Yes, synchronous communication in and of itself is much older than any asynchronous communication since we learned to speak well before learning to write, but that leads too far.)

Email didn’t cause as great of a hype as the first telephone call since a means of sending analogous mails was already well established and the U.S. postal service was fairly good at delivering mails quickly. So the real use for emails only became apparent for the average person’s household once everyone was connected (you all know these great AOL spots, right? If not, [head over here](https://www.youtube.com/watch?v=1npzZu83AfU)). The benefits of email over regular mail are quickly summarised: It works like regular mail, but cuts out the (human) middle man, gets delivered in an instance, and doesn’t require paper. That’s it.

In this article I want to focus on two main points. The first one is to argue against usage of a webmailer. This was the original hook I used for this article, since webmailers are pretty powerless in comparison to dedicated email programs. However, upon researching, I made a much more fatal discovery: Microsoft has done it again; they have broken email. More specifically, Microsoft’s Exchange protocol — called MAPI — is something that only works within the Microsoft-universe. The single non-Microsoft app I found to be able to communicate with Exchange servers is Apple Mail. But more on that later.

If you have been reading the last articles, you might’ve noticed that rarely do I write an article about something fundamental we can do with our computers without giving Microsoft sh\*\*. Part of the reason certainly is that I am personally biased against Microsoft; but as often as I honestly hope that _this time_ I will be proven wrong and Microsoft did something great, I am proven right once again.[^2]

This article is divided into three general sections. First a quick refresher on how email works because I feel it’s necessary to understand _how_ something works in order to be able to make an educated choice over the apps you are using. In the second section, I want to tackle the habit of a great many people to use webmail instead of a dedicated email program before in section three outlining why it may be that you still have to use webmailers.

# How does e-mail work?

In order to drive the point home, it makes sense to visualise how email actually works. As you might’ve guessed, it involves a server and a client (your computer or your smartphone, more specifically the app that you use – whether it’s a dedicated app or a website). Whenever you hit the “send” button of your client, that client will then connect to the e-mail server and execute a series of commands in order to put your message onto the server. Then, _your_ mail-server will itself connect to the mail-server of the target address (for instance, if you send an email from an `@gmail.com` address to an `@aol.com`-address, the Gmail-server will contact the AOL-server) and submit that email. Then, whenever your counterpart opens their email-client, that client will ask their mail-server “Hey, you got mail?” to which the server will then respond “Yes, you got mail.” If your counterpart then clicks on the email, their client will actually download it and display it to them.

## Archaic Protocols: Transmitting Email with SMTP

I promised not to dive too deep into the history of emails, but I would like to introduce you to the commands I mentioned, because I find them ridiculously funny. The mail protocol — I’m talking here about SMTP (“Secure Mail Transfer Protocol”) — is _very_ old; and since it’s fairly reliable it didn’t need any major upgrade since (Microsoft thought otherwise, but that’s upcoming in section three). The inventors of the mail protocol had in mind a structure for their commands that is human-readable. Thus, when your client has connected to the mail server, it will first execute the command `HELO mail@domain.example`. And yes, “HELO” is not any abbreviation, it’s simply “Hello” with just one L (all commands are four letters long). The email is also send in a readable format; first the headers, then these headers need to be separated from the content you’ve written with an empty line, and the email’s text is then ended by a line that contains only a dot. Thus, a complete email would be sent using this SMTP-exchange (I have commented what happens using `#`-lines):

```
HELO address@domain.example
# Server responds: "Yes, I'm ready"
MAIL FROM:<address@domain.example>
# Server confirms; this is only really useful if you have multiple email
# addresses from which you can choose
RCPT TO:<receiver@domain.example>
# Server confirms the receiving address where you want to send the email to
DATA
# To the single "DATA" command the server should respond that you can start to
# send the actual email; first the headers, then the email content.
From: <address@domain.example>
To: <receiver@domain.example>
Subject: This is my email!
Date: Fri, 7 May 2021 09:00:13 +0100

Dear receiver,

this is an email that I would like to send to you.

Best,
Me, myself, and I
.
# Note that the headers are simply <name>: <value>-pairs, and delimited using
# an empty line. Since the email itself can also contain empty lines, the body
# needs to be delimited by a single dot on its own line.
QUIT
# Now the mail server should close the connection
```

As you can see: It looks pretty archaic. By the way, if you send an email attachment as well, this will be sent _inside_ the mail body as a base64-encoded string.[^1] This is why you are always prompted to use external services to share large files instead of attaching them directly to the email — when you encode _anything_ using base64, its size will increase by approximately 30 percent, which is a lot if you think of files in the order of hundreds of megabytes.

## The other protocols: POP3 and IMAP

The SMTP-protocol is only used for _sending_ email between your client and the involved servers; hence it’s sometimes referred to as “outgoing mail.” If you want to _read_ an email, that is, receive “incoming mail,” you need another protocol. There are two available, POP3 and IMAP. Like SMTP, the abbreviations POP3 and IMAP should’ve crossed your line of sight at least once in your life. However, these mentions rarely come with explanations, but it’s absolutely vital to understand the difference.

POP stands for “Post Office Protocol” and is a direct analogy to manual mail: When you want to read an email using POP, imagine your email client going to the post office (the server) and collect the mail. IMAP stands for “Internet Message Access Protocol” and works fairly similar to POP. The major difference, however, is that an email client utilising the Post Office Protocol will _remove the email from the server after downloading it_, while a client using IMAP will not do so.

Back in the early days of the internet, you mostly had exactly one single computer with internet access, and servers didn’t have endless disk space to store all your cat GIFs. Thus, in order to save space, the email was deleted from the server once you downloaded it. However, as soon as people had more than one single computer connected to the internet, this quickly turned out to be a problem. For instance, imagine you receive an email at work, so you view it on your office computer. Then you go home, and you realise that the email mentioned something and now you want to double check. However, since the email was downloaded to your office computer, you can’t look the email up at home, because it’s no longer on the server.

IMAP solves this problem. Instead of downloading everything and removing it from the server, IMAP treats the _server_ as the source of truth.[^3] This means: Everything stays on the server, and the clients give you only an interface to look at the emails. In order to remove an email from the server, you have to manually delete them on your computer. Your email client will then delete it locally, and also instruct the server to delete the email. Thus, if you want to re-read an email on a different computer, you can simply do so, because the email is still on the server. Much more practical!

But why is POP still around, given that IMAP is the more sensible choice? Well, mainly due to backwards compatibility — there’s always _someone_ on the internet who uses outdated stuff.

# Why are there so few mail clients?

At this point you know all the fundamentals we need to actually explain why webmailers are bad and why the obligatory “TL;DR” section of apps to use was missing this time.

First, let’s tackle the question of why there are so few actual email programs out there, since it’s heavily entangled with the question of why many people use webmailers (when there’s no good app, _of course_ using a webmailer is the only choice you’ve got left).

Think about the question where your email comes from. Remember that an email has two parts; first the actual address (everything before the @-sign), and second the domain part where your email address _is at_, that is, everything after the @-sign. That’s the reason why we call it “at”: Because we’re sending a message to “Hendrik” who works _**at**_ “liu.se”.

## Webmail is Ubiquitous

Managing an email-server is an excruciatingly difficult task, which I know from personal experience. Even on the internet, almost _everyone_ agrees that you should not, in fact, set up your own email service. Thus, the first to provide email for people were the same companies that provided people with internet access. This is the reason why you have a lot of `@aol.com`-addresses in the U.S., a lot of `@t-online.de`-addresses in Germany and similarly in all other countries. All that changed when Google started its own freemail service called GMail. Since then, we’ve seen a rise in `@gmail.com`-addresses. Also, most companies provide their employees with their own, dedicated email-address; which is why you can immediately tell where someone works just by looking at the sender’s address.

However, as you might see there is a disconnect between the amount of work necessary to manage a mail server and the fact that everyone can easily get an email address _for free_. The reason is historical: Since all internet providers treat you like sh\*\* and charge you way too much just to browse the web, they need something to keep you hooked. One way is to simply become a monopolist and leave you no choice, the other is to give you something you cannot afford to lose. In Germany for instance, many people have an `@t-online.de` email address, provided by Telekom. If they would decide to switch providers, they’d lose that one because it’s tied to the internet contract. And if you’ve used that email address a fair amount of time, your friends will know it, and if it suddenly stops working, there’s no way of telling everyone. So you’re more likely to stay with Telekom even though their prices are offensive.

But there’s more to it. Since email providers want to give you access to your new shiny email address instantly, they all have a webmailer. An added benefit is that the webmailers – since they’re just websites – can be branded by the providers to look like Google, be painted in the traditional Telekom magenta, or – and here we come to free providers – display advertising. All of that you don’t have if you let users use a dedicated email application.

## Choosing a Dedicated Email Client

All of these reasons culminated in a bad fact: There’s basically only one single dedicated cross-platform email application out there: Thunderbird. In recent years, the email application market did see a surge in new apps, but all of them contain pro-plans and are not open source. And Thunderbird has for a long time not seen any love by the Mozilla foundation who concentrated on keeping their browser competitive against the rising threat of Google Chrome. There is a very good alternative, called Evolution, but that comes with a drawback: It’s only available for Linux. Apparently (I didn’t test it) it even supports Microsoft’s proprietary MAPI thing natively, which is the main reason for the third section of this article below.

So which client should you use? In general, I’d advise the following heuristic:

* If you only have email addresses that employ the “traditional” protocols SMTP and IMAP (almost all do), then use Thunderbird
* If you have a workplace like I do which uses a so-called Microsoft Exchange Server, then …
    * … use Apple Mail on macOS
    * … use Evolution on Linux
    * … use Outlook on Windows, but only for this single email address

## Why Not Outlook?

This time, my aversion against Microsoft is not just because I prefer Open Source to Microsoft stuff, but because Outlook is an email client that does almost everything worse than everyone else. Email is something that builds on the fact that everyone understands it, but Microsoft is so focused on its own internal ecosystem, that they lost track of that. The most prominent example is this: Outlook does some violence to the emails it sends, mainly because it refuses to send emails in plain text. For example, you can tell someone is using Outlook if they have added an `:)`-emoji to the email that displays as a question mark on your side. That question mark will _only_ show up as an Emoji if you use Outlook yourself. That doesn’t happen with any other app – no matter from which client I send them, and even if I use Unicode emojis like 💩.

Furthermore, working productively with Outlook is a hassle. The main reason for that is that Microsoft’s approach to groupware is to facilitate a unified experience for all employees using a Microsoft Exchange server. So Outlook integrates calendar, contacts, events, invitations, a lot of social networking stuff, alongside with email. And that means that the software itself is attempting too much. There’s a nice phrase coming from the Unix-community that basically states that a program should do one thing only, and that one thing it should do good. If you attempt to solve a whole bunch of problems with one single app, that’s doomed to fail, and Microsoft Outlook is one prime example for this.

So unless you can avoid it, use it solely for those email addresses that are being managed by an Exchange server. An added benefit of this is that you are automatically restricted in your mailing behaviour. For instance, I have my work email set up only on my MacBook because I can’t set up an Exchange account on my iPhone, so the only time I’ll be made aware of work-related emails is during my actual working hours when my laptop is switched on.

# Did Microsoft Really Break the Internet Again?

The final question I would like to address in this article is what I mentioned in the beginning: Did Microsoft really break the internet _again_? The answer to this is complicated; it’s both yes and no. On the one hand, Microsoft didn’t mess with the existing mail protocols, so SMTP and IMAP work just fine. However, Microsoft also messed with email in general, because it decided to _wrap_ its own communication layer around the standard protocols, which makes it impossible for “regular” email clients to communicate with an Exchange server. That in itself wouldn’t be a problem – the standard email protocols are pretty simple and can’t do all too much, so you are free to add functionality to it. However, by disabling standard mail protocols by default, Microsoft has restricted access to email addresses managed by their systems to their own software. And that is a problem if you think about the fact that almost all somewhat bigger companies do use Microsoft Exchange. So Microsoft is by means of its own monopoly forcing almost everyone to use Microsoft Outlook if they want to read their work-related emails.

It’s (from a perspective of organisational sociology) a rather interesting effect, since Microsoft seems to be able to leverage the dependency of employees on their employer in order to further their reach into the computers of the employees themselves, and, since many people are then _used_ to using Microsoft Outlook (irrespective of whether they are more or less productive with it) this creates spillover effects to their families and friends and thus adds to a proliferation of Microsoft products. The bad part of that (from a productivity perspective) is simply that people are less and less able to choose an app based on actual productivity metrics, because they have a single app pushed in their face.

Thus, if you have a work email and can’t or won’t use Microsoft Outlook, your choices are quite limited. And that’s when you might want to return to a webmail client – namely Microsoft’s webmail client. It’s certainly not great but better than having a program of about 2 GB in size on your computer that you can effectively use only for one email address. Because yes, Microsoft Outlook alone weights 2GB, while other software is much smaller and thus also quicker.

# Conclusion

If you’re one of the people I mentioned that are only using webmail since it’s so “convenient” think again. Setting up Thunderbird may entail a few more minutes until it can connect to your email server. But after that, _everything_ will be both faster and more secure. And more convenient. Webmails should only serve when you don’t have access to your computer and phone, but still need to look up that one email. Other than that, they’re pretty much useless.

A last point for today: I neither added any screenshots, nor did I provide any detailed instructions, since there are only so many things you can effectively change when working with emails. Emails are emails; they are written in threads, but always sequentially, they’ll always be a list and there’s not that much you can innovate in this realm. Thus, using and setting up an email program should be a no-brainer for you (except all that SMTP and IMAP stuff, but that’s why I explained that above).

That’s all for today; please join me next week when I will be looking at another good productivity boost you should use if you don’t already: Calendars, shared calendars, and the iCal protocol! And I promise Microsoft won’t be an issue there!

[^1]: This is a little bit off-topic, but base64-encoding basically means that you take a binary file (such as a PDF or image) and convert it into plain text. That’s also the reason why the size increases: You must represent each data point using a character that takes more space than the data point itself. I can’t explain this in full detail here, but [if you’re interested, read this](https://developer.mozilla.org/en-US/docs/Glossary/Base64).
[^2]: Please remind me when I finish this series to force myself to write an article outlining all the _good_ stuff Microsoft does. VS Code for example, is a good thing. And that on GitHub we can use the Microsoft Azure server farms for free. Those things should go there. But you know what? I think the pattern here might be that Microsoft does horrible things when it comes to the average user, but great things when it comes to more tech-savvy folks.
[^3]: You might've stumbled upon the notion of "source of truth" once or twice, and I just realised I increasingly use that phrase in my articles without explaining it. In general, the term "source of truth" refers to the fact that in computers you try to collect data in a single place as opposed to storing it scattered around. Imagine (paper-based) files in your office cabinet: If you would collect only _some_ bills in one folder, and _other_ bills in a second one, you have to search both if you want to find a certain file. If you store all your bills in a single, dedicated folder, that is much easier. The same applies to computers, including email: If you store all information in one place – the server – then it's much easier to write the code for an email app, since the programmers know that all info they need is stored on the server, and they don't have to additionally search your computer for an email.