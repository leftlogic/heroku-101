# Node + Heroku 101

This guide will walk you through building your first Node web server, and deploying it to the world with Heroku.

The guide assumes you have some familiarity with (and access to) a terminal, and you'll need [git](http://git-scm.com/). GitHub have a good guide for [setting up git](https://help.github.com/articles/set-up-git).

Windows users: when you install git you'll get a terminal with it that emulates bash – that's the terminal you should use for this guide. The guide hasn't be tested on Windows (I have no access to it) so just ask around if you have problems.

## Install Node + npm

The first step is to make sure you've got Node and npm installed. To do so, head to [the Node website](http://nodejs.org/) and follow their instructions.

`npm` is a tool for managing packages and modules published by other members of the Node community. In most cases, it'll come bundled with your Node install.

To test that both are working, open up your terminal and run:

```shell
$ node -v
v0.x.x
```

You should see some kind of version number come back (mine was `v0.10.13`). If you don't, Google the error you get or ask someone.

To test `npm`, run the following:

```shell
$ npm -v
0.x.x
```

Again, you should get a version number (mine was `1.3.2`). Google or ask about any errors.

## Create a Heroku account

Next you'll need to [create a Heroku account.](http://id.heroku.com/signup)

For this tutorial you won't need a credit card attached to your account.

## Get the Heroku toolbelt

Lastly, before we get writing code, get yourself the [Heroku Toolbelt](https://toolbelt.heroku.com/). It lets you interact with Heroku from the terminal, and is the way we'll get everything set up.

## Create the server

So, time to build ourselves a web server. Create a new directory, and in it create a file called `server.js`.

```javascript
var http = require('http'),
    port = process.env.PORT || 3000;

http.createServer(function (req, res) {
  console.log('%s %s', req.method, req.url);
  res.end('hello');
}).listen(port, function () {
  console.log('Server running. http://localhost:%d', port);
});
```

This is a very basic web server using Node. I won't explain the code here – leaving that to others – but we should run it , just to test.

To run the code, navigate to the directory you added to the file to and run the following:

```shell
$ node server.js
Server running. http://localhost:3000
```

(If you see any error, ask or Google them).

Now visit [that URL](http://localhost:3000) to check the server is sending you data. All being well, you'll get a page saying `hello`.

Looking back at your terminal, you should see some logging of your accessing the server.

## Setup git

To get your app running on Heroku, you'll need to setup git in the directory. Heroku is very closely tied into git, as we'll see later.

So, to get git setup, run:

```shell
$ git init
Initialized empty Git repository in /Path/to/your/app/.git/
$ git add -A
$ git commit -m "Initial commit."
[master (root-commit) 195866a] Initial commit.
 1 file changed, 9 insertions(+)
 create mode 100644 server.js
```

And that's it, you're good to go.

## Create the Heroku app

Next we'll use the Heroku toolbelt to create an app. But first, a little about Heroku...

Apps, on Heroku, are made up of your code, plus some configuration data that tells Heroku how to run your code. This configuration is split across two files: the `package.json` and the `Procfile`.

The `package.json` contains your apps dependencies (other modules), as well as metadata about the module, including its name, version and author. This file is also used to inform other Node modules how to use your module, or (as with Heroku) what to install to get the app running, and what versions of Node and `npm` to use.

A `package.json` file is used across nearly all Node modules and is the standard for making Node modules work together.

The `Procfile` is Heroku specific, allowing you to specify the processes associated with your app. In our case, it will just be the web server, but you can also specify workers and one-time-tasks.

We'll get both files set up in moment.

Apps on Heroku get their own subdomain of `herokuapp.com`, so you don't need to work about hosting or domain management. When you're ready, you can use a custom domain, but for now we don't need to.

To create the app, run the following:

```shell
$ heroku apps:create
Creating your-app-1234... done, stack is cedar
http://your-app-1234.herokuapp.com/ | git@heroku.com:your-app-1234.git
Git remote heroku added
```

And that's it! You've got a new app on Heroku with a randomly generated name. Head to the URL it gave you to see the Heroku placeholder page.

## Getting your code ready for Heroku

Next we'll get the web server code ready for Heroku.

We'll use the `npm init` tool to setup the `package.json`. Run the following, and just keep pressing enter.

```shell
$ npm init
... lots of stuff here ...
... keep pressing enter ...
```

You now have a shiny new `package.json`.

We need to make some changes to it, however. Open it up, and make it match the following (you can leave the `name` alone, `engines` is the important bit).

```json
{
  "name": "your-app-name",
  "version": "0.0.0",
  "description": "",
  "main": "server.js",
  "repository": "",
  "author": "",
  "license": "BSD",
  "engines": {
    "node": "0.10.x",
    "npm": "1.2.x"
  }
}
```

This tells Heroku what version of Node and `npm` to use.

Next we have to tell Heroku about our web process. Create a file called `Procfile`, and add the following:

```
web: node server.js
```

(As a shortcut, you can use: `echo "web: node server.js" > Procfile`)

Heroku now knows that the process `web` should be run with `node server.js`.

Lastly, before we put it live, we need to commit the changes. Remember I said Heroku was tightly integrated with Git? Heroku does deployments with `git push`, so you need to have everything you want to deploy committed.

```shell
$ git add .
$ git commit -m "Setup for Heroku."
[master 8a2d142] Setup for Heroku.
 2 files changed, 15 insertions(+)
 create mode 100644 Procfile
 create mode 100644 package.json
```

And now we're ready to deploy.

## Deployment

Deploying to Heroku is as simple as pushing to the remote it added when the app was created (`heroku app:create` remember?).

When you push, Heroku detect what kind of code you've pushed and sets up the environment accordingly. So here goes...

```shell
$ git push heroku master
Counting objects: 7, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (5/5), done.
Writing objects: 100% (7/7), 941 bytes | 0 bytes/s, done.
Total 7 (delta 0), reused 0 (delta 0)

-----> Node.js app detected
-----> Resolving engine versions
       Using Node.js version: 0.10.13
       Using npm version: 1.2.30
-----> Fetching Node.js binaries
-----> Vendoring node into slug
-----> Installing dependencies with npm
       Dependencies installed
-----> Building runtime environment
-----> Discovering process types
       Procfile declares types -> web

-----> Compiled slug size: 3.8MB
-----> Launching... done, v4
       http://your-app-1234.herokuapp.com deployed to Heroku

To git@heroku.com:your-app-1234.git
 * [new branch]      master -> master
```

Visit that URL again and you should have a lovely greeting waiting for you.

Welcome to the world of Node and Heroku.