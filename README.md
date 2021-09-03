# NextJS starter instructions

Creating starter writeup TODO:

- ~~NextJS / TS~~
- ~~Component structure~~
- ~~Absolute paths~~
- ~~SASS / Modules / Global styles~~
- Linting - ESLint / Stylelint / Prettier / Husky
- React Testing Library
- Storybook
- MSW API Mocking

Stack:

- Typescript
- React
- NextJS
- CSS Modules / SASS
- Storybook
- React Testing Library / Jest
- MSW
- ESLint / StyleLint / Prettier
- Husky / Lint Staged

Components

- atoms/form-fields/TextInput
- atoms/form-fields/Select
- atoms/Button / LinkButton
- organisms/ApiExample

Considerations:

- Use instructions to build project rather than starter, packages will be more up to date and bits of the stack can be left out as needed or wanted
- All are optional including stack choices and linting settings
- Folder structure is added but is only suggested

## Instructions to create from scratch

### 1. Set up new nextjs app with TypeScript

Run create next command with typescript argument in your projects directory: `npx create-next-app --ts`

This will set up the project with a standard `.tsconfig`, eslint and a basic config for that. All JS files should now be created as `.ts` or if it contains any JSX `.tsx` . If using VSCode, typescript is supported out-of-the-box but installing an ESLint extension is recommended to get linting error syntax highlighting while editing.

### 2. Set up a component structure

In this starter all styles, components and API code is inside an `src` folder in the root of the project. The folder structure looks like this:

```
- src
+-- styles (global styles available to all components)
  +-- _variables.scss
  +-- globals.scss
+-- components
  +-- atoms (small re-usable components)
    +-- button
      +-- index.tsx (the react component)
      +-- index.module.scss (the css module for the component, co-located alongside the component)
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

### 4. Set up SASS

Install sass into the project: `npm i -S sass`

Now where there are `.module.css` files we can change to `.module.scss` files and use SASS as needed. To organise I recommend co-locating CSS modules alongside the component files in the `src folder structure like this:

```
// folder structure
- index.tsx
- index.module.scss

// inside index.tsx
import { styles } from './index.module.scss'

```

#### Global styles and variables/mixins

I've set up a folder inside `./src/styles` to handle globals and variables here. To add the globals to the whole app just import the file directly into the custom `_app.tsx` inside `./pages`:

```
// ./pages/_app.tsx
import "src/styles/globals.css";
```

Normally to add sass variables to every scss module you would need to prepend it to each module individually. We can do that automatically by editing the `./next.config.js` with this:

```
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import "variables";`,
  },
};
```

This will also work for any additional scss files in the root, eg: `_mixins.scss` and `@import "variables"; @import "mixins";`.

### 6. Linting

The linting combination of packages here is this:

- ESLint to check Javascript and Typescript
- Prettier to automatically format JS code
- Stylelint to check and format CSS
- Husky / lint-staged to run all the checks and automatic fixes when git commits are made

More information on configuring this is on the (NextJS website)[https://nextjs.org/docs/basic-features/eslint]

#### Set up ESLint

First install the required packages, or whichever packages you'll need for your config: `npm i -D eslint eslint-config-next eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser`

Create a `.eslintrc.js` file in the root of the project to configure. This can be changed to your preferences or needs for the project. This project has an example included that addresses some specific issues with NextJS and uses the typescript parser.

And add a script to run the checks:

```
// package.json "scripts" object
"lint-js": "eslint '*/**/*.{js,jsx,ts,tsx}' --fix"
```

#### Set up Stylelint

Install the package: `npm i -D stylelint` and add a `.stylelintrc.js` to the root of the project to configure. An example I prefer is included that is fairly relaxed but catches obvious errors like duplicate properties, etc. Finally, add a script to run the checks:

```
// package.json "scripts" object
"lint-css": "stylelint '*/**/*.{css,scss}' --fix",
```

#### Set up Prettier

- create .prettierrc
- create .prettierignore
- package.json script: "format": "prettier '_/\*\*/_.{js,jsx,ts,tsx,json,md}' --write",
- npm i -D prettier
