---
layout: post
title: "Use the Debugger"
date: "2025-06-26"
---

Last week I was debugging an issue where an expression was evaluating to `true`,
but whenever I logged the value being evaluated to the console is was showing up
as `null`. It turned out to be an issue with the way the logger was interpreting
an `InvalidDate` object. But I only discovered this by using the debugger.

Cursor (or VS Code) has a feature where a JavaScript Debug terminal can be
started. In the terminal panel there's a dropdown menu next to the "+" button.
Click on this and in the list of options is "JavaScript Debug Terminal". Click
on this and a new terminal will launch.

This new terminal window will open and look like your usual one but it may take
a slightly longer to start up. You can run your code or tests from this terminal
like you normally do.

The utility comes by adding what's known as a break-point into the code that
you'd like to analyse. This can be done by hovering your pointer in the
left-hand gutter next to the line numbers. As you do this a dark red circle will
appear in line with each line of code. If you click here a bright red circle
will stay selected on the line you've chosen.

Now run your code.

When the code that's being run hits this line the execution will pause and give
you a new sidebar option, a floating menu, and the line of code highlighted in
your editor that is currently being executed. In the sidebar a few things are
shown including the current JavaScript stack and variables in the immediate
context with their values. The floating menu allows you to continue execution,
step over the line highlighted, step into the line highlighted, or stop
execution.

I put a breakpoint on the line containing the expression that seemed to be
executing wrong. In the debug sidebar I was able see the value of the variable
that was logging out as `null` was actually an `InvalidDate` object. This solved
the issue in my understanding of the problem and the fix was easy after knowing
this.

Digging deeper can be done using the options in the floating menu to move
through the code and see what's happening in a very detailed way. I'll leave
exactly how this works to the reader (or potentially a later post).

One of the biggest caveats I've encountered is using the debugger in code that
is sensitive to timeouts. If I don't step through the code quick enough I'll run
into timeouts and be unable to see my actual issue without restarting and
stepping through quicker, or placing the breakpoint closer to the issue.

My main point with this post is to remind myself to use these tools. They're
incredibly useful and reduce the time needed to solve problems by a lot. Logger
debugging is great but using debuggers is easy and better.
