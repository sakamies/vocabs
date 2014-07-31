# Vocabs for developers

Ever wonder what's the correct word for that one thing in the code? Browse through which is what in css, html and any other languages that you, dear professional are kind enough to add. There's some sample code, with a list of terminology in the sidebar. Clicking on the code highlights relevant terms in the sidebar. Clicking a term in the sidebar highlights relevant parts in the code.

The purpose of the app is to follow specifications closely, always preferring the most recent version of the specs. This is so all items in the vocabularies have strict and verifiable definitions. Some common terminology might be out of scope for the vocabulary list, as many common terms are used loosely or can sometimes mean different things. (Like names of common tricks or techniques, or some such.)

Issues, forks and all manner of feedback welcome! If you improve the code and send a pull request, please try to keep the code boneheadedly simple and understandable.

(For a quick conversation, tweet to [@sakamies](http://twitter.com/sakamies))


## Making new vocabs

First off, fork the repo. Then copy the template.vocab folder in /vocabs and name it according to the language you'd like to make a vocab for. You can of course host it by yourself, but I would appreciate a pull request for a new vocabulary, so they could all be in the same place.

Run `grunt watch` to get automatic scss & haml parsing and livereload going. You'll need a server with php support to run the app. I've used MAMP so far, so there's no php server in the gruntfile yet.

### Vocabulary definition

vocab-{locale}.json

Vocab tokens accross translations should match. If there's a new vocab term that needs to be added, please make a new issue for it.

### Sample code

The vocab code sample (sample.haml->sample.html) is not a syntax highlighted bit of actual code, but a nested structure of vocabulary tokens. It was easier (for me anyway) to make a structure by hand than make a syntax highlighter tokenize everything just right.


