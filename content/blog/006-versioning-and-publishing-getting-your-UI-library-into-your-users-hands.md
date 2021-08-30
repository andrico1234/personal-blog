---
title: "Versioning and publishing: getting your UI library into your user's hands"
date: "2021-08-28T19:00:00.000Z"
description: "Versioning and publishing can feel intimidating. At least it does for me. Getting it right means you deliver well-communicated updates that work with  your end-users workflow. Getting it wrong can lead to developer headache and a loss of end-user trust. This article presents some questions for you to help you pick your versioning strategy, along with some tools to help you publish confidently."
featured: images/launch-by-margaux-bellott.jpg
---

> This article is part 6 of the "The dilemmas you'll face when creating a web component library" series. If this is the first article in the series you've come across, I'd recommend [giving the instructions a read](/000-the-dilemmas-you'll-face-when-creating-a-web-component-library) first.

![Rocket ready for launch](images/launch-by-margaux-bellott.jpg "Photo by [Margaux Bellott](https://unsplash.com/@mxrgo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)")

In your library's infancy, you might take the approach of developing rapidly and releasing frequently. If your user base consists of early adopters and tinkerers, then you might feel comfortable playing fast and loose with your versioning. As your library matures and starts being used more and in larger projects, your responsibility as a library developer increases. By this point, it's important that the changes you make to your library are well-considered and clearly communicated.

## What are some challenges when versioning and publishing a component library?

If you don't put the right care and attention into your versioning, you could end up with frustrated end-users, and a loss of trust. This can stem from:

- Frequent breaking changes
- Confusing versioning schemes
- Compatibility issues between different packages
- Difficulty coordinating and communicating package updates.

Picking the right tools to handle your versioning and publishing will mitigate these risks.

At the beginning of 2021, [Cassondra Roberts hosted a conversation](https://www.youtube.com/watch?v=fTlXWlZ28hc) with several folks in the web components space. Cassondra had run into a handful of problems with versioning, including the following:

> If an internal dependency has a major version bump, will dependents also require a major version bump?

When this question was thrown out to the participants, there was no definitive answer, but a series of facts, experiences, and opinions to help guide Cassondra to make the best decision for their use case.

We'll come back to this question a couple of times during this article, and see if we can build an answer using the knowledge we've learned.

### A note on Semantic Versioning

[SemVer](https://semver.org/) is a versioning system with the format MAJOR.MINOR.PATCH. It's a common system and it's the system I follow for this article.

Taken from the SemVer summary, you'll increment:

- MAJOR on an incompatible API change
- MINOR when adding new functionality that's backwards compatible
- PATCH when making bug fixes that are backwards compatible

When I refer to major, minor, patch changes in this article, I'm using them as defined above.

## Dilemma 5: Fixed or independent versioning?

One choice that impacts how you version your components is choosing a _fixed_ or _independent_ versioning strategy.

### Fixed

All the packages across the monorepo share a version. If your checkbox component has a minor change and gets bumped to 1.2.0, then your alert component's package version would also get bumped to version 1.2.0. Great if:

- Your end-users will use multiple components in your library
- Your components rely closely on one another

### Independent

All the packages across the monorepo have independent versions. If your checkbox component has a minor change and gets bumped to 1.2.0, your alert component's version won't change. Great if:

- Your end-users will use a small handful of your components
- You can't predict the scenarios under which your components will be used. e.g. alpha or experimental components.

### Which to chose?

Mae Capozzi breaks down this tricky question into 4 more simple questions. These questions focus on how you expect your end users to consume your package. If you're unsure which strategy to use, then give [this 1-minute article](https://maecapozzi.com/version-bundling/) a read. The points I made earlier map directly to the points that Mae makes in their article.

In the case of oui-ui, I chose independent versioning for two reasons:

- I don't expect consumers to use too many of my components
- The packages are generally independent of one another and should be treated as such

Now you have more of an understanding of which strategy to use, we can go back to the question from earlier:

> If an internal dependency has a major version bump, will dependents also require a major version bump?

If you chose a fixed strategy, all your components ~~are belong to us~~ will bump to the same version.

If you chose an independent strategy, things are a bit more complicated. Any packages that depend on the internal package will require a version bump. The tricky part is determining what kind of version bump is appropriate. My gut reaction would be to do the following:

- Patch, if you make no public-facing changes.
- Minor, if all public-facing changes are non-breaking.
- Major, if any public-facing changes are breaking.

This is over-simplifies the problem brought up in Cassondra's [conversation](https://www.youtube.com/watch?v=fTlXWlZ28hc) but for now, it's enough.

## Dilemma 6: Which tool to manage your versioning and publishing?

If you decided to use Lerna, then you've got versioning and publishing capabilities out of the box.

- Running the `lerna version` script prompts you for a new version for every package that has changed.
- Running `lerna publish` publishes your new versions to the npm registry.

You're done!

If you didn't use Lerna, and opted for npm or Yarn workspaces instead, then you'll have to either roll your own publishing scripts (please don't) or pick another solution.

If you're a trailblazer like [the](https://github.com/ing-bank/lion) [cool](https://github.com/chakra-ui/chakra-ui) [repos](https://github.com/open-wc/open-wc) then you might like to try [Changesets](https://github.com/atlassian/changesets). Changesets focuses on the versioning/publishing problem space for monorepo development and handles things a little differently from Lerna.

Instead of declaring each package's versions when you're ready to version + publish, Changesets requires you to describe your changes in `changeset` files as you write your features.

Using your `changeset` files, Changesets can:

- work out the necessary versions for each package
- [handle internal dependency changes for a monorepo](https://github.com/atlassian/changesets/blob/main/docs/decisions.md#how-dependencies-are-bumped)
- update your changelog
- publish all updated packages

This shifts the responsibility of communicating the changes to those working on the features, instead of those publishing the package, who may have not worked on a single feature. What's more, these `changeset` files are stored in the filesystem, and not in git, which makes them:

- Easy to change
- Easy to track
- Easy for you to be as descriptive with your change descriptions as you like

When you publish your components, the descriptions within the `changeset` files are used to update your changelog.

If you've created a `changeset` for your package, running `changeset publish` will publish each package that has a package.json version higher than the one listed on npm. Your library's changelog will be updated using your `changeset`files.

## Wrapping Up

I mentioned that Changesets can handle internal dependency changes, so we can go back to our question from earlier:

> If an internal dependency has a major version bump, will dependents also require a major version bump?

With our chosen versioning strategy and a tool that handles internal dependency changes, this problem becomes trivial. It's still very important to consider problems like these throughout your library's life, even if you have a suite of awesome tools at your disposal.

## Next steps

Amazing job, your components are live and ready to be used! Maybe you'd like to start working on your next batch of features?

Adding features is one way of making your library more useful for your end-users, but it's no good if your changes aren't well communicated. Having good documentation is an important way of communicating your library's capabilities.

If you haven't gotten documentation set up, then don't worry. Like with every dilemma before thus far, there are [tools out there to help solve your problems](/007-creating-documentation-for-your-UI-library).
