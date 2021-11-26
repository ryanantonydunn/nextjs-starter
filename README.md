# NextJS starter instructions

## TODO:

-   msw

This is a fresh next.js project including pre-set-up configurations for a particular stack. You may clone this repo outright and start a new project if you like, but it's suggested to follow the instructions in the readme to add pieces as needed for the following reasons:

-   The packages will be more up to date
-   Only what's needed for the project can be added as needed
-   You will have a better understanding of how the pieces work and why they've been added
-   Stack and organisation choices can be substituted for whatever you prefer

The stack and features covered here are:

-   Typescript - Static typing for Javascript
-   React / NextJS - The main library and framework to handle a lot of the heavy lifting
-   CSS Modules - Keeping styles scoped to their components
-   PostCSS + Nesting - Allowing for SASS-style nested CSS in modules
-   Storybook - A design-system-like framework for all UI components to be shown and tested
-   React Testing Library / Jest - Automated unit and integration tests
-   Mock Service Worker - Allowing for mocking fetch calls in our tests/storybook stories
-   ESLint / StyleLint / Prettier - Linting and automatic code-formatting
-   Husky / Lint Staged - Automatically running our linters and formatters when code is committed

Additionally there are suggested folder and naming structures included.

All decisions in the repo and readme are optional including stack choices, linting settings, folder structure and anything else. If you think something different is a better solution for your project, do it, I'm not your mum.

## Instructions to create from scratch

1. New nextjs app with TypeScript
2. Component structure
3. Absolute paths
4. PostCSS
5. Linting
6. React Testing Library
7. Storybook

### 1. Set up new nextjs app with TypeScript

Run create next command with typescript argument in your projects directory: `npx create-next-app --ts`

This will set up the project with a standard `.tsconfig`, eslint and a basic config for that. All JS files should now be created as `.ts` or if it contains any JSX `.tsx` . If using VSCode, typescript is supported out-of-the-box but installing an ESLint extension is recommended to get linting error syntax highlighting while editing.

### 2. Set up a component structure

In this starter all styles, components and API code is inside an `src` folder in the root of the project. Components live inside folders and are generally co-located with all related files (eg: tests, styles and storybook stories). The folder structure looks like this:

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
+-- pages
+-- api (any data-layer code)
```

There are a few components included in this starter with particularly tricky or useful type structures that I've found helpful. These can be used or replaced as needed.

There is no state management library included here or examples of React Context, but should easily be integrated into this structure also as needed.

#### Custom pages folder

In normal next.js projects, the `pages` folder lives inside the root of the project and all files correspond with a route based on the name. Here the pages folder is moved inside the src folder which is automatically supported by next if a pages folder is not found in the root of the project.

Also, I recommend following a similar structure to the other components and co-locating related files alongside the files. To make that work we can tell next.js to only make actual routes from pages with a `.page.tsx` extenstion by adding this to `next.config.js`:

```
pageExtensions: ['page.tsx'],
```

Note: when using this technique, any files that would also usually appear in a standard pages folder will need to have a set pageExtension. Eg: `_app.page.tsx`.

More information on this technique is on [the next custom-page-extensions page](https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions)

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

PostCSS is included in Next by default. To use additional plugins you need to create a custom `postcss.config.js` file in the root of the project. To enable nesting you just need to set `"nesting-rules": true` in the feature object of `postcss-preset-env`.

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

⚠️ As far as I know, at the time of writing - there is _not_ a way to get any CSS variable autocomplete extension in vscode to work alongside the postcss syntax highlighting extension, you can have either one or the other. Any solution to this would be welcome.

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

### 6. React Testing Library

Full information about installing RTL with nextjs is on [the website](https://nextjs.org/docs/testing)

And full information on RTL is on [the website](https://testing-library.com/docs/react-testing-library/intro) including using the API, setting up with custom renders, providers, etc.

For our basic installation, add the packages: `npm i -D jest babel-jest @testing-library/react @testing-library/jest-dom identity-obj-proxy react-test-renderer`

Create a `jest.config.js` file in the root of the project. There is a standard one on the nextjs documentation listed above that we will modify.

Add the following scripts to the package.json to run the tests or watch-run the tests (listen for changes to files that affect tests and re-run them whenever a change is made):

```
		"test": "jest",
		"test-watch": "jest --watch"
```

Create a `test` folder in the root of the project for test helpers to live.

#### Adding jest DOM

Jest DOM provides us with a lot of additional matchers and functions that are helpful in tests. More information can be found on [the jest dom repo](https://github.com/testing-library/jest-dom/).

To install it in this project we need to import the jest dom package before running every test. That works like this:

Add a `jest-setup.tsx` file to the `test` folder and put `import '@testing-library/jest-dom';` in it.

Add `setupFilesAfterEnv: ['<rootDir>/test/jest-setup.tsx']` to the jest config.

#### Absolute paths

To support the absolute paths we have in the `.tsconfig` file we need to add them to the `jest.config.js` as well like this:

```
module.exports = {
  ...
  moduleNameMapper: {
    'src/(._)': '<rootDir>/src/$1',
    'test/(._)': '<rootDir>/test/$1',
  },
}

```

#### Mocking file requests

Inside jest tests we want to only test functionality, so we can intercept file imports (images, fonts, etc) inside our modules and re-point the import to a file mock file. This is done with the `identity-obj-proxy` package like this:

1. Add a `file-mock.js` file to the `test` helper folder and add `module.exports = 'test-file-stub';` to it.
2. Add a `style-mock.js` file to the `test` helper folder and add `module.exports = {};` to it.
3. Modify the jest config moduleNameMapper object following properties to point to our mocks:

```
  '^.+\\.(css|sass|scss)$': '<rootDir>/test/style-mock.js',
  '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/test/file-mock.js',

```

#### Writing tests

Tests should be co-located alongside their corresponding component unless covering an integration of a larger piece of functionality. They follow the usual naming convention of `index.test.tsx`.

Testing strategy is roughly to cover user-behaviour rather than implementation. Using `data-testid` as a hook is preferred wherever possible. More information on testing strategy can be found in this [solid introduction by Kent C Dodds](https://kentcdodds.com/blog/write-tests).

There are some example tests included with the components in this repo.

### 7. Storybook

Storybook is a UI component explorer that we can use to manage and test our design system. Full information is on [the storybook website](https://storybook.js.org/).

To set up run `npx sb init --builder webpack5` and run `npm run storybook` to see the basic setup with examples.

When creating stories here, I recommend co-locating the story alongside the component eg: `src/components/atoms/button/index.stories.tsx` and not using the standard `src/stories` folder. Optionally you can remove this folder if you don't want the examples cluttering it up. To support that the `stories` path matcher in `./.storybook/main.js` needs to be updated, eg: `'../src/**/*.stories.tsx',`.

To import the global styles into all stories add this line: `import '../src/styles/globals.css';` to the top of `./.storybook/preview.js`.

#### Next images

To support the nextjs image component within stories we just need to add this to the `./.storybook/preview.js` file:

```
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
```

#### Decorators

If you have providers around your app, eg: React Context or Redux then these can be added around every story by exporting the `decorators` variable from `./.storybook/preview.js` like this:

```
export const decorators = [
  (Story) => (
    <MemoryRouterProvider>
      <StoreProvider>
        <Story />
      </StoreProvider>
    </MemoryRouterProvider>
  ),
];
```

#### PostCSS

To support PostCSS here a custom webpack config rule loading CSS files is required. So we need to install the loaders: `npm i -D css-loader style-loader postcss-loader`.

Then in the `./.storybook/main.js` file, add `const path = require('path');` to the top and this to the exports:

```
	webpackFinal: async (config, { configType }) => {
		// remove the existing css rule
		config.module.rules = config.module.rules.filter(
			(f) => f.test.toString() !== '/\\.css$/',
		);

		// add loader for css modules
		config.module.rules.push({
			test: /\.css$/,
			include: path.resolve(__dirname, '../src'),
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						modules: true,
					},
				},
				'postcss-loader',
			],
		});

		// return the altered config
		return config;
	},
```

#### SASS

To support PostCSS here a custom webpack config rule loading CSS files is required. So we need to install the loaders: `npm i -D css-loader style-loader sass-loader`.

Then in the `./.storybook/main.js` file, add `const path = require('path');` to the top and this to the exports:

```
  webpackFinal: async (config, { configType }) => {
    // add loader for scss modules
    config.module.rules.push({
      test: /\.module\.scss$/,
      include: path.resolve(__dirname, '../src/components'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: false,
            additionalData: `@import "${path.resolve(
              __dirname,
              '../src/styles/_variables.scss',
            )}";`,
          },
        },
      ],
    });

    // Return the altered config
    return config;
  },
```

Usually when building with SASS a single stylesheet is built and shared variables and mixins, etc are imported at the beginning of the compile process. Here each story is compiled separately so you need to import all of those files to each story individually. The `additionalData` option in the sass loader above is doing that for a simple `_variables.scss` file. This can be duplicated and modified for any additional files in your project (eg: a `_mixins.scss`).

Importing globals with SASS into the top of `preview.js` will also require setting the loaders manually in the import like this: `import '!style-loader!css-loader!sass-loader!../src/styles/globals.scss';`.
