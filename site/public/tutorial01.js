import pixoterm from './pixoterm.js'

pixoterm(
    {
        screenWidthInSprites: 3,
        screenHeightInSprites: 3,
        spritePack: 'sprites.json',
        spriteComposition: 'composition.json',
        outerInSprites: 0
    },
    PIXI,
    $
).done((term) => {
    document.body.appendChild(term.view);
    $.getJSON('tutorial01.json', (map) => term.render(map));
});
