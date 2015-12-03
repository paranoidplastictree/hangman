# Hangman

Hangman is an online game based on the word-game typically played with paper/pencil. Here's the gist of the game, in case you've been living under a rock somewhere:

  - Goal is to guess the word before full stick figure is drawn
  - CPU selects a random word (3-6 characters in length)
  - You try to guess the word by typing a letter at a time

### Version
1.1.0

### Tech

Hangman uses a few open source projects to work properly:

* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [jQuery] - does stuff

### Installation

You need TypeScript installed globally:

```sh
$ npm i -g typescript
```

```sh
$ git clone [git-repo-url] hangman
$ cd hangman
```

Once typesript is installed, you can compile the typescript file and output a JS file by doing so:
```
$ tsc hangman.ts
```

Open index.html in a browser


### Todos

 - Show word after you lose a game
 - Refactor to use [AngularJS]
 - Add Code Comments
 - Write Tests
 - Implement Gulp to speed up development (watch will update your page automagically after making a change)
 - Multi-player (perhaps via firebase)

License
----

MIT


**Free Software, w00t!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [git-repo-url]: <https://github.com/paranoidplastictree/hangman.git>
   [tim storms]: <http://timstorms.me>
   [@bowtiekiller]: <http://twitter.com/bowtiekiller>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [AngularJS]: <http://angularjs.org>
   
