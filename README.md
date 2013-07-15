# Node + Heroku 101

This guide will walk you through building your first Node web server, and deploying it to the world with Heroku.

The guide assumes you have some familiarity with (and access to) a terminal, and you'll need [git](http://git-scm.com/).

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

## Get the Heroku toolbelk

Lastly, before we get writing code, get yourself the [Heroku Toolbelt](https://toolbelt.heroku.com/). It lets you interact with Heroku from the terminal, and is the wasy we'll get everything set up.

## Create your server

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

The `Procfile` is Heroku specific, allowing you to specifiy the processes associated with your app. In our case, it will just be the web server, but you can also specify workers and one-time-tasks.

We'll get both files set up in moment.

Apps on Heroku get their own subdomain of `herokuapp.com`, so you don't need to work about hosting or domain management. When you're ready, you can use a custom domain, but for now we don't need to.

To create the app, run the following:

```shell
$ heroku apps:create
Creating your-app-1234... done, stack is cedar
http://your-app-1234.herokuapp.com/ | git@heroku.com:your-app-1234.git
Git remote heroku added
```

And that's it! You've got a new app on Heroku with a randomly generated name. Head to the URL it gave you to see it the Heroku placeholder page.

## Getting your code ready for Heroku

## Pushing
