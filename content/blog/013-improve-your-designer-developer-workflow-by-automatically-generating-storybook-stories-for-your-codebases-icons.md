---
title: "Improve your designer/developer workflow by automatically generating Storybook stories for your codebase’s icons."
date: "2022-06-14T19:20:00.000Z"
description: "Improve your relationship with your designers by automating your Storybook admin. We'll run through how to automatically catalog all the icons used in your frontend codebase."
featured: images/scrapbook-by-rirri.jpg
---

## Introduction

Over the last few months, we’ve been pushing hard to improve our designer/developer workflow at HealthHero. We’ve found that cataloging components using a tool like Storybook helps bridge that designer/developer gap.

For the most part, it’s easy to keep Storybook in sync with our components, since we’re creating stories with the same components we’re using throughout our codebase. Unfortunately, some components aren’t easy to keep in sync, in our case it’s icons. It’s important for our codebase to be in sync with our design system, and cataloging the icons makes our designers’ jobs a smidge easier.

We use Material UI for our icon library, and we pull in dozens of different icons. We add new icons, remove unused ones, or swap icons around. This means that the icons we're using are always changing. It's unrealistic to expect our developers to remember to update our Storybook on every small change, and as far as I know, there’s no way to automatically track the exports used for a given package. (If there is, then please let me know via [Tweet](https://twitter.com/andricokaroulla)). Fortunately, we can use our development expertise to hack a little script that automatically catalogs our icons.

This is such a script in action:

<video controls style="width:100%;">
  <source src="./images/icons-demo.mp4" type="video/mp4" />
</video>

In this article, we’ll cover:

- Reading/writing to the file system
- Transpiling our TypeScript code into an Abstract Syntax Tree (AST)
- Traversing the AST using the visitor pattern.

Some of those things might sound super complicated, but don’t fret, I hope that stepping through the code will make them easier to digest.

You can also skip to the end if you’re interested in just seeing the finished code.

Note: Because our codebase uses TypeScript, we’ll be using the TypeScript helpers to transpile our code to an AST. If you’re using vanilla JavaScript, then Acorn or Babel may offer similar results.

## Creating the script

The script will be roughly 60 lines of code, and the functionality can be broken up into 6 parts:

1. Read the contents of all the files in our `src` directory.
2. Transpile the contents into an AST
3. Traverse the AST
4. Visit all the `ImportDeclaration` nodes with a function that builds a list of imported icons
5. Deduplicate the icons
6. Write the results to the file system

### Step 1

To get a list of files in our codebase, we’ll use the `glob` package. The path I’m passing through matches against any ts/tsx file contained within our `components` directory, as this is where all of our UI logic lives. You may need to sub it out for a different path depending on your codebase.

We then iterate over the list of paths and read the contents of the file using `fs.readFile`, which we’ve imported from the `node:fs/promises` package.

Using `Promise.all(promises)`, we’ll block the rest of our application from running until all of the logic in our `paths.map` has been completed.

```jsx
import glob from "glob"
import fs from "node:fs/promises"

const paths = glob.sync("./src/components/**/*.+(ts|tsx)")

const promises = await paths.map(async path => {
  const contents = await fs.readFile(path, {
    encoding: "utf-8",
  })

  // This is where steps 2-4 will live
})

await Promise.all(promises)

// This is where steps 5-6 will live
```

Note: I’m using top-level `await` in this code, so if you run into problems you may be on an older version of node. Your script needs to be a module `.mjs`, or `type: "module"` has been set in your package.json file. If you’d like to learn more, then [Stefan Judis’s article](https://www.stefanjudis.com/today-i-learned/top-level-await-is-available-in-node-js-modules/) is an excellent resource.

### Step 2

We’ll import `typescript`, which allows us to use the built-in TypeScript helper functions. We’ll turn the contents of our file into an AST using `ts.createSourceFile`. You can pass through any name as the first argument.

Note: I caught this handy tip from James Milner’s wonderful [post on handling TypeScript ASTs](https://www.jameslmilner.com/post/ts-ast-and-ts-morph-intro/). If you’d like to dig a little more into TypeScript ASTs, then that article is a great place to start.

```jsx
import ts from "typescript"

// Other

const promises = await paths.map(async path => {
  const contents = await fs.readFile(path, {
    encoding: "utf-8",
  })

  const sourceFile = ts.createSourceFile("temp.ts", contents)

  // This is where steps 3-4 will live
})

// Other
```

### Step 3

The next step is to add a traversal function that walks our TypeScript AST.

Every time we enter a node, we check to see its type. If the type is `ImportDeclaration` then we’ll fire the callback function we’ll define in step 4.

After the if statement, we’ll use another TypeScript helper function to continue traversing our tree, `ts.forEachChild`. This function takes the current node, and then invokes the callback function (the second argument) for every child node.

Since we want to keep running our `tsASTTraverser` function, we’ll pass that as our callback function.

Note: If you’d like to learn a little more about ASTs, then I’d love to point you toward my [3-part article series](https://backlight.dev/blog/best-practices-w-eslint-part-1) that’ll teach you JavaScript AST fundamentals through creating ESLint rules.

```jsx
// Other code

function tsASTTraverser(node, visitorFunctions) {
  if (ts.SyntaxKind[node.kind] === "ImportDeclaration") {
    visitorFunctions["ImportDeclaration"](node)
  }

  ts.forEachChild(node, newNode => tsASTTraverser(newNode, visitorFunctions))
}

const promises = await paths.map(async path => {
  const contents = await fs.readFile(path, {
    encoding: "utf-8",
  })

  const sourceFile = ts.createSourceFile("temp.ts", contents)

  tsASTTraverser(sourceFile, {
    // This is where steps 4 will live
  })
})

// Other code
```

### Step 4

As we saw in step 3, we can invoke our visitor function when the traversal function reaches a specific node. In our case, it’s the `ImportDeclaration` node. This node has all the information we need to access the import statement from the source file itself. We do just that by getting the start and end position of the import statement and storing that slice of our source code.

At this point, the value in `importStatement` could be any import statement, like a 3rd party package, an adjacent file, or (more desirably) our Material UI icons import.

The next step is to determine if the value in `importStatement` is a Material UI icons import using the following regex `new RegExp(/@mui\/icons-material/)`. If the regex pattern finds a match, we can get the name of the icon and build the code that we’ll be writing to the file system. If it doesn’t, we’ll do nothing

```jsx
// Imports

const muiRegex = new RegExp(/@mui\/icons-material/)
const imports = []

// Other code

const promises = await paths.map(async path => {
  const contents = await fs.readFile(path, {
    encoding: "utf-8",
  })

  const sourceFile = ts.createSourceFile("temp.ts", contents)

  tsASTTraverser(sourceFile, {
    ImportDeclaration: node => {
      const start = node.pos
      const end = node.end

      const importStatement = contents.slice(start, end)

      if (muiRegex.test(importStatement)) {
        const text = node.moduleSpecifier.text
        const lastIndexOfSlash = text.lastIndexOf("/")
        const iconName = text.slice(lastIndexOfSlash + 1)

        const content = `export { default as ${iconName} } from "${text}";`

        imports.push(content)
      }
    },
  })
})

// Other code
```

### Step 5

Once we’ve finished traversing the AST, we’ll have built a list of Material UI icon imports that live in the `imports` array. Before we go ahead and write it to our file system, we’ll have to do a little cleaning.

- We’ll deduplicate icons using the `Set` data structure.
- We’ll sort our exports alphabetically
- We’ll join the items in our array with a new line separator.

Once that’s down, it’s ready to write to our file system.

```jsx
// Other code

const iconExports = [...new Set(imports)].sort().join("\n")
```

For those unfamiliar, `Set` is an iterable data structure whose values are unique. To deduplicate our icon imports, we create a `Set` of our imports, and then immediately convert it back to an array.

### Step 6

As a courtesy to our fellow devs, (and our future selves), let’s add a little comment to indicate that the file we’re about to write is a generated file. We append our `iconExports` code and then write the file to our filesystem.

```jsx
// Other code

const fileContents = `/* 
  Do not edit this file. This file is automatically generated using findImports.mjs
*/

${iconExports}
`

const storiesPath = "./src/stories/assets/icons.ts"

await fs.writeFile(storiesPath, fileContents)
```

Our generated file will look a little something like this:

```jsx
/* 
  Do not edit this file. This file is automatically generated using findImports.mjs
*/

export { default as AccessTime } from "@mui/icons-material/AccessTime"
export { default as Add } from "@mui/icons-material/Add"
export { default as AddCircleOutline } from "@mui/icons-material/AddCircleOutline"
// The rest of the icons
```

### Writing our story

If we want to see our handy script in action, we’ll need to create a story that consumes our icon list. I won’t run through the specifics, as I’ll assume that you’re somewhat familiar with Storybook. In short, we’ll map over the exported icons and generate a little JSX for them.

```jsx
import React from "react";
import * as icons from "./assets/icons";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Typography, SvgIcon } from "@mui/material";
import { Box } from "@mui/system";

const Template: ComponentStory<typeof SvgIcon> = args => {
  return (
    <Box>
      {Object.entries(icons).map(([name, Icon]) => {
        return (
          <div key={name}>
            <Icon sx={{ width: "24px" }} {...args}></Icon>
            <Typography>{name}</Typography>
          </div>
        );
      })}
    </Box>
  );
};

export const Icons = Template.bind({});

Icons.args = {
  color: "primary",
};

export default {
  title: "EDS/Styles/Icons",
} as ComponentMeta<typeof SvgIcon>;
```

## The finished script

And here's our finished product:

```jsx
import ts from "typescript"
import fs from "node:fs/promises"
import glob from "glob"

/**
 * This file automatically generates a list of icons we use throughout ED3
 *
 * It writes to a file which is then used by Storybook to generate the icons
 *
 * The most notable thing about this file is that we use Typescript's built-in tooling
 * to generate an AST of our TS files, which we then traverse to visit all of the ImportDeclaration nodes.
 * The ImportDeclaration node contains the information we need to generate the list of icons
 */

const paths = glob.sync("./src/components/**/*.+(ts|tsx)")
const muiRegex = new RegExp(/@mui\/icons-material/)

const imports = []

function tsASTTraverser(node, visitorFunctions) {
  if (ts.SyntaxKind[node.kind] === "ImportDeclaration") {
    visitorFunctions["ImportDeclaration"](node)
  }

  ts.forEachChild(node, newNode => tsASTTraverser(newNode, visitorFunctions))
}

const promises = await paths.map(async path => {
  const contents = await fs.readFile(path, {
    encoding: "utf-8",
  })

  const sourceFile = ts.createSourceFile("temp.ts", contents)

  tsASTTraverser(sourceFile, {
    ImportDeclaration: node => {
      const start = node.pos
      const end = node.end
      const importStatement = contents.slice(start, end)

      if (muiRegex.test(importStatement)) {
        const text = node.moduleSpecifier.text
        const lastIndexOfSlash = text.lastIndexOf("/")
        const iconName = text.slice(lastIndexOfSlash + 1)

        const content = `export { default as ${iconName} } from "${text}";`

        imports.push(content)
      }
    },
  })
})

await Promise.all(promises)

const iconExports = [...new Set(imports)].sort().join("\n")
const fileContents = `/* 
  Do not edit this file. This file is automatically generated using findImports.mjs
*/

${iconExports}
`

const storiesPath = "./src/stories/assets/icons.ts"

await fs.writeFile(storiesPath, fileContents)
```

We hope that little tools and improvements like this make it easier for us to close that designer/developer gap. Also, scripts like this are just plain fun to write, since we're dabbling with concepts we (or at least I) don't get to play with on a daily basis.

If you’re interested in learning a little more about this gap, Sara Cagle has [an excellent practical guide](https://uxdesign.cc/bridging-the-gap-between-designers-engineers-a-how-to-guide-for-designers-616ad6212d21) on the subject.

If you’ve noticed any mistakes in the code or would like to leave a comment or feedback, please reach out to me on [Twitter](https://twitter.com/andricokaroulla).

Thanks for taking the time to read this article and I hope it’s been helpful for you!
