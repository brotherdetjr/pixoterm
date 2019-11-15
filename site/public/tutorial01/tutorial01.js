import pxterm from '/pxterm.js'

pxterm(
    {
        screenWidthInSprites: 3,
        screenHeightInSprites: 3,
        spritePack: '/sprites.json',
        spriteComposition: '/composition.json',
        outerInSprites: 0
    },
    PIXI,
    $
).done(term => {
    $('#container').append(term.view);
    $.getJSON('map.json', map => term.render(map));
});
