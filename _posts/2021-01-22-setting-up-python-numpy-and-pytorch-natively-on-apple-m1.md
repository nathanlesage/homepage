---
title: Setting up Python, numpy, and PyTorch natively on Apple M1
date: 2021-01-22
slug: setting-up-python-numpy-and-pytorch-natively-on-apple-m1
excerpt: |
  The new Apple M1 devices have received quite the attention in the past months. Users have consistently reported enormous speeds, extensive battery life and have praised all the bells and whistles of the new devices. However, data scientists and engineers have been wary of upgrading too soon, and in my opinion rightfully so. However, it is possible to run a development setup natively on the ARM-architecture. In this post, I describe how.
---

So a few days ago I finally got my MacBook Pro sporting one of the new ARM-architecture chips. (I tend to not use the marketable names “M1” or “Apple Silicon” as they tend to overshadow the fact that the ARM architecture is almost as old as the Intel architecture which ARM has replaced in the new MacBooks.)

My decision to buy this one was considerably determined by my old MacBook (2017), which both has a keyboard that drives me crazy, and a battery that does no longer deserve that name. I’ve read on the ups and downs of the new chips extensively, and knew I would run into some trouble when initially setting up everything I am used to. For instance, VS Code stable right now is not released for the ARM architecture, so I had to momentarily switch to the “Insiders” edition (a.k.a. the beta releases) of VS Code.

But now I am taking a course on Natural Language Processing, and that is heavily engineering driven, including `numpy`, `sciPy` and `PyTorch`. And that’s where the mess started. Following the general vibe on the internet, running any data science related, Python based task is “simply impossible right now.” However, with a fair amount of googling, I managed to replicate [my setup I initially described here](https://www.hendrik-erz.de/post/data-analysis-python-vs-code-and-jupyter). So this post is all about doing the same stuff, only on the ARM chips.

> Note: I found a lot of [blogposts such as this one](https://alexslobodnik.medium.com/apple-m1-python-pandas-and-homebrew-20f14828ccc7). Many recommend you simply install the Intel-based packages for everything. However, I **do not recommend this approach**, both because you’ll definitely forget that your terminal will automatically install Intel stuff instead of ARM, and because this _will_ lead to inconsistencies. So don’t. Do that.

## First Things First: VS Code on Apple M1

The first thing that has to change at the moment when you want to run the VS Code+Jupyter+Python-stack on the new MacBooks is that you have to download the Insiders edition of VSCode. These things come with a different colour (a form of blue-green) and an ugly long application name. (For instance, to open a folder in VS Code you cannot type `code .` but have to use `code-insiders .`.)

As soon as the regular VS Code downloads for ARM-based MacBooks appear, you can dump this one again and install the regular one instead. I do recommend running the native VS Code because of [this blog post](https://www.electronjs.org/blog/apple-silicon) and because I do not know what would happen to Python or any other environment if the hosting application runs via [Rosetta 2](https://en.wikipedia.org/wiki/Rosetta_(software)) (the 64 bit-to-arm-translator).

See it from the bright side: You get almost daily updates and for a short time you’ll have a different icon on your dock ¯\\\_(ツ)\_/¯ .

## Getting Homebrew right

Homebrew is another rather easy thing. We don’t even need to do any weird stuff, but can actually just install it as necessary. [This Pull Request](https://github.com/Homebrew/install/pull/373) is ready since a month now and makes sure you can just install Homebrew as if you were on an Intel-computer. Note that (if you even care) the new official install directory is now `/opt/homebrew`, and no longer `/usr/local` (the latter one is the directory on Intel-based Macs). I’m just mentioning this because apparently some people installed the ARM-version of Homebrew into `/usr/local`.

## Wrangling the Python

Now to the two ugly parts: Getting Python right, and getting the data science libraries right. First, I installed Python regularly using `brew install python`. This works fairly easy, because Python works natively on macOS. However, this might not be what you want.

A lot of packages (such as `numpy`, and, by extension `pandas`) don’t work on ARM right now. So we have to use another way: `conda-forge`. _What?_ Let me explain.

> In case you’re interested, the explanation is indented here. If you just want it to work, scroll down to the first non-indented text.
>
> So, the main problem for anything relating to macOS on ARM chips right now is that everything that should run natively has to be compiled for the correct architecture (basically, if you have a `if (something == true)` expression in C++, this needs to be translated into machine instructions, which differ between Intel and ARM).
>
> But there are two major impediments to that. First, most important applications have dependencies which therefore _also_ need to be available on ARM (and which aren’t available on ARM right now, as you guessed). Second, ARM on macOS is still pretty new, so the developers couldn’t migrate everything yet.
>
> If you google a little bit for why, for example, `numpy` doesn’t work on ARM64, you will at a certain point realise that some parts of `numpy` have actually been written in [Fortran](https://en.wikipedia.org/wiki/Fortran). So, and the Fortran compiler currently does not compile for ARM 64 (confusing, I know). The same holds true for `pandas`, which will itself build an internal version of `numpy`, because it depends on this. And then you have the machine learning libraries. These are a different kind of evil we’ll be looking into further below.

Instead of installing Python using `brew install python`, what you rather want is to run `brew install miniforge`. [Miniforge](https://github.com/conda-forge/miniforge) is a somewhat obscure fork of a fork of a fork. If I understand it correctly, Miniforge is a fork of `conda-forge`, which is a fork of `conda`, which is the package manager for the Python distribution Anaconda. So `conda` is basically a competitor to `pip`, but `conda` also uses `pip` under the hood and by now I have no idea what the hell is up with the whole Python environment. _What?_ Exactly.

The main takeaway for me, and possibly for you as well, should be the following:

**`conda-forge`, which is used by Miniforge, ships with patched versions of all those compilers that we need for correct, native ARM-builds of `numpy`, `pandas`, and other libraries that depend on native code.**

So instead of understanding what is going on, I just ran the command. So. Now you have Miniforge installed. Cool, right? So what we now need to observe is the following:

- Conda uses environments (just like `pip`, but not quite)
- You have to activate your desired environment _before_ running any `conda`-commands (e.g. `conda activate <name>`)
- Instead of running `python -m pip install` we now run `conda install`
- Sometimes we still have to run `pip install`, for instance later for PyTorch.

If you now want to slap someone in the face, you have my absolute compassion. But, shall we continue?

## Lightening the Torch

You might have realised that we did not yet install any packages relating to data science. _But why?_ Because we need to do some more preparation for that. Bear with me.

First, we now need to set up a new environment that explicitly uses Python 3.8. This is because PyTorch (and, apparently, also TensorFlow) require Python 3.8, and don’t yet work with Python 3.9 which is the most recent release right now. We do this by running `conda create --name python38 python=3.8`. You can obviously name this environment `datascience` or anything you like if you want to. I didn’t do this because I didn’t know if it would work, but you’re luckily in a better position.

So now we need to activate that environment (`conda activate python38`) and we can _finally_ begin installing those damned libraries. It is officially not recommended to install packages one by one, but I’ll be damned, if something breaks we can simply create a new environment, install the packages _again_ and have a correct dependency tree again, I guess. So I opted for installing one package after one another, slowly working my way through this hassle: `conda install numpy`, then `pandas`, `openpyxl`, `xlrd` etc. pp.

Running something that imports `numpy` should now work within a Python script. I performed the installation of `jupyter` and `notebooks` via VS Code which worked out of the box. But you maybe want to install it “manually.” Then you just need to install the packages `jupyter` and `notebook` using `conda`.

Now to our master piece: A native install of PyTorch. Even though the `conda-forge`-repositories offer a lot of binaries for Apple M1-chips right now, PyTorch is not one of them. But there was an issue on GitHub that helped me solve this part as well. This issue, “[Enable PyTorch compilation on Apple Silicon](https://github.com/pytorch/pytorch/issues/48145),” gave me everything I needed.

First, I created the necessary `conda`-environment, the idea to which comes from [this comment](https://github.com/pytorch/pytorch/issues/48145#issuecomment-730132401). And then, I downloaded and installed a pre-compiled Wheels file from [this comment](https://github.com/pytorch/pytorch/issues/48145#issuecomment-729689555). This is the part where you have to use `pip install --no-deps /path/to/the/wheels/file.whl`, because `conda` apparently doesn’t like local paths and expects you to serve it some weblink instead.

If you don’t trust files from the internet, that’s fine. [This comment](https://github.com/pytorch/pytorch/issues/48145#issuecomment-748336874) seems to describe the process of generating the required wheels file locally. But I haven’t tested it, because at this point, I just wanted to get it running.

## Wrapping Up: Data Science on Apple Silicon

Okay, so now we’re done setting everything up. What a mess, right? Hopefully, this blog post will become outdated quite soon. For instance, I remember that I installed Homebrew initially using a somewhat hacky method because when I initially set it up, Homebrew didn’t ship for ARM yet. But by the time I’m writing this blogpost, Homebrew installs just fine without any additional tricks.

The fact that the `conda-forge` team apparently was able to patch the necessary compilers in order to get `numpy` to work on Apple’s ARM architecture highlights the fact that those patches are probably being approved as I write, so that the regular python installation will also support installation of the necessary modules quite easily. And then we won’t need to use `conda` anymore, and can switch back to Homebrew’s Python and forget this migration once again.

Overall, the process has been less bad than expected, it took me roughly two work days to get everything up and running. The main problem in this case rather was that you have to do quite some amount of googling (right now, there are approximately 40 tabs open in Chrome on my computer) and stitching together sometimes obscure tips and tricks. Hopefully, this article spares you the googling part!
