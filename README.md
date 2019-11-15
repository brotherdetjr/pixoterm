# pxterm

Minimalistic HTML5/ES6 terminal for multiplayer top-down pixel art games.

[Live demo](https://pxterm.web.app/). Sprites are taken from [here](https://wrlck.itch.io/simple-desert) and [here](https://wildrandomness23.deviantart.com/art/PSVX-4G-Charset3-214615699). Thanks to the authors.

## What is top-down pixel art?

Top-down pixel art is a common way of drawing old-school games. Early [Zelda](https://en.wikipedia.org/wiki/The_Legend_of_Zelda) and [GTA](https://en.wikipedia.org/wiki/Grand_Theft_Auto) are an example.

## What is "terminal for multiplayer games"???

If your goal is to develop browser-based multiplayer pixel art game, you need browser to draw some sprites.

You can use different [cool game engines](https://phaser.io/). They are feature rich and applicable not only to pixel art multiplayer game dev. Go use them.

On the opposite end you have [MUD](https://en.wikipedia.org/wiki/Text-based_game#MUD), where you don't need any graphics, but normally simple text markup, which can be shown in some [text terminal](https://en.wikipedia.org/wiki/Computer_terminal#Text_terminals).

**pxterm** terminal concept allows to draw much richer graphics then in a text terminal, but with similar approach. All the the sprites are preloaded (like fonts in text terminals), then some data (JSON and what not) comes from server (like text, position and color data in text terminals).

The data appear more important here. What pxterm does is just taking the data from server and visualizing it according to simple rules and preloaded sprites.

## Tutorial

Complete tutorial project can be found on [GitHub](https://github.com/brotherdetjr/pxterm/blob/master/site/public/).

### Step 1

The live demo of Step 1 can be found [here](https://pxterm.web.app/tutorial01/).

```javascript
import pxterm from '/pxterm.js' // (1)

pxterm(
    {
        screenWidthInSprites: 3, // (2a)
        screenHeightInSprites: 3, // (2b)
        spritePack: '/sprites.json', // (3)
        spriteComposition: '/composition.json', // (4)
        outerInSprites: 0 // (5)
    },
    PIXI, // (6a)
    $ // (6b)
).done(term => { // (7)
    $('#container').append(term.view); // (8)
    $.getJSON('tutorial01.json', map => term.render(map)); // (9)
});
```

- First we need to import [pxterm.js](https://github.com/brotherdetjr/pxterm/blob/master/lib/pxterm.js) **(1)**. The module gives you `pxterm` function, and you need to pass some arguments to it.
- Your game screen is going to be the grid of given dimensions **(2a,b)**.
- Sprite resources are described in [sprites.json](https://github.com/brotherdetjr/pxterm/blob/master/site/public/sprites.json) **(3)**. This is standard [PixiJS](http://www.pixijs.com/) texture pack format, can be easily produced with [TexturePacker](http://www.codeandweb.com/texturepacker).
- Texture pack lacks some information, which is necessary when rendering a game screen, e.g. z-order of objects and animation. So we need to have one more file &mdash; `composition.json` **(4)**. We will discuss its format later.
- Let's skip `outerInSprites` option **(5)** for now.
- pxterm uses [PixiJS](http://www.pixijs.com/) along with [jQuery](https://jquery.com/) as rendering engine. Just inject *PIXI* and *$* (jQuery) instances **(6a,b)**.
- `pxterm` function returns jQuery [Deferred object](https://api.jquery.com/category/deferred-object/) **(7)**.
- When resolved, it contains an object, which has `view` property **(8)** &mdash; an instance of [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement), which you need to append to your HTML page.
- And last but least, it has `render` method **(9)**, which you call passing an instance of map to render.

What does map JSON look like?

```json
{
    "screenHeightInSprites": 3,
    "screenWidthInSprites": 3,
    "cellEntries": [
        {
            "row": 0,
            "column": 0,
            "zIndex": 0,
            "sprite": "sand_0"
        },
        {
            "row": 0,
            "column": 0,
            "zIndex": 1,
            "sprite": "stone_single"
        },
        ...
        {
            "row": 2,
            "column": 2,
            "zIndex": 0,
            "sprite": "sand_0"
        }
    ]
}
```

The real map JSON for this tutorial lesson can be found [here](https://github.com/brotherdetjr/pxterm/blob/master/site/public/tutorial01/map.json).

The map is JSON object with dimension properties (`screenWidthInSprites`, `screenHeightInSprites`) and `cellEntries` property, which is array of "cell entry" objects.

Every cell entry object  `sprite` property, which references to a sprite description in sprite composition JSON ([composition.json](https://github.com/brotherdetjr/pxterm/blob/master/site/public/composition.json) in our case). In this file you can find references to `sand_...` sprites which are apparently pictures of ground, and other different items: `stone_single`, `cactus_tall`, `cactus_round`, ...

`row`, `column` are indices of the map grid.

`zIndex` can be any number (including negatives and floating point). Every map cell can contain a number of objects, and you need to specify the order of drawing. It's a good idea to mark a ground sprite with `zIndex` equal to zero. The "topmost" object has the greatest `zIndex` value amongst cell's objects.

You might even notice that some sprite (`bant_idle_down`) is animated &mdash; it's a girl with a red bow standing still, but breathing heavily like a typical pixel art character.

Let's have a look at [composition.json](https://github.com/brotherdetjr/pxterm/blob/master/site/public/composition.json):

```json
{
"sand_0": {"frames": ["sand_0.png"], "zIndex": 0},
...
"bant_idle_down": {
    "frames": ["bant_walk_down_1.png", "bant_walk_down_3.png"],
    "zIndex": 100,
    "transitions": [
        {
            "name": "animate",
            "params": {
                "sequence": [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
                "loopFrom": 0
            }
        }
    ]
}
...
}
```

This is an object, whose properties have the same names as the sprites from [sprites.json](https://github.com/brotherdetjr/pxterm/blob/master/site/public/sprites.json) do. `sand_0` value is quite simple:

- `frames` contains an array of sprite names from texture pack ([sprites.json](https://github.com/brotherdetjr/pxterm/blob/master/site/public/sprites.json) in our case). Yes, we have double indirection here. Since this piece of ground is not animated, the array contains single element.
- `zIndex` determines an order in which sprites of a given cell will be drawn. Sprites with bigger zIndex are drawn atop the sprites with lesser one.
- `bant_idle_down` has some animation, see `frames` array, but nothing would be moving, unless we added `animate` *transition* to `transitions` array. `sequence` specifies the sequence of frames in animation. Every number refers to element in `frames` array.
- If `loopFrom` property is specified, the animation is looped starting with `loopFrom`th frame of `sequence`. Here we have looped 8x2 frames of breathing. We don't want our little girl to suffocate.

## Step 2: Filters and More on Transitions

Let's make the girl look left. Just change "*bant_idle_down*" to "*bant_idle_left*" in map JSON.

But if you look at [sprites.png](https://brotherdetjr-time.firebaseapp.com/sprites.png), you won't find there a girl looking left. In [composition.json](https://github.com/brotherdetjr/pixoterm/blob/master/site/public/composition.json) we applied a flip filter to the sprite:

```json
"bant_idle_left": {
...
        "filters": [{"name": "flip", "params": 1}]
    },
```

"params" can have one of four values:

- 0 &mdash; no flip
- 1 &mdash; flip horizontally
- 2 &mdash; flip vertically
- 3 &mdash; flip both horizontally and vertically

Now let's make her walking. Change "*bant_idle_left*" to "*bant_walk_left*". Hey, she stirs her legs, but stays in the same place! Probably we should use "*bant_walk_left_and_move*" sprite, but we don't have it in [composition.json](https://github.com/brotherdetjr/pixoterm/blob/master/site/public/composition.json).

Why to have a sprite that stirs the legs, but stays fixed? This is for you protagonist character, which normally stays in the center of the screen. Ok, but where is "*bant_walk_left_and_move*"? You may add it, if you like, but it's not necessary, because you can simply add "*move*" transition to the map:

```json
{"sprite": "bant_walk_left", "transitions": [{"name": "move", "params": {"direction": "left", "distancePx": 32, "stepPx": 2}}]}
```

It has the following params:

- direction &mdash; left, right, up, or down.
- distancePx &mdash; the distance in pixels to move to.
- stepPx &mdash; the distance in pixels a sprite will move to every frame.

In [the given example](https://brotherdetjr-time.firebaseapp.com/tutorial02.html) the girl will move to the left for 32 px in 16 two-pixel steps. Since the frame rate in the example is set to the default value of 12 FPS, the girl will move to the left cell in 16/12 = 1,333 seconds. Right to the cactus, ouch!

You can apply multiple transitions to a sprite. This is useful for the scenes, when your character for example is moving up, and some other character (say, NPC) in moving down. In this case you have to apply two "*move down*" transitions to the NPC. One because the whole scene "moves" down, when the character, fixed to the center, goes up. Another one because the NPC itself goes down.

At first transitions from sprite composition JSON are applied.

In addition, you can apply filters not only to sprites in composition JSON, but also to sprites in a map, the same way as we did it for transitions.

### Step 3: Configuration in Detail

The only mandatory properties of configuration object passed to *pxterm()* function are *spritePack* and *spriteComposition*. I described them in Step 1 of this tutorial. All the rest properties have their default values. They are exported by *pxterm.js* module as *configDefaults* object.

```javascript
export const configDefaults = {
    spriteWidthPx: 32,
    spriteHeightPx: 32,
    screenWidthInSprites: 5,
    screenHeightInSprites: 5,
    scale: 2,
    animationFps: 12,
    backgroundColor: '0x1099bb',
    outerInSprites: 1
};
```

- *screenWidthInSprites* and *screenHeightInSprites* have been discussed above.
- *spriteWidthPx* and *spriteHeightPx* are obvious.
- *scale* shows how much the terminal should be scaled, because unscaled pixel art normally appears tiny on modern screens. You can compute terminal width by formula *screenWidthInSprites * spriteWidthPx * scale*. Similarly you can compute terminal height.
- *animationFps* is a speed of animation specified in sprite composition JSON and/or in the map. More generally it is applied to any transition (see below).
- *backgroundColor* is an RGB value of the background color of the terminal. You can see it when no sprites are drawn. The value should be '*0xRRGGBB*'-formatted String.
- *outerInSprites* is a handy trick for scrolling effect. Assume you have your character fixed in the center of the screen, and he/she is moving *one cell* up. In this case you will need to render one extra row of sprites coming from above. The first frame of your animation won't show any pixels of this row, but then it will be sliding into a visible part of your game screen "pushing out" the lower row. Thus *(screenHeightInSprites + 1)* rows will be shown during the main part of your animation. You can achieve this by different approaches, but the most simple one is to have a "border" of extra sprites around the visible part of game screen. When you need to scroll the screen down (remember? you character is moving up), you just apply *move down* transition to every sprite on the map except your character. The default value of *outerInSprites* is 1, but you can set it to any other value, if your transitions assume moving farther than one sprite.

### Step 4: Custom Transitions and Filters

TODO

### Step 5: Handling User Input

TODO

## Dynamic Scaling

An object resolved in Deferred returned by *pxterm(...)* function contains one more property: *scale*. You can dynamically rescale your game screen, not only upon the initialization.

## Multiple Terminals on One Page

Yes, they are supported. Moreover, they can have different texture packs, but if they have the same ones, no extra networking happens &mdash; the assets are taken from PIXI's texture cache.

## A Word on Data

You could notice that all the data structures are pretty redundant. Yes, they are, but this is done for simplicity of pxterm engine. If you are concerned with minimization of networking traffic, you should use some optimizers that will normalize the data before sending to a browser, and denormalize it at browser's side when passing to pxterm.

Also it worth using some binary formats instead of JSON ([here](http://bsonspec.org/) and [here](https://github.com/google/protobuf/tree/master/js)), but this is out of pxterm's scope.

When implementing your own pxterm (de)serialization, you might be tempted to send not the whole screen data, but delta &mdash; the changes appeared since the previous frame. Potentially this is much more efficient.

However I suggest to avoid such approach, because dealing with deltas assumes, that your client application keeps some state. It might be quite tricky to maintain the state correctly on a client. Keep your client app stateless as much as you can.
