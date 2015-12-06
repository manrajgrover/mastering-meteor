famous.inputs.FastClick;

PageView = function() {
    famous.core.View.apply(this, arguments);
    _createLayout.call(this);
    _createHeader.call(this);
    _createBody.call(this);
    _setListeners.call(this);
}

PageView.prototype = Object.create(famous.core.View.prototype);
PageView.prototype.constructor = PageView;

PageView.DEFAULT_OPTIONS = {
    headerSize: 44
};



function _createBody() {
    this.bodySurface = new famous.surfaces.ImageSurface({
        size : [undefined, true],
        content : 'img/body.png'
    });
    this.layout.content.add(this.bodySurface);
}

function _createHeader() {
    var backgroundSurface = new famous.core.Surface({
        properties: {
            backgroundColor: 'black'
        }
     });

    var backgroundModifier = new famous.core.Modifier({
        transform: famous.core.Transform.behind
    });
    this.hamburgerSurface = new famous.surfaces.ImageSurface({
        size: [44, 44],
        content: 'img/hamburger.png'
    });

    var searchSurface = new famous.surfaces.ImageSurface({
        size: [232, 44],
        content: 'img/search.png'
    });

    var iconSurface = new famous.surfaces.ImageSurface({
        size: [44, 44],
        content: 'img/icon.png'
    });
    var hamburgerModifier = new famous.core.Modifier({
        origin: [0, 0.5],
        align : [0, 0.5]
    });

    var searchModifier = new famous.core.Modifier({
        origin: [0.5, 0.5],
        align : [0.5, 0.5]
    });

    var iconModifier = new famous.core.Modifier({
        origin: [1, 0.5],
        align : [1, 0.5]
    });
    this.layout.header.add(backgroundModifier).add(backgroundSurface);
    this.layout.header.add(hamburgerModifier).add(this.hamburgerSurface);
    this.layout.header.add(searchModifier).add(searchSurface);
    this.layout.header.add(iconModifier).add(iconSurface);
}

function _setListeners() {
    this.hamburgerSurface.on('click', function() {
        this._eventOutput.emit('menuToggle');
    }.bind(this));
}

function _createLayout() {
    this.layout = new famous.views.HeaderFooterLayout({
        headerSize: this.options.headerSize
    });

    var layoutModifier = new famous.core.Modifier({
        transform: famous.core.Transform.translate(0, 0, 0.1)
     });

    this.add(layoutModifier).add(this.layout);
}