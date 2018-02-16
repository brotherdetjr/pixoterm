import pixoterm from './pixoterm.js'

pixoterm(
    {
        spriteWidthPx: 32,
        spriteHeightPx: 32,
        screenWidthInSprites: 3,
        screenHeightInSprites: 3,
        scale: 2,
        animationFps: 12,
        backgroundColor: '0x1099bb',
        outerInSprites: 1,
        spritePack: 'sprites.json',
        spriteComposition: 'composition.json'
    },
    PIXI,
    $
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
    PIXI,
    $
).done((term) => {
    document.body.appendChild(term.view);
    $.getJSON('map_animation.json', (maps) => {
        let i = 0;
        setInterval(() => term.render(maps[(i++ + 2) % maps.length]), 1000);
    });
});