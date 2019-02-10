# AngularBestPracticesExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

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

**Note:** To be able to use VS Code to edit git commit comments or other file manipulation tasks instead of default `vim` you can run `git config --global core.editor "code --wait"` at the condiction that VS Code is available from commande line (you can check it by running `code --help`).

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


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).