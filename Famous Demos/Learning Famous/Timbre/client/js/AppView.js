AppView = function() {
    famous.core.View.apply(this, arguments);
    this.menuToggle = false;
    this.pageViewPos = new famous.transitions.Transitionable(0);
    _createPageView.call(this);
    _setListeners.call(this);
}

AppView.DEFAULT_OPTIONS = {
    openPosition: 276,
    transition: {
        duration: 300,
        curve: 'easeOut'
    }
};
AppView.prototype = Object.create(famous.core.View.prototype);
AppView.prototype.constructor = AppView;

function _createPageView() {
    this.pageView = new PageView();
    this.pageModifier = new famous.core.Modifier();
    this.add(this.pageModifier).add(this.pageView);
}

function _setListeners() {
    this.pageView.on('menuToggle', this.toggleMenu.bind(this));
}

AppView.prototype.toggleMenu = function() {
    if(this.menuToggle) {
        this.slideLeft();
    } else {
        this.slideRight();
    }
    this.menuToggle = !this.menuToggle;
};


AppView.prototype.slideLeft = function() {
    this.pageViewPos.set(0, this.options.transition, function() {
        this.menuToggle = false;
    }.bind(this));
};

AppView.prototype.slideRight = function() {
    this.pageViewPos.set(this.options.openPosition, this.options.transition, function() {
        this.menuToggle = true;
    }.bind(this));
};