---
layout: post
title: "AI for Coding First Impressions"
date: "2025-05-14"
---

LLMs have taken the world by storm since OpenAI released their product, ChatGPT,
in 2022. Over the last 2.5 years the number of competitors, integrated tools,
and people either loving it or hating it have exploded. Huge amounts of money,
time, and energy are being poured into this space. I'd be doing a disservice to
myself to not research it and understand some of the ways it can help me be a
better developer.

My role as a software engineer is to understand fundamentals I can use to
approach any business problem I may be asked to solve. This involves knowing
solid, tested, and reliable techniques and solutions while also being aware of
new tools and strategies that may be better than what has come before it. I
naturally lean towards a conservative approach; reaching first for tried and
tested technologies. I also recognise that I'm early in my career and there's a
lot I can learn about even these battle-tested technologies.

LLMs represent a seismic shift in the way that software is developed. The doors
are open to 'vibe' coding solutions without knowing the technical details of
everything that's gone into it; not something I'd recommend but it's possible.
They also offer powerful ways to speed up my own work by offering predictions
based on the context that I can review and choose to accept or not. I want to
balance this speed improvement while also ensuring my understanding of the
technologies used continues to grow.

Through work we've been given the opportunity to try Cursor, a text editor
forked from VS Code with integrations to some of the leading LLM models by a
range of companies. It offers autocomplete while you're working on code that can
either be accepted using the `tab` key or rejected using the `esc` key. There's
a chat interface to ask questions and get it to craft solutions or strategies,
or just to provide more context. I'm yet to discover all that Cursor can do but
here are some of the ways I've been using it that I've found helpful.

Using `tab` to accept suggestions that appear while typing feels magical. It's
not always right and I'm getting a bit frustrated with how overloaded the `tab`
key now feels but overall this is a win.

I'll use the chat feature by giving it the description and acceptance criteria
for a Jira ticket that I'm working on and ask it to help come up with a
step-by-step plan for achieving the goals of the ticket. I've noticed Cursor
wants to just start changing code so this can be a little tricky. Changing code
with only the high level information from a ticket leads to predictably terrible
results. When I can get it to focus on the plan and not the changes I get a
result that helps keeps my work focused on the goals and work through issues
well.

Another way I use the chat is to help build specific components that are likely
common patterns. This is where the code generation abilities of the models shine
through. A bunch of time has been saved being able to do this. I'm also more
confident in this approach because we have solid test suites for all the
applications and integrations I'm working on. It seems to work best on
greenfield tasks where the feature is new. Refactors of existing code are much
more hit-and-miss.

Some of the pitfalls I've run into include relying on it to write the tests for
my code. Cursor has an integration where it can run commands in the terminal
(after I read and confirm what it's going to run) which means it can build it's
own feedback loop of writing tests, writing code, and then running the tests
before making changes to fix issues that are encountered. Left to itself, this
can lead to some tests that work, but more often than not it's writing tests and
code that optimise for passing but don't actually verify what you think it is.
Care needs to be taken that the generated code is doing what you expect it is
doing, which can be trickier to stay conscious of when not every part of the
code I've worked on is as directly connected to my thought process.

I can see why there's a lot of hype around LLMs and I can see how this will be a
must-have tool for many people going forward. I feel like I've only scratched
the surface and I'm keen to give it more of a chance. I've heard about MCP
servers and writing rules files and I'll need to give them a go soon. Care still
needs to be taken but in the right moments with the right guidance this can be
an incredibly powerful tool.
