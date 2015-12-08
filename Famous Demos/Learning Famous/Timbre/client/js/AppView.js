famous.inputs.GenericSync.register({
    'mouse': famous.inputs.MouseSync, 
    'touch': famous.inputs.TouchSync
});

AppView = function() {
    famous.core.View.apply(this, arguments);
    this.menuToggle = false;
    this.pageViewPos = new famous.transitions.Transitionable(0);
    _createPageView.call(this);
    _createMenuView.call(this);
    _setListeners.call(this);
    _handleSwipe.call(this);
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

function _handleSwipe() {
    var sync = new famous.inputs.GenericSync(
        ['mouse', 'touch'],
        {direction : famous.inputs.GenericSync.DIRECTION_X}
    );

    this.pageView.pipe(sync);

    sync.on('update', function(data) {
        var currentPosition = this.pageViewPos.get();
        if(currentPosition === 0 && data.velocity > 0) {
            this.menuView.animateStrips();
        }

        this.pageViewPos.set(Math.max(0, currentPosition + data.delta));
    }.bind(this));

    sync.on('end', (function(data) {
        var velocity = data.velocity;
        var position = this.pageViewPos.get();

        if(this.pageViewPos.get() > this.options.posThreshold) {
            if(velocity < -this.options.velThreshold) {
                this.slideLeft();
            } else {
                this.slideRight();
            }
        } else {
            if(velocity > this.options.velThreshold) {
                this.slideRight();
            } else {
                this.slideLeft();
            }
        }
    }).bind(this));
}

function _createMenuView() {
    this.menuView = new MenuView({ stripData: StripData });

    var menuModifier = new famous.modifiers.StateModifier({
        transform: famous.core.Transform.behind
    });

    this.add(menuModifier).add(this.menuView);
}

function _createPageView() {
    this.pageView = new PageView();
    this.pageModifier = new famous.core.Modifier({
        transform: function() {
            return famous.core.Transform.translate(this.pageViewPos.get(), 0, 0);
        }.bind(this)
    });

    this._add(this.pageModifier).add(this.pageView);
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