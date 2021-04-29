---
title: What is a Generator?
date: 2021-01-29
slug: what-is-a-generator
excerpt: |
  This week, we implemented a classifier in our first lab-session of the Natural Language Processing course that I currently take at LiU. To pass the course, we actually have to write a lot of Python code, and as we – the PhD students from the Institute for Analytical Sociology – do not have any formal education in programming and computer science, it is proving hard to receive good results. One question my colleague had during the week was: “What is a generator?” Here’s the answer I gave her. (Probably a better one, because I had a few days to think about it.)
---

There are possibly as many programming languages out there as there are presidential candidates in the early stages of U.S. elections. All of them have been developed with a reason – some have been tweaked to specific purposes, such as the scientific languages R, Julia, or Fortran; some have been developed as improvements over previous attempts, such as C++, or TypeScript. And while some serve only the purpose of general amusement, such as [Rockstar](https://codewithrockstar.com/online?source=/rockstar/examples/fizzbuzz.rock) (if you want to have a laugh, I recommend [this great video by its creator, Dylan Beattie](https://youtu.be/6avJHaC3C2U?t=2831)), some have become the foundation of whole scientific fields, such as Python.

## Functions

Naturally, all of these languages solve certain problems differently. One of these problems is how to deal with repetitive tasks. “Repetitive tasks?,” you might wonder now. Yes, I am talking about functions. Every programming language has a concept of a function that takes some input, does something with it, and returns an output. Take the following example:

```python
def read_file (path):
    with open(path,  'r')  as fp:
        return fp.readlines()
```

This function simply takes a file path, opens it, and returns a list of lines in that file. This works fine, and there is nothing to worry about. But now, imagine you don’t have small files, but actually files that are several Gigabytes large. Then you have a problem.

## The Problem: Memory and Big Data

Imagine a file that contains 4GB of text. This is an amount that we regularly see in machine learning tasks. And now imagine that your computer has the (current) default of 8GB of RAM. And now imagine you [forgot to shut down Google Chrome](https://i.kym-cdn.com/photos/images/original/001/501/182/e22.gif) and run this function.

What will happen is that Python will open that file, and read it _in its entirety_. And when it has finished it, it will return you a list of all the lines in that file, possibly smiling at you innocently.

Now, what will happen on any computer where you have about 2GB of RAM left, and attempt to push 4GB of data into it? Exactly: Your operating system will begin to write something of that RAM onto your hard drive so that there is enough space for your big file (this is what the `swap` partition on Linux systems is for. Windows has a similar concept, but worse – obviously). And this will cause the whole function to take a lot of time, because your operating system needs to write data from the fast RAM onto the not-so-fast hard drive. And if you are dealing with a lot of expensive computations anyway, you don’t want your very first step in the analysis to become the computational equivalent of super glue, right?

So what should we do? The simplest idea is: Just don’t read in the whole file at once, and try to keep all the RAM requirements for your whole code below that critical mass that would crash your Chrome tab number 42 and, subsequently, because [we know that beast of a browser](https://preview.redd.it/3ushid6skkj41.jpg?width=640&crop=smart&auto=webp&s=0ad5ba2ef65684e56fbb37d4082e7d6b77d09c5b), your whole computer.

## Introducing the Concept of Streams

“Yeah, sure, don’t read the full file. But we need the full file!,” you might think now. And yes, over the course of our data analysis, there is a very high chance that we need the whole file. But not _at once_. Rather, we want one line at a time.

Luckily, this problem has been solved many times before us. A file is basically like a staple of paper sheets. If you need all of them, you will, one after another, take a piece of paper from that staple, work with it, and put it somewhere else, until the whole stash has been worked through. If you open a file, you don’t actually read the file, but rather tell your computer “Hey, I want to use that file!” And in a _second_ step, you then read the file itself. And you can do this using streams.

A stream is basically the computational equivalent of a bureaucrat sifting through piles of forms, processing one at a time. In terms of file parsing, this means that the stream will give you back one part of a file at a time – a line, for instance (or a certain amount of characters in it). Under the hood, Python’s file reader does the same: It opens the file, reads one line, then the next, and so forth.

However, if you call `readlines()`, this will tell Python “give me that full file! Now! Entirely!” So what do we need to do?

Enter generators.

## Introducing Generators

A generator is also a function, but one that only processes a small piece of data at once, returning that piece to you and waiting for you to request the next piece of data.

The file object itself (that one that you get when you call `open()`) is a generator. And we can make use of this generator to turn our file reader into a generator itself! We just need to change two lines of code. Look at the following example:

```python
def read_file (path):
    with open(path,  'r')  as fp:
        for line in fp:
            yield line
```

> Note: This code works only in Python 3, because in Python 2, the file object was _not_ a generator. So don’t be mad at me if your Python barks at you.

What has changed to our example from the beginning is that now we are not returning a list containing all your lines at once, but rather return one line at a time. (Note the `yield`-keyword. It’s basically the same as `return`, but better. Bear with me.)

The good thing is that the for loop is pretty good in dealing with generators, because a generator is _iterable_. That means, you can iterate over a generator just like you can iterate over a list. You could use above function as such:

```python
def process_lines (file_path):
    for line in read_file(file_path):
        words_in_line = line.split(' ')
        # Do something with the words here
        yield words_in_line
```

But, to go one step further, you really want to do something with the lines, right? For example, feed them to some classifier to train it for some task. Imagine the following code:

```python
def make_batch (file_path):
    batch_size = 25
    batch = []
    for word_list in process_lines(file_path):
        batch.append(word_list)
        if (len(batch) == batch_size):
            yield batch
            batch = []

    if len(batch) > 0:
        yield batch

def train_model ():
    training_data = '/path/to/data.txt'
    model = CreateClassifier()

    for batch in make_batch(training_data):
        model.train(batch)

    # At this point you have a trained model
```

What the function `make_batch` is doing is it will create an empty list, to which it will append lists of words until it reaches the size `batch_size`. Then, it will give you that whole batch, and create a new, empty batch. And the classifier is then trained on just one batch at a time.

> **Main Takeaway**: This means that, at any time while running the program, you will have _at most `batch_size` sentences of the big file in memory!_ The memory usage is generally determined by that one part of your program, that will “keep” the most data in memory. In our function this is `make_batch()`, which fills a list up to a certain point, and only if that point is reached will it return the whole list at once. All other functions only return smaller pieces of data. If you would now increase the `batch_size` to equal the amount of lines in the big file, then you end up where we started: After `make_batch()` is done with one (that is: the only) batch, Python will have put 4GB of data in your computer’s memory and you will know that because Google Chrome will be very angry with you.

To understand it further, here is how this program will run:

1. You call `train_model()`
2. `train_model()` will call `make_batch()` and request one batch of training data
3. `make_batch()` will then call `process_lines()` for (in our example) 25 times, retrieving 25 processed lines.
4. `process_lines()` will, for every line of those 25 we request, call `read_file()`
5. Finally, `read_file()` will, for every requested line, call `fp`, which is, as we remember, the “original” generator.

You will have noticed that, instead of `return` I have written `yield`. This is basically just a keyword that tells Python: “Instead of returning content and then leaving the function, return the content but keep the function as it is, and the next time I call the function, do not start all over, but rather continue where you were.” `yield` just tells Python to convert your function into a generator.

And this involves a lot of _magic_. Are you ready for more?

## Bonus Round: Magic Functions and What The F\*\*\* is Going On?!

I might have said it already in one of my earlier posts, but I don’t really like Python. The main reason is that I actually miss curly braces. Indentation with spaces also looks clean, but if you really want to know which lines belong to which loop, it just takes longer to figure this out as opposed to when you have curly braces. Because as soon as you see `}` you know that some expression, loop, or if/else statement is over. This has opened the gates for really bad coding habits, yeah, but I won’t let this argument count. Curly braces are much safer. Period. There, I said it.

### Code Conversion: List Comprehension

Another reason why I don’t like Python is that it produces a lot of _side effects_ that are invisible while writing your program. Python will, for instance, convert a lot of the stuff you have written into different code before running it. Let me show you two examples. The second one will be generators, but first, I want to tackle a concept called “list comprehension.”

```python
# List comprehension means to write for-loops
# on one single line.

# This means, Python will convert this ...
count = sum(1 for element in my_list)


# ... into this:
def __function (some_list):
    new_list = []
    for element in some_list:
        new_list.append(1)
    return new_list

count = sum(__function(my_list))
```

As you can see: It’s much shorter to write (and there are probably a lot of optimisations going on under the hood), but it basically alters your code. And this requires you to understand _why_ this works, if you really want to bring list comprehension to good use. It’s basically all about turning more code into less so that it fits on one line. Probably to justify why Python doesn’t use curly braces, right? RIGHT?!

### Magic Functions

And now the second example: generators. Take our example from above:

```python
def read_file (path):
    with open(path,  'r')  as fp:
        for line in fp:
            yield line
```

Internally, Python will convert this cute little function into the following monstrosity that doesn’t need to hide behind Cthulhu:

```python
class read_file(object):

    def __init__(self, path):
        self.path = path
        self.fp = open(self.path, 'r')

    def __iter__(self):
        return self

    def __next__(self):
        try:
            line = self.fp.__next__()
            return line
        except StopIteration:
            raise StopIteration()
```

Note that the whole `try/except`-block is not really necessary, but I included it here so that you understand it: As `fp` itself is a generator, it will behave like the generator that I have written here. You probably have a lot of questions right now. Let’s answer them one by one.

#### What are those Underscore-Functions?

First, this class features several functions that are surrounded by four underscores: `__iter__`, `__next__`, and `__init__`. These are called **Magic Methods**. They are called “magic,” because you normally don’t see them, but they are quite useful. For instance, a `for`-loop won’t work on everything, it only works on variables that are _iterable_. This means, internally, a `for`-loop will take the variable and take a good look at it. If the variable is an object and exposes a function called `__iter__`, the `for`-loop will be happy and call it. Next, the `for`-loop will call the `__next__` function, and write whatever comes out of this into your variable. So if you have a for loop like this:

```python
for element in iterator:
    print(element)
```

Python will call `iterator.__next__()` and put whatever this function returns into `element`. When there are no more elements to return, an iterator _must_ `raise` an error (`throw` in other programming languages). The `for`-loop will automatically catch this exception and simply stop looping.

> **Main Takeaway**: Magic methods are called magic, because they enable you to do stuff that will happen automatically. “Magic” functions are less magically, and more simply conventions: The Python developers have decided that there is a bunch of those magic functions (not just the few you see here), and if they exist, Python will automatically call them for you. For instance, the `__init__`-function will be called whenever you create a new object of that class. If you don’t need to initialise some variables, you can simply omit this function, and Python will not call it. That would then be a “static class.” By the way, Python is by far not the only language making use of magic methods: you can see it in [PHP](https://www.php.net/manual/en/language.oop5.magic.php) as well, or even [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get).

#### Okay, now how do Generators Work?

For this, you need to understand how classes work in general. If you do, then it should be relatively self-explanatory. First, such a generator-class will take everything _before_ the loop as internal variables. This is called the _state_ of the generator object. In our case, it’s just the file pointer. Then, the generator class will create such a `__next__` magic function and in that replace your `yield`-keyword with `return`. Every time the `__next__`-function is called, it will read one line and return that from your file pointer.

Because your file pointer is also a generator, it will raise an exception, `StopIteration`, as soon as it hits the end of the file. This is an additional convention. For instance, if we did not re-raise the `StopIteration` error, we would have created an endless generator, so the `for`-loop would never end.

That all of this is working so flawlessly is just because of a lot of conventions and the magic methods. For instance, if you would omit the `__iter__`-function, the `for`-loop would give you an error that the object is not iterable (because it does not have this `__iter__` function).

But there is one other reason for why you might want to use generators: To create an endless stream of some data. Consider the following code:

```python
def get_id_number():
    number = -1
    while True:
        number += 1
        yield number
```

This is an endless generator, so it will never stop running. This means: Do _not_ use it in a `for`-loop! Rather, what you could do is do the following:

```python
id_generator = get_id_number()

do_something()

if we_need_a_new_id:
    my_id = id_generator.__next__()
```

This way you have this one function and it will _guaranteed_ give you a unique ID every time you call it. You could write other code as well, but it might be that such a generator is just an easier way of doing so.

> Note: Of course such an ID generator will not generate unique IDs forever. Specifically, it will stop creating random numbers if it hits the maximum size of the number type of Python. In Python 2 that is 9,223,372,036,854,775,807. This is quite large, but not infinite. As soon as `number` reaches this amount, and you increase it by one, you will have what is called an [Integer Overflow](https://en.wikipedia.org/wiki/Integer_overflow) and the number will reset itself to zero (if you are lucky).

## Wrapping Up

So what do we learn? Generators can be pretty decent if you have to create or process an amount of data but _don’t know how much you actually need, or have_. If you don’t know how large your file is, or if you don’t know how many numbers you need, that’s a good sign a generator is for you. But don’t forget that a generator is basically just a neat wrapper around stuff you could also do by hand, if you really wanted to.

Nevertheless, generators allow you to think better about what your code is doing. For instance, I like to think of a generator as a well. A well has some amount of water in it, and everytime you call `__next__` you take a bucket of water out of it. But even though you don’t know how much water is in there, it’s a limited amount. And at some point, your well will be _drained_, that is, have no more water in it. The `StopIteration` exception is when you realise that there is nothing left.

And this metaphor of “draining the well” can be applied to generators as well. I’ll leave you today with a final piece of code that will “force-drain” your generator, meaning that it will pull out every inch of data out of your generator until it reaches the end:

```python
drainage = [element for element in generator]
```

The above statement will forcefully call `__next__` immediately until your generator is completely empty and raises the `StopIteration` exception. And there you have it: _All_ of the somewhat dubious concepts of the programming language that I introduced in this blog post – list comprehension and generators – in one single line!

Cheerio!
