function Dots(options) {
	this.dots = [];
	this.dotWidth = options.dotWidth || 10;
    this.spacing = options.spacing || 5;
    this.numPages = options.numPages;
	this.node = new Famous.Surface({});
    for (var i = 0; i < this.numPages; i++) {
        var dotNode = new Famous.Surface({
        });
        dotNode.setSize(this.dotWidth, this.dotWidth)
        this.node.add(dotNode);
        this.dots.push(new Dot(dotNode, i));
    }
    this.dots[0].select();
    node.add(this.node);
}

Dots.prototype.layoutDots = function(size) {
    if (size) {
        this.size = size;
    }
    var totalDotSize = this.dotWidth * this.numPages + this.spacing * (this.numPages - 1);
    var start = (this.size[0] - totalDotSize) / 2;
    for (var i = 0; i < this.numPages; i++) {
        this.dots[i].node.setPosition(start + (this.dotWidth + this.spacing) * i, 0, 0);
    }
}

Dots.prototype.pageChange = function(oldIndex, newIndex) {
    this.dots[oldIndex].deselect();
    this.dots[newIndex].select();
}

function Arrow(options) {
	this.direction = options.direction;
	this.el = new Famous.Surface({
        content: this.direction === 1 ? '>' : '<',
        properties: {
            fontSize: '40px',
            color: 'white',
            lineHeight: '40px',
            cursor: 'pointer',
            textHighlight: 'none',
            zIndex: '2'
        }
    });
}

function _positionComponents() {
    this.arrows.back.setSizeMode(1,1)
    this.arrows.back.setAbsoluteSize(40, 40);
    this.arrows.back.setPosition(40, 0, 0);
    this.arrows.back.setAlign(0, .5, 0);
    this.arrows.back.setMountPoint(0, .5, 0);
    this.arrows.next.setSizeMode(1,1)
    this.arrows.next.setAbsoluteSize(40, 40);
    this.arrows.next.setPosition(-40, 0, 0);
    this.arrows.next.setAlign(1, .5, 0);
    this.arrows.next.setMountPoint(1, .5, 0);
    this.dots.node.setSizeMode(1,1)
    this.dots.node.setAbsoluteSize(null, 20);
    this.dots.node.setPosition(0, -50, 0);
    this.dots.node.setAlign(.5, 1, 0);
    this.dots.node.setMountPoint(.5, 1, 0);
    this.pager.node.setAlign(.5, .5, 0);
    this.pager.node.setMountPoint(.5, .5, 0);
}

function Carousel(selector, data) {
    this.context = new Famous.Engine.createContext();
    this.root = new Famous.Scene();
    this.pageData = loadImageData.images;
    this.arrows = {
        back: this.root.add(new Arrow({ direction: -1 })),
        next: this.root.add(new Arrow({ direction:  1 }))
    };
    //this.pager = new Pager(this.root,{ pageData: this.pageData});
    this.dots = new Dots({ numPages: this.pageData.length });
    this.root(this.dots);
    this.dots = new Dots(this.root, { numPages: this.pageData.length });
    _positionComponents.call(this);
    /*this.el = new Famous.Surface({
        content: 'Hello Famous!',
        properties: {
            fontSize: '40px',
            color: 'white'
        }
    });*/
    //this.root.add(this.el);
    //this.context.add(this.root);
}
Template.main.onRendered(function() {
	//Carousel;
	//imageData;
	//var Carousel = require('./Carousel');
	//var imageData = require('./data');
	var carousel = new Carousel('body', { pageData: loadImageData.images });

	/*var context = new Famous.Engine.createContext();
	var grid = new famous.views.GridLayout({
        dimensions: [4, 2]
    });

    var surfaces = [];
    grid.sequenceFrom(surfaces);

    for(var i = 0; i < 8; i++) {
        surfaces.push(new Famous.Surface({
            content: "I am panel " + (i + 1),
            size: [undefined, undefined],
            properties: {
                backgroundColor: "hsl(" + (i * 360 / 8) + ", 100%, 50%)",
                color: "black",
                lineHeight: window.innerHeight / 2 + 'px',
                textAlign: 'center'
            }
        }));
    }

    context.add(grid);*/
});