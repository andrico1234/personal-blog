---
title: How to build (and maybe bundle) your UI library's packages
date: "2021-08-28T18:40:00.000Z"
description: "If you haven't chosen a starter kit, you'll need to get your development environment up and running. This article will present a handful of common setups to help you quickly develop, (maybe) build, and (maybe) bundle your component library."
featured: images/packaging-by-annie-spratt.jpg
---

> This article is part 4 of the "The dilemmas you'll face when creating a web component library" series. If you haven't read the introduction yet, I'd recommend [giving it a read](/000-the-dilemmas-you'll-face-when-creating-a-web-component-library) first.

[Crumpled packaging paper](images/packaging-by-annie-spratt.jpg "Photo by [Annie Spratt](https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)")

You've thrown caution to the wind, and chosen a library/framework (or neither), after all, who has the time to audit [55 different toolchains](https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/)?! If you've chosen the Stencil route, you'll get tools to help build and bundle out of the box. The same goes for if you used a Lit starter kit. If you chose neither, or are ready to develop your components, then step this way.

## Dilemma 3: How to build your component library

One of the perks of developing components using technology baked into the browser means that you can avoid using build tools if you so choose. There are perks to spending the time diving deep into your webpack config, and fine-tuning for optimum performance, but it's also complexity that we can (and should) offload to our end-users. We'll talk about why a little later.

The Open WC's list of publishing [best practices](https://open-wc.org/guides/developing-components/publishing/) gives us a handy list of dos and don'ts around building our library. While the list is focused on publishing your library, some of the decisions you make now will impact publishing. The Open WC's guide repeatedly recommends against performing application-level optimisations. Chances are your library won't be directly consumed by the public. Instead, your library will be consumed by developers to be used within their own applications. As only the developers know about their product's requirements, the responsibility regarding optimisations like bundling should fall to them. This means we can choose simpler tooling, and not feel guilty about it.

When it comes to building your library, three popular options are:

- TypeScript
- Going buildless
- Configuring a build tool

The [Lit documentation](https://lit.dev/docs/tools/development/) recommends the first two options. Lit also offers some recommendations for configuring Rollup, but we'll talk about why that might not be right for your library later.

### Buildless (Web Dev Server)

Building a web-based project using frameworks like React and Angular require build tools to get code web ready. Since we're using neither React nor Angular, but technology already supported by the browser, then a build tool starts to feel superfluous. Great, so we can scrap Webpack, and use a simple web server for development.

This kind of workflow, where the files you're passing to your development server are already browser compatible is called _buildless._ If your code is browser compatible to begin with, then any tooling you need to get your code browser ready is either light-touch or non-existent.

So having a build tool is useful if your library has to be compatible with older browsers. If you remember, the Open WC's publishing guidelines suggest we only publish latest browser compatible JavaScript and to leave concerns about product requirements to the developers consuming our library. This means we can use a development server for very light code transformations, or simply for a better development experience.

The tool that Lit and Open WC recommend is [Web Dev Server](https://modern-web.dev/guides/going-buildless/getting-started/), a simple development server which facilitates a buildless workflow. This means you won't have to generate a _lib,_ _build,_ or _dist_ directory to publish your code or to use it in the browser.

So why do we need to use a development server if all the technology is supported by the browser? Tools like Web Dev Server offer some neat features, like caching and auto-reload, but the main reason why a dev server is useful is that you don't want to have to manage your [bare module specifiers](https://polymer-library.polymer-project.org/3.0/docs/es6#module-specifiers) manually. You'll commonly see module paths like the following `import { html } from 'lit-html`. For the browser to import the packages, the path needs to be explicit, i.e. a relative path to the file with the file extension included, like so:

`import { html } from '../node_modules/lit-html/lit-html.js`. This is a feature of Web Dev Server. In fact, I've stolen this example from the Modern Web's guide to [loading modules](https://modern-web.dev/guides/dev-server/loading-modules/). So if you'd like to learn a little more, give that a read.

If going buildless catches your eye as much as it did mine, [Pascal Schilp's](https://css-tricks.com/going-buildless/) 2019 article expresses just how much one could achieve going buildless.

### TypeScript

If you have no intention of introducing TypeScript into your project or aren't familiar with it, you can go ahead and skip this section.

TypeScript's more recent features facilitate quick and simple monorepo development: incremental builds and project references.

Working hand-in-hand, incremental builds and project references are designed for repos that are broken down into small pieces (monorepo anyone 🤔). TypeScript then intelligently works out the least costly way of building your project when you've made changes, as well as reducing time overhead and memory usage, and helps enforce logical groupings of your packages. The [TS docs](https://www.typescriptlang.org/docs/handbook/project-references.html) do a better job of illustrating this, but this [StackOverflow](https://stackoverflow.com/questions/51631786/how-to-use-project-references-in-typescript-3-0) answer cleared things up even more for me.

TypeScript also offers flexibility over which version of JS your project gets compiled to. As per the [doc's recommendations](https://www.typescriptlang.org/tsconfig#target), you can choose a recent target if you plan on running your code on more modern environments, or even compile down to much older targets if necessary.

These features are great, but they don't afford much more than web-dev-server. In other words, it will mostly come down to whether you enjoy writing in TypeScript.

### But what about minifying and optimizing?

This is kind of a side dilemma because it's a problem very few people may be interested in solving, especially as the Open WC best practices recommend against doing this.

By default you'll be exporting your components as ES Modules, which you can get away with as ES Modules' [global usage in compatible browsers](https://caniuse.com/es6-module) is >93%.

You might find it fair to assume that the people consuming your library are developers using it to make their own websites and web apps. If this is the case, then the concern to minify/bundle is not _your_ concern. Performing these optimisations too early can even hamper the [developer experience](https://open-wc.org/guides/developing-components/publishing/#do-not-optimize).

If you really want to go ahead and bundle your application, you can extend your [web-dev-server config](https://open-wc.org/docs/building/rollup/), or use a tool like Google's [Closure Compiler](https://developers.google.com/closure/compiler) to compress your output.

### What about consuming via a CDN?

Note: if you need a refresher on ESM, CJS, and UMD, then you can read [Igor Irianto's](https://irian.to/blogs/what-are-cjs-amd-umd-and-esm-in-javascript/) brief rundown.

If making your web component library as widely available is a priority, then outputting to UMD will make it compatible with CDNs like UNPKG.

I tried solving this problem by building the packages to the 3 different formats. TypeScript can export to both CJS and ESM, so required little setup. As for creating a UMD output, I used a Vite setup. After I implemented this, I soon removed it simply to stick to the advice laid out in the Open WC's best practices:

- Publish only ES Modules.
- Leave the building, minifying, and optimizing to your end-users, as its an application-level concern

I had to check in with myself to make sure I wasn't doing unnecessary work for the sake of work (though you could say that about most modern development).

## Next steps

You're now writing your first batch of components, and they're looking great when you run them locally. It's time to ship, right?

Not quite, are you confident that they'll work after every change you make? Do your components behave on the most popular browsers? Maybe, but also maybe not.

You _could_ go ahead and ship them, but if you do and things break your end-users might lose a little confidence in your library. Why not take a few minutes and consider your [testing strategy](/005-defining-your-UI-librarys-testing-strategy)?
