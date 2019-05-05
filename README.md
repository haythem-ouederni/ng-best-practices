This project is aimed to be the support example of a [tutorial](https://github.com/haythem-ouederni/ng-best-practices/issues/1) walking you through best practices of front-end development (web/mobile) with a concrete example based on an [Angular](https://angular.io/) project.

To see **tutorial** come as soon as possible you can [vote here](https://github.com/haythem-ouederni/ng-best-practices/issues/1).

# Introduction

This project is the result of my experience working on helping startups and more traditional industries (in finance and aerospatial) defining and developing their front-end projects (web and mobule).

I have noticed, that every time, one of the most difficult parts when launching a product is defining the best practices and finding the best tools to put in place the development workflow.

So I have decided to create this project, to be a concentrate of best practices ready to use out of the box and that may save developers and spetially tech-leads/technical-architects days and even months of hard work to find and define the best workflow for their projects.

This project/tutorial main focus is development best practices. So, for the beginning, it won't include any material related to [Continuous Integration](https://fr.atlassian.com/continuous-delivery/continuous-integration) or application deployment.

**Notice 1:** Many of the best practices present in this project are, as mentioned before, general to front-end development and even to development in general (not only front-end), so even if you are not using Angular in your project you can walk through it to get some interesting ideas.

**Notice 2:** You can see the content of different project commits to have an idea of the evolution of the project and the steps to add/include a specific tool, library or pattern to the project.

# Angular Best Practices Example project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.1.

For this project I mainly use [Yarn](https://yarnpkg.com). But you can run the same scripts/commands using [npm](https://www.npmjs.com/).

For example to start the project using `yarn` you run `yarn start`. To do the same thing using `npm` you can run `npm run start`.

## Before you start: Prerequisites

To be able to launch this project you need to install:

- [Node.js](https://nodejs.org) (mandatory)
- [npm](https://www.npmjs.com/): it can be installed with NodeJs (mandatory)
- [yarn](https://yarnpkg.com): if you want to use is instead of `npm` to run different scripts. (optional)
- the IDE or Code editor of you choice. I can suggest you the use of [VS Code](https://code.visualstudio.com/) which is Free and very practical for front-end development and comes with many helpful plugins. You may also want to use [WebStorm](https://www.jetbrains.com/webstorm/) which is **not free**. At the same time you have a free 30-day trial to test it. There is an other option which is [Atom](https://atom.io/). So it is up to you to choose which tool suits you most.

Before being able to start the project, you have to install the different dependencies/libraries. To do so run:

```` script
# if npm
npm install

# if yarn
yarn
````

## Optional tools

Here is a list of optional tools you may need in general for your projects' development:

- [git](https://git-scm.com/): for source control and be able to share code with other co-workers or just store your code and have access to the history of your project evolution
- [SourceTree](https://www.sourcetreeapp.com/): a very user friendly and visual tool to handle your source control

## Git Branches

The main branch where you can find the latest working and tested code is the [master](https://github.com/haythem-ouederni/ng-best-practices).

You can follow the day to day commits and development on the [develop](https://github.com/haythem-ouederni/ng-best-practices/tree/develop) branch.

A tagging system will come along different upgrades and releases of the project.

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Actually, a default [angular-cli](https://cli.angular.io/) generated project uses [Karma](https://karma-runner.github.io/latest/index.html) tool for unit testing. The problem with Karma (it can be an advantage in some cases), is that it needs to launch a browser to run a test which in many cases is not necessary and at the same time extends the test execution time. In addition, you may have Continuous Integration integrated to you development/delivery process that runs on an environment where you can have a browser.

There is an interesting alternative to `Karma` which is [Jest](https://jestjs.io/). It makes it faster and easier to write tests. No browser is needed. It comes with built-in mocking and assertion abilities. In addition, Jest runs your tests concurrently in parallel, providing a smoother, faster test run.

[jest-preset-angular](https://github.com/thymikee/jest-preset-angular) : Used to make the jest configuration easier. The actual used version is 6.0.2, so documentation and the configuration will be different for the futur versions of this library.


Run `yarn test:all` to execute the unit tests via Jest on the whole project.

If you want to run unit tests in a specific project like the `connection` project run `yarn test:connection`. Don't forget to add the needed script to your `package.json` file in addiion to the matching jest configuration file to be able to launch test on a new library. You can take the example of how it is done for the `connection` library.

You can also launch you tests and watch for changes by running for exmaple `yarn test:all:watch`.

**VS Code and Jest debug:** If you use [VS Code](https://code.visualstudio.com/), you can debug your Jest based unit tests by adding a `launch.json` file under your `.vscode` folder (you can find an example file in the actual repo). The debugger will use the built-in Node debugger. A more complete documentation can be fond [here](https://github.com/Microsoft/vscode-recipes/tree/master/debugging-jest-tests). 

## Running end-to-end tests

Run `yarn e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Imports

If we want to import a component from `connection` library we can use the `@connection` annotation.

Example : `import { ConnectionModule } from '@connection'`;

This is possible thanks to the adding of the `paths` attribute to the `tsconfig.json` file.

```` json
"compilerOptions": {
    ...,
    "paths": {
      "@connection": [
        "projects/connection/src/public_api"
      ],
      ...
    },
    ...
}
````

If we want to get more specific about the path (for example in case of a circular dependancy), we can add an other path to the `tsconfig.json` file like follow :

```` json
"compilerOptions": {
    ...,
    "paths": {
      "@connection": [
        "projects/connection/src/public_api"
      ],
      "@connection/*": [
        "projects/connection/src/*"
      ]
      ...
    },
    ...
}
````

It will allow as to import components or other angular exported functionalities like the following example :

Example : `import { ConnectionComponent } from '@connection/lib/modules/main/pages';`;

## Git

To make sure that developers follow a precise worklow while commiting and pushing the code, so that you don't have to do verfications and run scripts manually, the following tools are very useful : 

* [cz-cli](https://github.com/commitizen/cz-cli): When you commit with Commitizen, you'll be prompted to fill out any required commit fields at commit time

In `package.json` you add :

```` json
"scripts" {
  "commit": "git-cz",
  ...
}
````

So when you run `yarn commit` the `cz-cli` is used. So no more direct `git commit`.

*  [cz-customizable](https://github.com/leonardoanalista/cz-customizable): The customizable Commitizen plugin to help achieve consistent commit messages like the AngularJS team. It comes to complete the `cz-cli` plugin.

In `package.json` you add :

```` json
"config": {
  "commitizen": {
    "path": "node_modules/cz-customizable"
  },
  "cz-customizable": {
    "config": "path/to/custom/cz-config.js"
  }
},
...
````

If you don't give any custom file in the configuration (`config.cz-customizable.config`), the `.cz-config.js` file present at the root of the project will be used.

**Note:** To be able to use [VS Code](https://code.visualstudio.com/) to edit git commit comments or other file manipulation tasks instead of default `vim` you can run `git config --global core.editor "code --wait"` at the condiction that VS Code is available from commande line (you can check it by running `code --help`).

More information [here](https://stackoverflow.com/questions/30024353/how-to-use-visual-studio-code-as-default-editor-for-git).

* [husky](https://github.com/typicode/husky): to easily edit git hooks

Add the `husky` configuration at the root of the `package.json` file :

```` json
"husky": {
  "hooks": {
    "pre-commit": "yarn lintstaged",
    "prepush": "yarn prod"
  }
}
````

If you want to skip the hools just add the `--no-verify` flag to your git command. Example: `git push --no-verify`

* [commitlint/cli](https://github.com/conventional-changelog/commitlint): As its name incdicates, this tool gives you the possibility to add an other check on the commit messages and if the meet the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) or the conventions you have defined yourself.

So to the already defined `husky` hooks configuration, you can add the `commit-msg` hook :

```` json
"husky": {
  "hooks": {
    ...,
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
````

`commit-msg` hook allows you to lint commits before they are created.

You can add a `commitlint.config.js` file at the root of the project, to define linting rules/conventions.

`commitlint.config.js` example:

```` javascript
module.exports = {
  // we use the default @commitlint/config-conventional rules.
  // you have to install @commitlint/config-conventional library to be able to use it.
  extends: ['@commitlint/config-conventional'],
  // Any rules defined here will override rules from @commitlint/config-conventional
  // => custom rules
  rules: {
    'header-max-length': [2, 'always', 100],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],
    ...
  }
};
````

**Note:** If you want to retry a commit so that you don't have to re-enter the same information again just run `yarn commit:retry`.

## Routing

The angular's [RouterModule](https://angular.io/api/router/RouterModule) was used. The [angular's documentation](https://angular.io/tutorial/toh-pt5) is very complete and I advise you to take a look at it.

In this project, I have made the choice that for the `app` (standalone) project(s), I use the direct routing/loading. In the other hand, for the main app (root app) the module are lazy loaded and it affects the way the routing works.

To see how how, the lzay loading is dealt with you can take a look at the `src/app/lazy` directory where the lazy loaded modules are defined. Then these modules are "really" lazy loaded within the `src/app/app-routing.module.ts` file. For each lazy loaded module, a path is defined. This path must preceed all the paths defined in the original module.

Exemple: Suppose that in your orignal module you access the `page-one` content via the url `localhost:4200/page-one` when you direct load it (like in the app/standalone project). At the same time, the path you have defined to lazy load the same module is `my-lazy-loaded-path`. So to access the same content/page, you should use the url `localhost:4200/my-lazy-loaded-path/page-one` instead.

And here to make my module work while lazy loaded or direct loaded, a combination of `forRoot` method over the loaded module and environment variables is used.

## Reactive forms

When it comes to manipulating forms, in angular you have the choice between [Reactive forms](https://angular.io/guide/reactive-forms) and [Template-driven forms](https://angular.io/guide/forms).

In the official [Angular documentation](https://angular.io/guide/forms-overview) you can find:
- Reactive forms are more robust: they're more scalable, reusable, and testable. If forms are a key part of your application, or you're already using reactive patterns for building your application, use reactive forms.

- Template-driven forms are useful for adding a simple form to an app, such as an email list signup form. They're easy to add to an app, but they don't scale as well as reactive forms. If you have very basic form requirements and logic that can be managed solely in the template, use template-driven forms.

You can find a table of key differences [here](https://angular.io/guide/forms-overview#key-differences).

For this project, I have chosen to use [Reactive forms](https://angular.io/guide/reactive-forms) for all the advantages it comes with like having a strcutered data model or taking advantage of synchronicity between your template (view/html) and you controller (component class/model). Besides, generally, in big projects you may have complex forms and the `reactive forms` makes the task build them easier for you.

## Styling: Bootstrap
When you launch your project you can base it first on an already existing styling library. It helps you save time when styling your application. 

Here are some examples of libraries you can use :
* [Bootstrap](https://getbootstrap.com/): it is not specific to Angular. You can use whatever framework you use. And to make using it easier in Angular projects you may use [ng-bootstrap](https://ng-bootstrap.github.io/#/home) library.
* [Angular Material](https://material.angular.io/): Angular specific. Gives acces to material deisgn components for Angular.
* [Zurb Foundation](https://foundation.zurb.com/): examples of Foundation components for sites [here](https://foundation.zurb.com/sites/docs/kitchen-sink.html).
* [Material](https://material.io/develop/web/components/animation/).

Actually, for this project it is `bootstrap` which was used (not `ng-boostrap`).

## NGXS and Facade pattern

### NGXS

Most libraries like React, Angular, etc. are built with a way for components to internally manage their state without any need for an external library or tool. It does well for applications with few components but as the application grows bigger, managing states shared across components becomes a chore.

In an app where data is shared among components, it might be confusing to actually know where a state should live. Ideally, the data in a component should live in just one component. So sharing data among sibling components becomes difficult ([source](https://blog.logrocket.com/why-use-redux-reasons-with-clear-examples-d21bffd5835)).

The way a state management library works is simple. There is a central store that holds the entire state of the application. Each component can access the stored state without having to send down props from one component to another.

For example, for [React](https://reactjs.org/) one of the most used state management libraries is [Redux](https://redux.js.org/). And the use of the [react-redux](https://github.com/reduxjs/react-redux) package makes it easier. For sure, you have other state management libraries for `react` like [facebook's flux](https://github.com/facebook/flux). So choose what suits you most knwoing that `redux` is more used that `flux` because it is not centred on `react` and can be used with any other view library.

For `angular` you have many options for state management like:
* [NGXS](https://github.com/ngxs/store): NGXS is a state management pattern + library for Angular. It acts as a single source of truth for your application's state, providing simple rules for predictable state mutations.
* [NGRX](https://ngrx.io/): Store is RxJS powered state management for Angular applications, inspired by Redux. Store is a controlled state container designed to help write performant, consistent applications on top of Angular.
* [datorama/akita](https://github.com/datorama/akita): Akita is a state management pattern, built on top of RxJS, which takes the idea of multiple data stores from Flux and the immutable updates from Redux, along with the concept of streaming data, to create the Observable Data Store model.

For `Angular`, after studying the different options, I find that `ngxs` is the best option. It is written for `Angular` at the first place so it is implemented following the Angular's code style and takes andvantage of the `Dependency Injection` provided by `Angular`. In addition, it is less verbose then other libraries. For these reasons we have made the choice to use it in many companies I worked with. **[You can find here](https://medium.com/@amcdnl/why-another-state-management-framework-for-angular-b4b4c19ef664)** of a complete explanation of why to use `ngxs`.

Used `ngxs` plugins for this repo: 
* [Logger](https://ngxs.gitbook.io/ngxs/plugins/logger): A simple console log plugin to log actions as they are processed.
* [Devtools](https://ngxs.gitbook.io/ngxs/plugins/devtools): Plugin with integration with the [Redux Devtools extension](http://extension.remotedev.io/).
* [Router](https://ngxs.gitbook.io/ngxs/plugins/router): To help you handle navigation.
  
### Facade pattern

The facade pattern is a [software-design pattern](https://en.wikipedia.org/wiki/Software_design_pattern) commonly used in [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming). Analogous to a [facade](https://en.wikipedia.org/wiki/Facade) in architecture, a facade is an object that serves as a front-facing interface masking more complex underlying or structural code. A facade can:

* improve the readability and usability of a software library by masking interaction with more complex components behind a single (and often simplified) API;
* provide a context-specific interface to more generic functionality (complete with context-specific input validation);
* serve as a launching point for a broader refactor of monolithic or tightly-coupled systems in favor of more loosely-coupled code.

While this seems like a rather trivial change (and an extra layer), the Facade has a huge positive impact of developer productivity and yields significantly less complexity in the view layers ([source](https://medium.com/ngxs/ngxs-facade-3aa90c41497b)).

An other advantage is that it makes your controllers (Angular components for example), independant from the state management library you have chosen to use.

## Internationalization

For the internationalization you have two options:

1 - Use the Angular's [i18n](https://angular.io/guide/i18n) system

2 - Use [ngx-translate](http://www.ngx-translate.com/) library.

I won't go into details, but the choice for this project and many other production like projects was to use `ngx-translate`. The main reasons are that, for the same result, it is simpler to use and develop with and `Angular i18n` forces you to build the application per language and it reloads the application on language change.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## VS Code plugins

If you are using [VS Code](https://code.visualstudio.com/) you may find the following plugins very helpful:

* [ts-barrelr](https://marketplace.visualstudio.com/items?itemName=mikerhyssmith.ts-barrelr): automates the production of index.ts barrel files.
* [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner): Simple way to run or debug a single or multiple Jest-Tests from context menu. As it is possible in IntelliJ / Webstorm
* [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin): Adds tslint to VS Code using the TypeScript TSLint language service plugin.
* [TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter): Automatically searches for TypeScript definitions in workspace files and provides all known symbols as completion item to allow code completion.


## License
Copyright by @haythem-ouederni. All project sources are released under the [Apache License](https://github.com/haythem-ouederni/ng-best-practices/blob/master/LICENSE) license.