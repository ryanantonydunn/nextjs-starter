# NextJS starter instructions

Creating starter writeup TODO:

-   ~~NextJS / TS~~
-   ~~Component structure~~
-   ~~Absolute paths~~
-   ~~Linting - ESLint / Stylelint / Prettier / Husky~~
-   CSS Modules / PostCSS / Global styles
-   React Testing Library
-   Storybook
-   MSW API Mocking

Stack:

-   Typescript
-   React
-   NextJS
-   CSS Modules
-   PostCSS + Nesting
-   Storybook
-   React Testing Library / Jest
-   MSW
-   ESLint / StyleLint / Prettier
-   Husky / Lint Staged

Components

-   atoms/form-fields/TextInput
-   atoms/form-fields/Select
-   atoms/Button / LinkButton
-   organisms/ApiExample

Considerations:

-   Use instructions to build project rather than starter, packages will be more up to date and bits of the stack can be left out as needed or wanted
-   All are optional including stack choices and linting settings
-   Folder structure is added but is only suggested

## Instructions to create from scratch

### 1. Set up new nextjs app with TypeScript

Run create next command with typescript argument in your projects directory: `npx create-next-app --ts`

This will set up the project with a standard `.tsconfig`, eslint and a basic config for that. All JS files should now be created as `.ts` or if it contains any JSX `.tsx` . If using VSCode, typescript is supported out-of-the-box but installing an ESLint extension is recommended to get linting error syntax highlighting while editing.

### 2. Set up a component structure

In this starter all styles, components and API code is inside an `src` folder in the root of the project. The folder structure looks like this:

```
- src
+-- styles (global styles available to all components)
  +-- globals.css
+-- components
  +-- atoms (small re-usable components)
    +-- button
      +-- index.tsx (the react component)
      +-- index.module.css (the css module for the component, co-located alongside the component)
      +-- index.test.tsx (the testing library test, also co-located)
      +-- index.stories.tsx (storybook stories, also co-located)
  +-- molecules (larger re-usable components that may contain atoms)
    +-- ... (same as in atoms)
  +-- organisms (large components that contain major pieces of functionality or content)
    +-- ... (same as in atoms)
  +-- layout (headers, footers, shared layout and anything used on every page)
+-- api (any data-layer code)
```

The actual nextjs pages are still in the root `pages` folder but generally will contain layout and organism components and not contain much logic or styling of their own.

There are a few components included in this starter with particularly tricky or useful type structures that I've found helpful. These can be used or replaced as needed.

There is no state management library included here or examples of React Context, but should easily be integrated into this structure also as needed.

### 3. Absolute paths

To use absolute paths in your imports add this to your `.tsconfig` in the `compilerOptions` object:

```
    "baseUrl": "./",
    "paths": {
      "pages/*": ["pages/*"],
      "src/*": ["src/*"],
    }
```

Now inside a component we can import like this:

```
import { Button } from 'src/components/atoms/button'
```

### 4. Set up PostCSS

PostCSS is included in Next by default. To use additional plugins you need to create a `custom postcss.config.js` file in the root of the project. To enable nesting you just need to set `"nesting-rules": true` in the feature object of `postcss-preset-env`.

In VSCode - at the time of writing it's slightly awkward to get proper nested syntax highlighting _without_ breaking the normal CSS intellisense. Use the `postcss-sugarss-language` extension and not the `PostCSS Language Support` extension and add this to the workspace settings:

```
"files.associations": { "*.css": "postcss" },
```

More information about styling in Next is [on the website](https://nextjs.org/docs/advanced-features/customizing-postcss-config)

#### Global styles and variables

I've set up a folder inside `./src/styles` to handle globals and variables here. To add the globals to the whole app just import the file directly into the custom `_app.tsx` inside `./pages`:

```
// ./pages/_app.tsx
import "src/styles/globals.css";
```

Variables are set in the `:root` element inside `globals.css` and are then available inside any module.

As far as I know, at the time of writing - there is _not_ a way to get any CSS variable autocomplete extension in vscode to work alongside the postcss syntax highlighting extension, you can have either one or the other. Any solution to this would be welcome.

### 5. Linting

The linting combination of packages here is this:

-   ESLint to check Javascript and Typescript
-   Prettier to automatically format JS code
-   Stylelint to check and format CSS
-   Husky / lint-staged to run all the checks and automatic fixes when git commits are made

More information on configuring this is on the [NextJS website](https://nextjs.org/docs/basic-features/eslint)

#### Set up ESLint

First install the required packages, or whichever packages you'll need for your config: `npm i -D eslint eslint-config-next eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser`

Create a `.eslintrc.js` file in the root of the project to configure. This can be changed to your preferences or needs for the project. This project has an example included that addresses some specific issues with NextJS and uses the typescript parser.

Set up a script to run the checks. We can also set up a specific one that will report any typescript errors. This is useful when setting up automatic linting to fail in a pipeline.

```
// package.json "scripts" object
"lint-js": "eslint '*/**/*.{js,jsx,ts,tsx}' --fix",
"lint-ts": "tsc -p tsconfig.json --noEmit",
```

#### Set up Stylelint

Install the package: `npm i -D stylelint` and add a `.stylelintrc.js` to the root of the project to configure. An example is included that is fairly relaxed but catches obvious errors like duplicate properties, etc. Finally, add a script to run the checks:

```
// package.json "scripts" object
"lint-css": "stylelint '*/**/*.{css}' --fix",
```

#### Set up Prettier

Install the package: `npm i -D prettier` and add a `.prettierrc` and `.prettierignore` to the root of the project to configure. Examples are included. Finally, add a script to run on the project:

```
// package.json "scripts" object
"format": "prettier '*/**/*.{js,jsx,ts,tsx,json,md}' --write",
```

#### Set up Husky

Full information about installing husky is on [the Github page](https://github.com/typicode/husky)

Install the packages `npm i -D husky lint-staged`

Then install the git hooks in the project: `npx husky install`.

Add a script to `package.json` to install the git hooks when the project dependencies are installed for other users: `"prepare": "husky install",`

When configuring the script that will run on commit there are several ways that work - Here I've set up a `lint-staged.config.js` file in the root of the project because running the `lint-ts` script above won't work unless it's inside a function syntax:

```
// ./lint-staged.config.js
module.exports = {
  '*.{js,jsx,ts,tsx,json,md}': 'prettier --write',
  '*.{js,jsx,ts,tsx}': 'eslint --fix',
  '*.{css}': 'stylelint --fix',
  '*.{ts,tsx}': () => 'tsc -p tsconfig.json --noEmit',
};
```

And to add this script to the pre-commit hook run this command:

```
npx husky add .husky/pre-commit "npx lint-staged"
```

Any commits should now be automatically linted and fail with an appropriate error when necessary.

### 7. React Testing Library

Full information about installing RTL with nextjs is on [the website](https://nextjs.org/docs/testing)

Install the packages: `npm i -D jest babel-jest @testing-library/react @testing-library/jest-dom identity-obj-proxy react-test-renderer`

Create a `jest.config.js` file in the root of the project. There is a standard one on the nextjs documentation or a complete customised one in this repo.

Create a `test` folder in the root of the project for test helpers to live.

####
