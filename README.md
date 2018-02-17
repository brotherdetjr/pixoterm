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

The data appear more important here. What pixoterm does is just taking the data from server and visualizing it according to simple rules and preloaded sprites.

## Quick Start

```javascript
import pixoterm from './pixoterm.js' // (1)

pixoterm(
    {
        screenWidthInSprites: 3, // (2a)
        screenHeightInSprites: 3, // (2b)
        spritePack: 'sprites.json', // (3)
        spriteComposition: 'composition.json', // (4)
        outerInSprites: 0 // (5)
    },
    PIXI, // (6a)
    $ // (6b)
).done((term) => { // (7)
    document.body.appendChild(term.view); // (8)
    $.getJSON('tutorial01.json', (map) => term.render(map)); // (9)
});
```

> Complete tutorial project can be found on GitHub (TODO) and here (TODO) as live demo. 

- First me need to import pixoterm.js **(1)**. The module gives you *pixoterm* function, you need to pass some args to it.
- Your game screen will be the grid of given dimensions **(2a,b)**.
- Sprite resources are described in *sprites.json* **(3)**. This is standard [PixiJS](http://www.pixijs.com/) texture pack format, can be easily produced with [TexturePacker](http://www.codeandweb.com/texturepacker).
- Texture pack lacks some information, that is necessary when rendering a game screen, e.g. z-order and animation. So we need to have one more file *composition.json* **(4)**. Its format will be described later.
- Let's skip outerInSprites option **(5)** for now.
- pixoterm uses [PixiJS](http://www.pixijs.com/) along with [jQuery](https://jquery.com/) as rendering engine. Just inject *PIXI* and *$* (jQuery) instances **(6a,b)**.
- *pixoterm* function returns jQuery [Deferred object](https://api.jquery.com/category/deferred-object/) **(7)**.
- When resolved, it contains an object, which has *view* property **(8)** &mdash; an instance of [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement), which you need to add to you HTML page.
- Also it has *render* method **(9)**, which you call passing an instance of map to render.

> I use ES6 syntax, which does not work in some browsers (e.g. in Firefox you need to switch ES6 support on manually). I don't care. I might convert it to older JS later, but I'm sure, they will support ES6 soon.

