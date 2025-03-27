---
layout: post
title: "Fix Dependency Vulnerability by using Yarn Resolutions"
date: "2025-03-27"
---

I've been working on a Node.js project that included a security vulnerability in
its dependencies. Not ideal. So I had to fix it.

After a quick check, all the dependencies that were explicitly listed in the
`package.json` file were using the latest versions. Digging deeper, it was a
dependency of a dependency that had the security vulnerability. The
vulnerability had been patched in a newer version, but the dependency I was
using had not yet been updated.

Looking at the versioning of the vulnerable package, there were no breaking
changes in the update so we could safely update it to the newest version without
breaking the library that used it.

Yarn offers a feature for exactly this scenario called [selective dependency
resolutions](https://classic.yarnpkg.com/en/docs/selective-version-resolutions/).
To use them, a `resolutions` attribute is added the `package.json` file with a
version or range of versions that a specific package should use. View the linked
documentation for exactly how to use it.

Adding the vulnerable package to the `resolutions` attribute with the newest
version means my project is no longer vulnerable to that security issue.
