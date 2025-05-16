# Contributing to fill-file.js

There are multiples ways of contributing into the project such as writing code to the core file generation engine, help writing and/or updating documentation or helping to maintain the CI pipelines.

## Get the code

To get the code and start contributing make sure to follow the steps bellow

1. Make a fork to have your own copy of the source tree
2. Clone the the project into your local machine
```shell
git clone https://github.com/<your_user_name>/fill-file.js
```
3. Install the project dependencies
we use [pnpm](https://) as our package manager, so before continue make sure to install it.

Install `pnpm` if not installed yet
```shell
npm i -g pnpm@10
```
Now, use `pnpm` to install the dependencies
```shell
pnpm install
```

4. Build the project
```shell
pnpm build
```

5. Run tests
```shell
pnpm tests
```

## Make changes where you like

After cloning and building the project in your local machine, now you can start playing around,
we recommend creating a new branch to keep things clean and simplify the submition of your changes.

Create sematic branchs accordingly to the change being made
```shell
# bug fix
git checkout -b fix/win-newline-char

# docs
git checkout -b docs/add-website-favicon

# feature
git checkout -b feat/json-file-support
```

## Submit a Pull Request
