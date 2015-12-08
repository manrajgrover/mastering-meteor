var View = famous.core.View;
var Surface = famous.core.Surface;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;

StripView = function() {
    View.apply(this, arguments);
    _createBackground.call(this);
    _createIcon.call(this);
    _createTitle.call(this);
}

function _createBackground() {
    var backgroundSurface = new Surface({
        size: [this.options.width, this.options.height],
        properties: {
            backgroundColor: 'black',
            boxShadow: '0 0 1px black'
        }
    });

    var rotateModifier = new StateModifier({
        transform: Transform.rotateZ(this.options.angle)
    });

    var skewModifier = new StateModifier({
        transform: Transform.skew(0, 0, this.options.angle)
    });

    this.add(rotateModifier).add(skewModifier).add(backgroundSurface);
}

function _createIcon() {
    var iconSurface = new famous.surfaces.ImageSurface({
        size: [this.options.iconSize, this.options.iconSize],
        content : this.options.iconUrl,
        pointerEvents : 'none'
    });

    var iconModifier = new StateModifier({
        transform: Transform.translate(24, 2, 0)
    });

    this.add(iconModifier).add(iconSurface);
}

function _createTitle() {
    var titleSurface = new Surface({
        size: [true, true],
        content: this.options.title,
        properties: {
            color: 'white',
            fontFamily: 'AvenirNextCondensed-DemiBold',
            fontSize: this.options.fontSize + 'px',
            textTransform: 'uppercase',
            pointerEvents : 'none'
        }
    });

    var titleModifier = new StateModifier({
        transform: Transform.thenMove(Transform.rotateZ(this.options.angle), [75, -5, 0])
    });

    this.add(titleModifier).add(titleSurface);
}


StripView.prototype = Object.create(View.prototype);
StripView.prototype.constructor = StripView;

StripView.DEFAULT_OPTIONS = {
    width: 320,
    height: 55,
    angle: -0.2,
    iconSize: 32,
    iconUrl: 'img/strip-icons/famous.png',
    title: 'Famo.us',
    fontSize: 26,
};