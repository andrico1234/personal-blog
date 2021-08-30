---
title: Creating documentation for your UI library
date: "2021-08-28T19:10:00.000Z"
description: "Good documentation is a cornerstone of great developer experience, and great developer experience will encourage developers to stick with your library. This article offers different documentation options (from the very simple, to the more involved) to help you get your library well-documented and set up for success."
featured: images/instructions-by-annie-spratt.jpg
---

> This article is part 7 of the "The dilemmas you'll face when creating a web component library" series. If this is the first article in the series you've come across, I'd recommend [giving the instructions a read](/000-the-dilemmas-you'll-face-when-creating-a-web-component-library) first.

![Individual sheets of paper with text on](images/instructions-by-annie-spratt.jpg "Photo by [Annie Spratt](https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)")

## Why is documentation important?

Can you remember when you used a tool with a developer experience so good, it ended up being a staple of your programming toolbox? I can, and most of the time the clear and easy-to-use documentation played a big part. If you want your UI library to be a part of your end-users toolbox, you'll need to give some consideration to your library's documentation.

This article will focus more on the different forms of documentation, and not on how to write good documentation. Stay tuned as I have an upcoming article that covers qualities of good documentation.

## Dilemma 7: Adding documentation for your library

With your first handful of components live, you can now create a documentation site that both showcases their capabilities, and educates your audience on how to use them.

There are many ways to get your documentation site up and ready, some straightforward, and others requiring a bit of elbow grease! We'll touch on a handful of options in increasing order of complexity.

### Option 1: README.md

There's a lot to be said about the benefits of rapid delivery, doing the least amount of work needed to deliver something of value.

While this article series often turns a blind eye to this principle, if you don't want to deal with the overhead of managing a discrete documentation site, you can keep things stripped back.

If your codebase is publicly displayed on GitHub, your documentation can simply live as your top-level README.md. You can pepper other markdown files throughout your repo and link to them from the root, which is how [Changesets](https://github.com/atlassian/changesets) manages their documentation.

The benefits of this approach are two-fold:

- You don't need to worry about creating and deploying a documentation site
- The markdown files you write now can be used as inputs for static site generators that you might use later on.

This means you can start simple, and repurpose the markdown you write to generate your site's pages in the future. These next two tools are examples of ways to do just that.

### Option 2: Markdown-driven documentation tools (Rocket, Docusaurus)

This is an evolution to option 1 and would be a viable option for those who expect their library to be adopted by the web development community.

If you've been contributing to your documentation via option 1, you can use those files as inputs to static site generators like [Rocket](https://rocket.modern-web.dev/guides/) and [Docusaurus](https://docusaurus.io/).

These are both tools that take your markdown and JavaScript, and compile it to a static site optimised for documentation. Both these tools provide routing, page rendering, and bundle optimisations out of the box. These tools also provide benefits over other static site generators, like Gatsby, as they provide features and tooling focused around building documentation sites.

Note: Rocket is still in an early beta phase so expect breaking changes. Their docs may still have parts outdated or missing. I wanted to give Rocket a shoutout because it has a lot of potential and is part of the Modern Web family.

I won't focus much on how to get started with a specific framework, because this dilemma is less about the specific technology and more about the underlying principles.

For [oui-ui](https://oui-ui.netlify.app/), I chose to use Docusaurus due to its feature-set focusing on accessibility and fast feeling experiences. I'd eventually like to migrate over to Rocket, as their use of the `mdjs` file format, seems more appropriate for web components. Docusaurus uses `mdx`, which is a way of embedding React into your markdown files. This works fine, but getting web components working with React often requires a little extra work.

### Option 3: UI Cataloging (Storybook)

Nathan Curtis has an excellent series on [Document UI Components](https://medium.com/eightshapes-llc/documenting-components-9fe59b80c015). In the article, he emphasises the importance of understanding your audience and considering how best to present your examples, design references, and code references.

Cataloging your UI components is one way of giving your end users a playground to test your components, while also providing examples and code snippets. Several well-known UI sites use Storybook for just this, including [Clever Cloud](https://www.clever-cloud.com/doc/clever-components/).

The downside to using Storybook is that it's the most involved of the 3 options. Using it requires understanding the feature-rich framework, as well as learning the specific syntax required to write stories.

For a widely-used UI library or design system, this trade-off can yield amazing results. Clever Cloud's docs site not only lets you interact with each component, but also provides contextual examples by using many components together.

The Storybook ecosystem also provides add-ons to help:

- Quickly adjust the viewport
- Measure your layouts
- Test components against accessibility standards
- Display source-code

UI Cataloging is a good choice if you have the capacity to use a tool like Storybook, along with some of the bells and whistles.

## Deploying your docs site

I won't offer a dilemma for deploying your documentation site. I would like to suggest following Netlify's [official getting started guide](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/). I chose Netlify because I find they provide an excellent developer experience for deploying static sites, and their documentation is easy to follow along. Once you complete the getting started guide, Netlify will kick off your deployment and, within minutes, should provide you with the public URL to your fancy new docs site.

If you're interested in some more advanced topics, like setting up custom domains, setting up security certificates, and continuous delivery, take a look at the [Netlify documentation](https://docs.netlify.com/).

## Next steps

Phew! After all that work, you've got your UI library up and running. By creating documentation for your end-users, you've set your UI library up for future success.

What's left to do? All the fun stuff! Like adding more components, writing more tests, exploring new patterns, and automating more of the manual work. We'll [wrap up in the last article](./008-conclusion-the-dilemmas-you'll-face-when-creating-a-web-component-library)!
