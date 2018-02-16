# pixoterm

Minimalistic HTML5/ES6 terminal for multiplayer top-down pixel art games.

[Live demo](https://brotherdetjr-time.firebaseapp.com). Sprites are taken from [here](https://wrlck.itch.io/simple-desert) and [here](https://wildrandomness23.deviantart.com/art/PSVX-4G-Charset3-214615699). Thanks to the authors.

## WTF is top-down pixel art?

Top-down pixel art is a common way of drawing old-school games. Early [Zelda](https://en.wikipedia.org/wiki/The_Legend_of_Zelda) and [GTA](https://en.wikipedia.org/wiki/Grand_Theft_Auto) are an example.

## WTF is "terminal for multiplayer games"???

If your goal is to develop browser-based multiplayer pixel art game, you need browser to draw some sprites.

You can use different [cool game engines](https://phaser.io/). They are feature rich and applicable not only to pixel art multiplayer game dev. Go use them.

On the opposite end you have [MUD](https://en.wikipedia.org/wiki/Text-based_game#MUD), where you don't need any graphics, but normally simple text markup, which can be shown in some [text terminal](https://en.wikipedia.org/wiki/Computer_terminal#Text_terminals).

**pixoterm** terminal concept allows to draw much richer graphics then in a text terminal, but with similar approach. All the the sprites are preloaded (like fonts in text terminals), then some data (JSON or whatever) come from server (like text, position and color data in text terminals).

The data appear more important here. What pixoterm does is just taking the data from server and visualizing it according to simple rules and preloaded sprites. <!--This data-first approach is mostly inspired by my back-end dev background and by my love with pixel art, which often is a good candidate for reducing to basic pieces/tiles/sprites.-->

