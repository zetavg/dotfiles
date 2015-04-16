/* Slate Config */
slate.configAll({
  repeatOnHoldOps : "resize,nudge",
  keyboardLayout : "qwerty",
  windowHintsIgnoreHiddenWindows : false,
  windowHintsSpread : true
});

/* Define Keys */
var hyperKey = 'cmd;shift';
var optionKey = 'alt';

/* Define Applications */
var Chrome = 'Google Chrome';
var Terminal = 'Terminal';
var Terminal2 = '終端機';
var Subl = 'Sublime Text';

/* Step */
var logStep = slate.operation("snapshot", {
  "name" : "loggedSteps",
  "save" : true,
  "stack" : true
});
var stepBack = slate.operation("activate-snapshot", {
  "name" : "loggedSteps",
  "delete" : true,
});

/* Operations */
// focus
var hint = slate.operation("hint", {
  "characters" : "JKHLUINMYOP"
});
// push to
var pushRight = slate.operation("push", {
  "direction" : "right",
  "style" : "bar-resize:screenSizeX/2"
});
var pushLeft = slate.operation("push", {
  "direction" : "left",
  "style" : "bar-resize:screenSizeX/2"
});
var pushTop = slate.operation("push", {
  "direction" : "top",
  "style" : "bar-resize:screenSizeY/2"
});
var fullscreen = slate.operation("move", {
  "x" : "screenOriginX",
  "y" : "screenOriginY",
  "width" : "screenSizeX",
  "height" : "screenSizeY"
});
// move and resize
var moveDown = slate.operation("nudge", {
  "x" : "+0",
  "y" : "+20"
});
var moveUp = slate.operation("nudge", {
  "x" : "+0",
  "y" : "-20"
});
var moveRight = slate.operation("nudge", {
  "x" : "+20",
  "y" : "+0"
});
var moveLeft = slate.operation("nudge", {
  "x" : "-20",
  "y" : "+0"
});
var moveAndResizeToCenter = slate.operation("move", {
  "x" : "screenOriginX+screenSizeX/10",
  "y" : "screenOriginY+screenSizeY/10",
  "width" : "screenSizeX*0.8",
  "height" : "screenSizeY*0.8"
});
var moveToCenter = slate.operation("move", {
  "x" : "screenSizeX/2-windowSizeX/2",
  "y" : "screenSizeY/2-windowSizeY/2",
  "width" : "windowSizeX",
  "height" : "windowSizeY"
});
var throwNext = slate.operation("throw", {
  "screen" : 'next'
});
// grid
var grid44 = slate.operation("grid", {
  "grids" : {
    "0" : {
      "width" : 4,
      "height" : 4
    },
    "1" : {
      "width" : 4,
      "height" : 4
    },
    "2" : {
      "width" : 4,
      "height" : 4
    },
    "3" : {
      "width" : 4,
      "height" : 4
    },
    "4" : {
      "width" : 4,
      "height" : 4
    },
    "5" : {
      "width" : 4,
      "height" : 4
    }
  },
  "padding" : 5
});


/* Bind Keys */
// focus
slate.bind('j:'+hyperKey, function(win) {
  win.doOperation(slate.operation("focus", { "direction" : "down" }));
}, true);
slate.bind('k:'+hyperKey, function(win) {
  win.doOperation(slate.operation("focus", { "direction" : "up" }));
}, true);
slate.bind('h:'+hyperKey, function(win) {
  win.doOperation(slate.operation("focus", { "direction" : "left" }));
}, true);
slate.bind('l:'+hyperKey, function(win) {
  win.doOperation(slate.operation("focus", { "direction" : "right" }));
}, true);
slate.bind('esc:cmd', hint);
// move and resize
slate.bind('j:'+hyperKey+';'+optionKey, function(win) {
  win.doOperation(logStep);
  win.doOperation(moveDown);
}, true);
slate.bind('k:'+hyperKey+';'+optionKey, function(win) {
  win.doOperation(logStep);
  win.doOperation(moveUp);
}, true);
slate.bind('h:'+hyperKey+';'+optionKey, function(win) {
  win.doOperation(logStep);
  win.doOperation(moveLeft);
}, true);
slate.bind('l:'+hyperKey+';'+optionKey, function(win) {
  win.doOperation(logStep);
  win.doOperation(moveRight);
}, true);
slate.bind('m:'+hyperKey+';'+optionKey, function(win) {
  win.doOperation(logStep);
  win.doOperation(slate.operation("resize", {
    "width" : "+0",
    "height" : "+40"
  }));
  win.doOperation(slate.operation("nudge", {
    "x" : "+0",
    "y" : "-20"
  }));
}, true);
slate.bind(',:'+hyperKey+';'+optionKey, function(win) {
  win.doOperation(logStep);
  win.doOperation(slate.operation("resize", {
    "width" : "+0",
    "height" : "-40"
  }));
  win.doOperation(slate.operation("nudge", {
    "x" : "+0",
    "y" : "+20"
  }));
}, true);
slate.bind('.:'+hyperKey+';'+optionKey, function(win) {
  win.doOperation(logStep);
  win.doOperation(slate.operation("resize", {
    "width" : "+40",
    "height" : "+0"
  }));
  win.doOperation(slate.operation("nudge", {
    "x" : "-20",
    "y" : "+0"
  }));
}, true);
slate.bind('n:'+hyperKey+';'+optionKey, function(win) {
  win.doOperation(logStep);
  win.doOperation(slate.operation("resize", {
    "width" : "-40",
    "height" : "+0"
  }));
  win.doOperation(slate.operation("nudge", {
    "x" : "+20",
    "y" : "+0"
  }));
}, true);
slate.bind('[:'+hyperKey+';'+optionKey, function(win) {
  win.doOperation(logStep);
  win.doOperation(pushLeft);
}, true);
slate.bind(']:'+hyperKey+';'+optionKey, function(win) {
  win.doOperation(logStep);
  win.doOperation(pushRight);
}, true);
slate.bind('o:'+hyperKey+';'+optionKey, function(win) {
  win.doOperation(logStep);
  win.doOperation(moveAndResizeToCenter);
}, true);
slate.bind('0:'+hyperKey+';'+optionKey, function(win) {
  win.doOperation(logStep);
  win.doOperation(moveToCenter);
}, true);
slate.bind('p:'+hyperKey+';'+optionKey, function(win) {
  win.doOperation(logStep);
  var thisScreen = slate.screen;
  var thisWindow = slate.window;
  var nextScreen;
  if (slate.screenCount() > (slate.screen().id()+1)) {
    nextScreenID = (slate.screen().id()+1);
    nextScreen = slate.screenForRef(nextScreenID);
  } else {
    nextScreenID = 0;
    nextScreen = slate.screenForRef(0);
  }
  x = win.topLeft().x * (nextScreen.visibleRect().width/slate.screen().visibleRect().width);
  y = win.topLeft().y * (nextScreen.visibleRect().height/slate.screen().visibleRect().height);
  width = win.size().width * (nextScreen.visibleRect().width/slate.screen().visibleRect().width);
  height = win.size().height * (nextScreen.visibleRect().height/slate.screen().visibleRect().height);
  var throwNextResize = slate.operation("move", {
    "screen" : nextScreen,
    "x" : x.toString(),
    "y" : y.toString(),
    "width" : width.toString(),
    "height" : height.toString()
  });
  var throwNext = slate.operation("throw", {
    "screen" : nextScreen,
  });
  var nudge = slate.operation("nudge", {
    "x" : '+'+x.toString(),
    "y" : '+'+y.toString()
  });
  win.doOperation(throwNext);
  // win.doOperation(nudge);
  win.resize({
    "width" : width.toString(),
    "height" : height.toString()
  });
}, false);
slate.bind('g:'+hyperKey+';'+optionKey, grid44);
// undo
slate.bind('u:'+hyperKey+';'+optionKey, stepBack);
