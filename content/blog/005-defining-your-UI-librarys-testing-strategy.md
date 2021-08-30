---
title: Defining your UI library's testing strategy
date: "2021-08-28T18:50:00.000Z"
description: "Your component library is taking shape and you're getting close to publishing! Can you confidently say that you won't ship broken behaviour and that your components work across browsers? If you said no, it's time to consider your testing strategy. If you said yes, then it's still time to consider your testing strategy. Don't add testing only when you need to."
featured: images/testing-by-national-cancer-institute.jpg
---

> This article is part 5 of the "The dilemmas you'll face when creating a web component library" series. If this is the first article in the series you've come across, I'd recommend [giving the instructions a read](/000-the-dilemmas-you'll-face-when-creating-a-web-component-library) first.

![Dr. Jonathan Hartwell (right) and his assistant Sylvy R. Levy Kornberg conduct some of the earliest chemotherapy tests at the National Cancer Institute, about 1950.](images/testing-by-national-cancer-institute.jpg "Photo by [National Cancer Institute](https://unsplash.com/@nci?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)")

Your components are looking dope. You've shared some teasers on Twitter and your legions of followers are keen to swap out their current UI libraries with yours. But wait, are you certain that it all works as expected? Maybe it's fine on Chrome, but what about Safari and other browsers? What about edge cases or when used with assistive technologies?

Maybe it's not a problem for a library of 1 or 2 components, but add a handful more along with some shared internal code, and one small typo can break your entire library.

The first step in mitigating these problems is to create the foundations for your testing strategy. Don't add testing only when you _need_ to.

## Dilemma 4: How to create your testing strategy

This article is not a comprehensive introduction to the wide world of testing. Instead, it aims to provide some guidance to help you be pragmatic about which types of testing are best for your library.

### Integration tests (headless browser testing)

I didn't know what to call this, is it integration testing? Headless browser testing? 🤷🏽‍♀️ It's testing your web components by running them in a browser without a UI. Doing so provides benefits like:

- letting you use the browser's API and programmatically interact with your component just as a user would.
- improving the speed of your tests as there's no longer the overhead of a browse UI.

This means you're testing your components under real-life conditions, and aren't spending too much time and effort testing your component's internals.

So whatever you want to call it, you're gonna need it if you want assurance that your components won't explode over the smallest change.

For those coming from a React background (like me), you might have used Kent C Dodd's incredible [React Testing Library](https://github.com/testing-library/react-testing-library) (RTL). For those familiar with RTL, you'll have seen the following quote float around:

> Write tests. Not too many. Mostly integration.

The [accompanying article](https://kentcdodds.com/blog/write-tests) unpacks the implicit meaning in each of the three sentences and is worth a read to help understand where each form of testing sits in your overall strategy. Even though we won't be using RTL, the guiding principles can still be applied to testing our web components.

So why are we avoiding unit tests? Well, your components aren't atomic units of code, but the combination of methods and properties to make a fully functioning component. Unit testing each method will not serve as a guarantee that your component is ready for the big wide world.

[https://i.stack.imgur.com/yHGn1.gif](https://i.stack.imgur.com/yHGn1.gif)

And to hit the point home, here's another quote the RTL folks should be familiar with:

> The more your tests resemble the way your software is used, the more confidence they can give you.

With that being said, if adding some unit tests increases the confidence you have in your code, then by all means add some.

Another key player in the testing space also encourages this approach, the Modern Web. The Modern Web even roll their own test runner, the [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/). It's the test runner that the [Lion WC](https://github.com/ing-bank/lion) repo uses for testing. It works with several headless browser engines, one of them being [Playwright](https://www.npmjs.com/package/playwright).

We've gotten this far and haven't touched on the two scariest words in the web dev's dialect, _browser_ _interoperability._ This is why I singled out Playwright since with it you can run your tests in all [evergreen](https://learn-the-web.algonquindesign.ca/topics/browser-testing/#evergreen-browsers) browser engines. This means a single test can run against Chromium, Firefox, and WebKit.

With your web test runner set up, the next thing you need to do is interact with and make assertions against your components to ensure that they behave as expected.

If you've done a little unit testing in the past, you might have used a library called [Chai](https://www.chaijs.com/) to perform your assertions. This is a solid choice to use, but if you want some additional capabilities like:

- Accessibility testing
- DOM assertions
- Function spying
- Snapshot testing

Each can be enabled through the use of plugins, but you'll need to manually configure them yourself. All of the above, are handy to use when establishing a robust web component testing strategy. With that being said, you can bypass all the work in setting it up, and use [Open WC](https://open-wc.org/docs/testing/testing-package/)'s testing helpers package. It re-exports the Chai library, sets up the above plugins, and provides some handy testing helpers for testing web components.

We've talked about testing a lot here, but if you've gotten some headless browser tests set up, then you've completed the first, and in my opinion, the most important step for getting a solid testing strategy in place.

Having tests isn't enough though, you start to yield the benefits when you run your tests at the right time and in the right place. For oui-ui, we're using the CLI tool [Husky](https://typicode.github.io/husky/#/) to run all integration tests automatically before we commit code. This prevents us from forgetting to run the tests before we publish updates.

If you've got any cool testing automation set up in your repos, please share with me and I'd love to add it to the [resources repo](https://github.com/andrico1234/web-components-resources).

### Snapshot tests

As your UI library matures, your end-users will trust that your components will look and act as expected. A small update to your component's render logic shouldn't inadvertently change its visual layout. You can try and remember to manually test your components, but how can you guarantee that your component's layout hasn't changed, even by a pixel.

This is where snapshot tests come in. The test runner will take a _snapshot_ of your component, and store it as either a screenshot or as a serialised string. The next time you run your snapshot test, the test runner will compare the current version of your component along with the previous one. If the test runner spots any differences, you will have to manually inspect and approve them.

If you've chosen to use Open WC's test helpers, then you'll already be able to start [snapshot testing](https://open-wc.org/docs/testing/semantic-dom-diff/) without any extra setup.

### Manual testing

Having a complete automated testing suite means you can spend more time performing exploratory testing to catch issues that automated tests can't find.

Kate Kalcevich and Mike Gifford have a fantastic article on baking [accessibility testing into your development process](https://www.smashingmagazine.com/2021/04/bake-layers-accessibility-testing-process/). The article recommends a handful of ways of manually testing that your UI is accessible, which I've adjusted slightly to focus on testing components:

- Can you use your components without your mouse? Use simple keyboard-only manual testing to evaluate new components.
- When using your components in the wild, set magnification to 200% or greater using the built-in magnification tools in your browser (Ctrl +)
- Flip your browser or OS to dark mode and see if your components work well for people with light sensitivity.
- Perform testing using assistive technology (VoiceOver, Microsoft Narrator, and NVDA are free options).

If you're interested in your UI library being accessible, [and you really should be](https://www.w3.org/WAI/fundamentals/accessibility-intro/#important), then make time for manual accessibility testing. Making your components usable for those with sight, hearing, cognitive, or motor disabilities will also make your components more usable for [everyone else](https://www.w3.org/WAI/perspective-videos/keyboard/).

And if you're interested in learning more about writing accessible components, Carie Fisher's [A11y Style Guide](https://applitools.com/tutorials/overview/analyzing-differences.html) provides expected behaviour for a variety of components, as well as code snippets.

### Other types of testing

The [PatternFly Elements](https://github.com/patternfly/patternfly-elements) repo also tests across different web frameworks in addition to browsers. To adhere to their principle of `write once, use everywhere`, they have dedicated test suites that run their components using Vue or React wrappers.

## Next steps

You've established your 3-tiered testing strategy; integration tests, snapshot tests, and manual testing. You're confident that you've set the foundation for a robust component library.

You're finally ready to share your components with the world.

The world is ready for your components.

Heck, with your testing strategy in place, even your components feel fit and ready to make their way to your end-users' websites!

Make sure you've renewed their passports because we're about to [ship them off to the NPM registry](/006-versioning-and-publishing-getting-your-UI-library-into-your-users-hands).
