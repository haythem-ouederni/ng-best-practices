# AngularBestPracticesExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.1.

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

In this project, I have made the choice that for the `standalone` project(s), I use the direct routing/loading. In the other hand, for the main app (root app) the module are lazy loaded and it affects the way the routing works.

To see how how, the lzay loading is dealt with you can take a look at the `src/app/lazy` directory where the lazy loaded modules are defined. Then these modules are "really" lazy loaded within the `src/app/app-routing.module.ts` file. For each lazy loaded module, a path is defined. This path must preceed all the paths defined in the original module.

Exemple: Suppose that in your orignal module you access the `page-one` content via the url `localhost:4200/page-one` when you direct load it (like in the standalone project). At the same time, the path you have defined to lazy load the same module is `my-lazy-loaded-path`. So to access the same content/page, you should use the url `localhost:4200/my-lazy-loaded-path/page-one` instead.

And here to make my module work while lazy loaded or direct loaded, a combination of `forRoot` method over the loaded module and environment variables is used.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


@TODOs

Edit the tslint => use the one from synaps

## License
Copyright by @haythem-ouederni. All project sources are released under the MIT license.