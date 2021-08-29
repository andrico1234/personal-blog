---
title: Tools to help manage your monorepo
date: "2021-08-28T18:20:00.000Z"
description: "Hello world"
featured: images/seo-test.jpeg
---

> This article is part 2 of the "The dilemmas you'll face when creating a web component library" series. If you haven't read the introduction yet, I'd recommend [giving it a read](/000-the-dilemmas-you'll-face-when-creating-a-web-component-library) first.

With your sights on using a monorepo, your next dilemma is choosing the right tool(s) to manage it.

## Dilemma 1: Which tool to manage your monorepo?

The two choices presented here, Lerna and Yarn workspaces, are two popular repo management tools. I chose them based on a discussion in the [Lit & Friends](https://lit.dev/slack-invite) slack group, where several UI library authors discussed their repo's tooling. Others exist, but might not be suited for small-scale component library development.

### Lerna

[Lerna](https://lerna.js.org/)'s often the first name that comes up in monorepo management, and it's still [very popular](https://www.npmtrends.com/@microsoft/rush-vs-lerna-vs-bolt). For our use case, it ticks all of the boxes, Lerna has support for managing dependencies, running scripts, versioning, and publishing. There are more features too, but for the sake of this article series, these are the four we'll be most concerned with.

For you, Lerna might be the way to go if you want an all-in-one monorepo workflow tool.

If you don't want to use Lerna but need a full-featured monorepo management tool (but you probably don't), check one of these out:

- [Rush](https://rushjs.io/), designed for very large projects.
- [Nx](https://nx.dev/), a framework to help "architect, test, and build at any scale".

### Yarn workspaces

While [Yarn](https://classic.yarnpkg.com/en/docs/workspaces/) workspaces doesn't match feature parity with Lerna, you can use some other rad tools to pick up the slack. Yarn + [Changesets](https://github.com/atlassian/changesets) + [WSRun](https://www.npmjs.com/package/wsrun), is a burgeoning stack to tackle dependency management, versioning/publishing, and running scripts.

Note: If you use [npm](https://docs.npmjs.com/cli/v7/using-npm/workspaces) or [pnpm](https://pnpm.io/workspaces), have a look to see if their workspaces feature-set has you covered, you might be able to use your preferred package manager instead of Yarn

As for [oui-ui](https://oui-ui.netlify.app/), I ended up choosing the WYC stack. My main motivator was that I wanted to explore Changesets, which we'll bring up a little later.

It might sound like a lot to take in, but that's fine as each tool focuses on solving a specific problem. These problems include:

### Dependency management

If you're already using Yarn to install dependencies, y'all get Yarn workspaces for free. The API surface is small and requires little more than some config changes.

### Versioning and publishing

Library versioning is a scary topic (at least for me), but Changesets promotes an approach that better integrates versioning management into the development cycle. If this sounds confusing or vague, I cover versioning and publishing in a lot more detail [here](/006-versioning-and-publishing-getting-your-UI-library-into-your-users-hands).

### Running scripts

Yarn workspaces doesn't have a way to run scripts across multiple packages easily. It might be tempting to roll your own bug-ridden file system traversal script, but why not pick something a little more robust?

WSRun is designed to bolster Yarn workspaces' existing feature set with additional [running modes and options](https://github.com/hfour/wsrun#workspace-script-runner).

As an aside, I should clarify that this behaviour _does_ exist in Yarn...

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">TIL yarn has a &quot;workspaces foreach &lt;script&gt;&quot; to run a script against each package in a monorepo.<br><br>I also learnt it&#39;s only available on Yarn 2.<br><br>He giveth, He taketh away</p>&mdash; Andrico Karoulla (@AndricoKaroulla) <a href="https://twitter.com/AndricoKaroulla/status/1412087951832539138?ref_src=twsrc%5Etfw">July 5, 2021</a></blockquote>

### Why not both?

Nothing's stopping you from using both Lerna and Yarn workspaces. Repos like [Vaadin](https://github.com/vaadin/web-components) do so you can mix and match to fit your needs.

### Next steps

Your repo is finally set up and you've got a suite of management tools at your disposal. It's time to [write some web components](/003-tools-to-make-writing-your-web-components-a-breeze).
