import pixoterm from './pixoterm.js'

pixoterm(
    {
        screenWidthInSprites: 3,
        screenHeightInSprites: 3,
        spritePack: 'sprites.json',
        spriteComposition: 'composition.json',
        onMouseWheel: (delta) => console.log('onMouseWheel: ' + delta),
        onSwipe: (event) => console.log('onSwipe: ' + event.direction),
        onPointerTap: (event) => console.log('onPointerTap: ' + event.row + " / " + event.column),
        onPointerDoubleTap: (event) => console.log('onPointerDoubleTap: ' + event.row + " / " + event.column)
    },
    PIXI, $, Hammer
).done((term) => {
    document.body.appendChild(term.view);
    $.getJSON('map_animation.json', (maps) => {
        let i = 0;
        setInterval(() => term.render(maps[(i++) % maps.length]), 2000);
    });
});

pixoterm(
    {
        spriteWidthPx: 32,
        spriteHeightPx: 32,
        screenWidthInSprites: 3,
        screenHeightInSprites: 3,
        scale: 1,
        animationFps: 24,
        backgroundColor: '0x1099bb',
        outerInSprites: 1,
        spritePack: 'sprites2.json',
        spriteComposition: 'composition.json'
    },
    PIXI, $, Hammer
).done((term) => {
    document.body.appendChild(term.view);
    $.getJSON('map_animation.json', (maps) => {
        let i = 0;
        setInterval(() => term.render(maps[(i++ + 2) % maps.length]), 1000);
    });
});