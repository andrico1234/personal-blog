---
title: Tools to make writing your web components a breeze
date: "2021-08-28T18:30:00.000Z"
description: "Hello world"
featured: images/seo-test.jpeg
---

> This article is part 3 of the "The dilemmas you'll face when creating a web component library" series. If you haven't read the introduction yet, I'd recommend [giving it a read](/000-the-dilemmas-you'll-face-when-creating-a-web-component-library) first.

You've learned a good deal about how to scaffold and manage your monorepo. So enough yak shaving, it's time to buckle down and pick a framework to build your web components with.

## Dilemma 2: Pick a library for creating web components

Disclaimer: This article assumes that you want to create a web component library. I won't spend any time going into the pros and cons of web components, and I'll assume you already know the fundamentals.

### How can we build web components?

If you want to get developing quickly, here are four common frameworks/libraries:

- [Lit](https://github.com/lit/lit/) - _a simple library for building fast, lightweight web components._
- [Stencil](https://stenciljs.com/) - _a simple compiler for generating Web Components and static site generated PWAs_
- [Haunted](https://hauntedhooks.netlify.app/) - _React's Hooks API but for standard web components and lit-html or hyperHTML._
- [Hybrids](https://hybrids.js.org/#/), with their catchy description - _a UI library for creating web components with unique declarative and functional approach based on plain objects and pure functions._

For those that _really_ want to see more of the web component iceberg, [here's a wonderful tool](https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/) that shows 55 (😱) different ways to create web components.

### Do we even need to pick a framework/library?

When it comes to writing web components, there's also the option to go vanilla. Going vanilla is perfectly valid if you're prepared to write more verbose code and get acquainted with the [web component specs](https://github.com/WICG/webcomponents). In fact, I went vanilla for oui- ui.

If you care more about rapidly developing UI, then choosing a framework can let you hit the ground running. A lot of frameworks offer bells and whistles to ease the learning curve, improve the developer experience, and provide more for your end-user.

For instance, Stencil offers additional lifecycle hooks and helper decorators as abstractions over the browser's lower-level APIs. This means you can deliver more while writing less code and avoid learning the ins and outs of the web component spec.

Lit is another popular choice, and is used by [Material Web](https://material-components.github.io/material-components-web-catalog/#/component/button), [Wired](https://github.com/rough-stuff/wired-elements/blob/master/src/wired-card.ts), [Lion](https://lion-web.netlify.app/), and many other libraries. Lit's designed to remove a lot of the boilerplate involved with writing web components, but doesn't offer as many extras out of the box as Stencil does. This keeps Lit's API simple. In fact, the core `LitElement` is derived from `HTMLElement`, meaning their API should feel familiar for those with some pre-existing web component development experiences.

Both Lit and Stencil offer starter kits that set up your development environment to ease with developing, testing, and publishing. If you want to fast-track through this article series, those kits are a great place to start.

Haunted can be used in conjunction with Lit, and its shtick is offering an API akin to React's hook API. For someone coming from a React-heavy background, this could be a viable choice.

If bundle size is your concern, then why not use the web component comparison tool to pick a framework that outputs your library with a bundle size smaller than its vanilla equivalent! 😵

We've gone and found ourselves back at the age-old problem of having *too* much choice. If you find yourself in this position, just go ahead and pick the one that looks the most fun to use. You can revisit this dilemma after writing some code and better understanding whether you've made the right choice.

For me, choosing a framework for [oui-ui](https://oui-ui.netlify.app/) was like picking my favourite Neapolitan ice-cream flavour, I'm going vanilla. If oui-ui becomes a fully-fledged repo, I'll consider migrating to a more robust solution. Because each library/framework aims to solve a specific problem, I can't give a confident personal recommendation for which _you_ should go for, but I hope I've given you enough to get you curious about which framework is right for your library.

## Next steps

Great, you've rolled a 55-sided dice and chosen a web component framework/library/spellbook. You've followed the quickstart and have your first <counter> written. Let's get your component library [built and bundled](/004-how-to-build-and-maybe-bundle-your-UI-library).
