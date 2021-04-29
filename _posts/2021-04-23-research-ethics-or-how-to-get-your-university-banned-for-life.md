---
title: "Research Ethics, or: How to get your University banned for Life"
date: 2021-04-22
draft: false
slug: research-ethics-or-how-to-get-your-university-banned-for-life
excerpt: |
  This week, I’m breaking the streak of my “How I Work” series, since something has come up that bugs me quite a lot. On Wednesday one of the maintainers of the Linux Kernel, Greg Kroah-Hartman, dropped a tweet that might seem like everyday banter. Upon closer look, however, it is all but normal business: It shows such a blatant violation of research ethics that I have to comment on that.
---

Doing research involves many hassles. From the pure necessity of having to binge-read like some people binge-watch Netflix to buggy code or errors in your research methods, there are many roadblocks. And if you’re not just doing research using inanimate objects like I do, but actually _talk_ to people or conduct experiments on people, another roadblock that gets added is that of a university’s ethics board, IRB for short.

Such an ethics board consists of a bunch of people whom you must ask for permission if you are to conduct research involving humans, animals, or where anything could affect other people. Personally, I have never had to deal with an ethics board, since I never performed any research that might’ve had any influence on other people whatsoever. However, there’s a large array of potential directions of inquiry which do have an impact on people, so for these you need to consult your ethics board. As an example, if you are to mine large parts of Twitter data, that might involve ethical concerns, especially if you’re including any personal data in your results (so for simple questions such as “Let’s count the number of hashtags by tweet” that might not apply).

As you can already see with that Twitter example: Which tasks involve ethical questions is not necessarily easy to judge. There’s no handy list of ethically questionable tasks for you to skim to see if your research topic requires approval of your university’s ethics board. However, if in doubt, as always: Just _ask_. There’s no shame in asking your supervisors or the ethics board directly whether or not your task is cool from an ethical perspective. It’s always much easier for them to write “No problems, go ahead” than you being sued by your university because you forgot to ask and now everyone is asking “Why did they not _stop_ this guy from crashing that plane full of people to see how pilots would react if he replaced the plane’s operating system with MS-DOS?!”

You might laugh about that last example, but indeed it’s much closer to what happened than you might think right now.

## The incident: “I just wanted to write a paper …”

So what happened? Apparently some time last year, a user submitted three patches to the Linux kernel project. These ostensibly fixed some minor bugs, so all good. However, the intention of that user was to not just fix some bugs, but also introduce a so-called use-after-free (UAF) vulnerability in each patch. It doesn’t really matter what a UAF is, the important part is that it’s [a vulnerability of the type being used by malicious actors to attack computers](https://encyclopedia.kaspersky.com/glossary/use-after-free/). Luckily in this case, the user was a researcher from the University of Minnesota and had no malicious intentions after all. All they wanted to do was test whether such patches had any chance of getting into the actual Linux Kernel. As they write themselves ([link to paper](https://github.com/QiushiWu/qiushiwu.github.io/blob/e2e67710986f3741b0e47e9353f59337d266374c/papers/OpenSourceInsecurity.pdf)):

> Our goal is not to introduce vulnerabilities to harm OSS. Therefore, we safely conduct the experiment to make sure that the introduced UAF bugs will not be merged into the actual Linux code.

Great, so just an experiment to see whether that could work at all.

Furthermore, said researcher _did_ do their homework and actually asked the university’s research ethics board:

> This experiment studies issues with the patching process instead of individual behaviors, and we do not collect any personal information. We send the emails to the Linux community and seek their feedback. The experiment is not to blame any maintainers but to reveal issues in the process. The IRB of University of Minnesota reviewed the procedures of the experiment and determined that this is not human research. We obtained a formal IRB-exempt letter.

So, all good: Ethical questions sorted, so let’s go. The researcher conducted their experiment and later wrote a paper that has also gotten accepted at the IEEE Symposium on Privacy and Security. Hooray! That’s a good day for any PhD student: Write a paper and get this accepted to a conference the same year.

Unfortunately, that’s not where this story ends.

## The Next Experiment

After their initial experiment, the research apparently now tried a new experiment. Now the issue was that, apparently – I can only cite from the mail conversation –, the researcher has written a static analyser and submitted some patches generated by that one to the Linux community. However, as anyone with a little experience in computing will tell you, generated code is rarely good. And this time, the maintainers felt it was enough. It may be fine to conduct an experiment on people without their consent, but it is certainly not fine to then misuse the same process to just perform some trial & error with something. As the researcher writes themselves:

> These patches were sent as part of a new static analyzer that I wrote and it's sensitivity is obviously not great. I sent patches on the hopes to get feedback.

To me, also a maintainer of Open Source Software, this reads as following: “Hey, I am currently experimenting with something, could you tell me if what my experiment is doing looks cool?” – The problem with that is not that you shouldn’t experiment, to the contrary. But, and that’s a big but: Many Open Source projects are _production projects_, meaning they are already in use around the world, and hence they must focus on stability, productivity, and efficiency.

Furthermore, the maintainers of these OSS projects do this job in their spare time, since the “Open” in OSS also refers to “free of charge.” Ergo: Developing Open Source is something where a person deliberately says “Okay, instead of focusing on hobbies that nobody but me benefits from, I will make something that a lot of people can use.” So by asking these people to help you with your experiment is basically asking them to work for free for you. This can be certainly fine, and I’m doing this sometimes myself. But I demand that people are transparent about this and just ask me.

As a positive example for this kind of work: I have a few groups of students from the University of Adelaide contributing code to the Zettlr repository at this very moment. They’re doing it as part of a university course, so it is similar to conducting an experiment where the actual use may be less than anticipated. However, I invited these students and I am helping them in getting to know the Open Source world. Why? Because their instructor sent me an email beforehand notifying me of that so I knew what was coming. _That_ is how you communicate.

However, getting back to our incident: Said researcher obviously did not ask up front, but just sent these e-mails. And, as is visible in the response sent by Kroah-Hartman, he was _not_ amused by that. And, don’t forget: The same researcher already knowingly submitted patches that were harmful. So what do you make of this? Well, Kroah-Hartman is very clear about what to do.

## The Aftermath

In the [e-mail exchange](https://lore.kernel.org/linux-nfs/YH%2FfM%2FTsbmcZzwnX@kroah.com/), which I recommend you read, Kroah-Hartman is certainly pissed:

> So what am I supposed to think here, other than that you and your group are continuing to experiment on the kernel community developers by sending such nonsense patches? When submitting patches created by a tool, everyone who does so submits them with wording like "found by tool XXX, we are not sure if this is correct or not, please advise." which is NOT what you did here at all. You were not asking for help, you were claiming that these were legitimate fixes, which you KNEW to be incorrect.

As you can see: Even the tightly organised Linux Kernel maintainer group does not completely reject experiments, but it requires that people be honest about it. Apparently, though, our researcher in question did not do so. Kroah-Hartman continues to express his anger and finishes with the words “you are not welcome here.” – which is quite a harsh statement.

But there’s even more: He states that from now on, not just that researcher but _their whole university_ is prohibited from submitting any contributions _at all_. And that’s pretty understandable. Furthermore, he even goes one step further and wants to completely purge even the good patches the researcher contributed in their first experiment.

Additionally, the University of Minnesota removed a press release from their website (link found via Google, which now leads to a 404: https://cse.umn.edu/cs/news/paper-accepted-ieee-symposium-security-and-privacy-2021) where they announced that said paper has been accepted to the IEEE symposium. And while [the early rejections for that conference went out just yesterday](https://www.ieee-security.org/TC/SP2021/cfpapers.html), I’m pretty sure that _that_ paper did receive such a rejection.

What happens to the researcher remains to be seen, but it would not surprise me if there were additional actions taken by the university. The university, [according to this news article](https://www.neowin.net/news/linux-bans-university-of-minnesota-for-sending-buggy-patches-in-the-name-of-research/), has already begun an investigation and the Computer Science department [issued a press release](https://twitter.com/UMNComputerSci/status/1384948683821694976) that doesn’t sound happy.

As John Levi Martin writes in his _Thinking Through Methods_  (p. 160 f):

> Even if your research is unfunded, even if it is not your dissertation research, if you do social research while you are affiliated with your university and you do not have IRB approval, you can have your PhD turned down.

## Lessons (that should be) Learned

So where does this whole mess leave us? First, you can see that even if your ethics board approved of what you did, the people affected might not. Secondly, if you don’t think through the consequences of your actions as a researcher, you might have a very hard landing. And lastly, we might want to think about how to prevent such a cataclysm. Let’s start with the ethics board.

The ethics board (IRB) of the University of Minnesota apparently waived any concerns over the research, but with a somewhat curious conclusion. According to the paper itself, the board “determined that this is not human research.” As a sociologist, however, I am puzzled by this decision. The task was to see “Can spurious commits get through maintainer review?” and the author claimed that they wanted to check the “procedure.”

But what if not human decisions forms such a review process? In the end, every piece of code has to be accepted by a _human_, and since the Linux kernel project accepts patches only via e-mail, the first one to look at any patch is not some automated toolchain checking for, e.g., code style or some obvious things first, but a human being. So, yes: This was research conducted on human beings. This was not an experiment on inanimate things, but on humans. And said humans were not fond of this. So the IRB of the University of Minnesota should’ve never given green light to that experiment in the first place.

And let us, just for a moment, assume the research ethics board did see that as an experiment involving humans and still gave it green light. Even then, the human beings must be treated with respect. Lying to humans is never a good idea. (For more on this, I recommend, again, John Levi Martin’s _Thinking Through Methods_, this time chapter 6: Ethics in Research.) One badly conducted study can foreclose a whole bunch of potential subjects — I’m pretty sure that other important Open Source Projects will now have that researcher on some form of a blacklist.

Now, the second point concerns the consequences of your actions. If you analyse text produced by human beings and then state, for example, the way a million tweets form a certain type of network and analyse this, there might be hardly any real-world consequences of this research. But if you send malicious patches to the Linux kernel project, the real-world consequences could be nothing short of global cataclysm. I’ve left out one sentence from the quote above. Here’s the full quote:

> Our goal is not to introduce vulnerabilities to harm OSS. Therefore, we safely conduct the experiment to make sure that the introduced UAF bugs will not be merged into the actual Linux code. In addition to the minor patches that introduce UAF conditions, we also prepare the correct patches for fixing the minor issues. We send the minor patches to the Linux community through email to seek their feedback. Fortunately, there is a time window between the confirmation of a patch and the merging of the patch. Once a maintainer confirmed our patches, e.g., an email reply indicating “looks good”, we immediately notify the maintainers of the introduced UAF and request them to not go ahead to apply the patch. At the same time, we point out the correct fixing of the bug and provide our correct patch. In all the three cases, maintainers explicitly acknowledged and confirmed to not move forward with the incorrect patches.

Think about that sentence: “Fortunately, there is a time window between the confirmation of a patch and the merging of the patch.” And now think about the volatility of that statement. Think _just for one second_, that a maintainer has looked at such a malicious patch, deemed it good, _and merged it without further communication_. What would happen then?

Well, first, there would be a new version of the Linux kernel released. Then this one would be shipped to all computers that run on the Linux kernel. And then, malicious actors could sift through the code, find those vulnerable patches, and begin attacking computers. “Yeah, bad, but surely not _that_ bad, right?” Wrong.

Just imagine that almost every server on the planet runs Linux, and every Android phone. Then you already have a critical mass. Just imagine there’s one vulnerability that affects _almost all of the world’s servers_ — the worst that could happen is not that some evildoers gain access to some database. No, the worst that could happen – especially in the kernel, the _core_ of any computer – would be that the internet could literally be obliterated. Shut down. Removed from the world. Going down. Destroyed. Vanished. Tabula Rasa. Name it as you like, but if any of these patches would’ve made it into the Linux kernel and a few additional mishaps happened along the line, we could write in our history books that one single researcher annihilated _the_ internet.

That this didn’t happen is due to sheer luck. Granted, the possibility of these patches actually making it into the Linux kernel weren’t great, but they weren’t minuscule either. All that the researcher relied upon was that the process would give them some (undefined) time window to prevent the cataclysm. And that’s just not good enough for research.

So how do you prevent such a big mistake in the first place? Honestly, I don’t know. Something can always go awry. And I’ve never had to deal with an IRB. All I know is that the best recipe against such things is: communication. If you constantly inform your supervisor of your plans, of what you intend to do, and keep a conversation with your peers going, then those problems will be noticed earlier. That’s one of the basic foundations of research: peer review. And if that _still_ doesn’t prevent cataclysm, at least you will know that you tried everything in your power and did your homework to prevent it, so it’s just bad luck.

***

**Addendum — Friday, 23 Apr 2021**

Apparently the researchers themselves have [already uploaded an FAQ regarding their conduct](https://www-users.cs.umn.edu/~kjlu/papers/clarifications-hc.pdf) and explained both their motivations and why they thought it was a good idea. Two things stick out: First, if you have to clarify a paper in almost as many pages as the initial paper, that’s not a defence, that’s an admission that you realised there was something wrong. They claim that they have a good portion of experience with contributing patches to the Linux kernel - however, that still doesn’t give you a waiver for conducting experiments on people, especially on people who trust you. There’s a thin line between pulling someone’s leg and later on saying “No, no, I was just teasing you!” and introducing harmful bugs and later on saying “No, no, we didn’t intend any harm!” If I were to do something of similar gravity even on my best friends, they would immediately put me out an airlock, figuratively speaking, and rightfully so. It’s just mean behaviour.

The second thing that sticks out is that they did not see their work as a human experiment and thus it raises the question if the “exempt” from the IRB was actually just that: They told the IRB that they were conducting an experiment, but “actually not on human beings” so that the IRB would give them an exempt. That leaves me with two possible conclusions: Either they were fully aware that their experiment is actually on human beings and they wanted what we in Germany would call a “Persilschein” to proceed with official cover, _or_ they negligently didn’t give the full details of their experiment to the IRB, so that the IRB’s judgement was fully valid – based on incomplete information. Either way, it’s still looking bad.
