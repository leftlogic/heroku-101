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

## Getting your code ready for Heroku

## Pushing
