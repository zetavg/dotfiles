/*
 * Slate Config
 */

slate.configAll({
  repeatOnHoldOps: "resize,nudge",
  secondsBeforeRepeat: 0.4,
  secondsBetweenRepeat: 0.05,
  keyboardLayout: "qwerty",
  snapshotMaxStackSize: 1000,
  undoMaxStackSize: 1000,
  windowHintsIgnoreHiddenWindows: true,
  windowHintsSpread: true,
});

/*
 * Define Keys
 */

var hyperKey = 'cmd;shift';
var optionKey = 'alt';

function withHyperKey(key, option) {
  if (option) {
    return key + ':' + hyperKey + ';' + optionKey;
  } else {
    return key + ':' + hyperKey;
  }
}

/*
 * Define Applications
 */

var defaultApplications = {
  webBrowser: 'Opera Developer',
  terminal: 'iTerm',
  textEditor: 'Sublime Text',
};

/*
 * Helpers
 */

function getNextScreenID() {
  var currentScreen = slate.screen();
  var currentScreenID = currentScreen.id();
  var nextScreenID = currentScreenID + 1;
  if (nextScreenID >= slate.screenCount()) nextScreenID = 0;
  slate.log(nextScreenID);
  return nextScreenID.toString();
}

/*
 * Define Step Logging Operations
 */

var logStep = slate.operation("snapshot", {
  "name" : "loggedSteps",
  "save" : true,
  "stack" : true
});

var stepBack = slate.operation("activate-snapshot", {
  "name" : "loggedSteps",
  "delete" : true,
});

/*
 * Define Operations
 */

var DEFAULT_UNIT = 20;

var operations = {
  // Move window
  moveDown: slate.operation("nudge", {
    "x" : "+0",
    "y" : "+" + DEFAULT_UNIT,
  }),
  moveUp: slate.operation("nudge", {
    "x" : "+0",
    "y" : "-" + DEFAULT_UNIT,
  }),
  moveRight: slate.operation("nudge", {
    "x" : "+" + DEFAULT_UNIT,
    "y" : "+0",
  }),
  moveLeft: slate.operation("nudge", {
    "x" : "-" + DEFAULT_UNIT,
    "y" : "+0",
  }),
  // Resize window
  increaseHeight: slate.operation("resize", {
    "width" : "+0",
    "height" : "+" + DEFAULT_UNIT * 2,
  }),
  decreaseHeight: slate.operation("resize", {
    "width" : "+0",
    "height" : "-" + DEFAULT_UNIT * 2,
  }),
  increaseWidth: slate.operation("resize", {
    "width" : "+" + DEFAULT_UNIT * 2,
    "height" : "+0",
  }),
  decreaseWidth: slate.operation("resize", {
    "width" : "-" + DEFAULT_UNIT * 2,
    "height" : "+0",
  }),
  moveToCenter: slate.operation("move", {
    "x" : "(screenOriginX+screenSizeX/2)-(windowSizeX/2)",
    "y" : "(screenOriginY+screenSizeY/2)-(windowSizeY/2)",
    "width" : "windowSizeX",
    "height" : "windowSizeY",
  }),
  moveAndResizeToCenter: slate.operation("move", {
    "x" : "screenOriginX+screenSizeX/10",
    "y" : "screenOriginY+screenSizeY/10",
    "width" : "screenSizeX*0.8",
    "height" : "screenSizeY*0.8",
  }),
  fullScreen: slate.operation("move", {
    "x" : "screenOriginX",
    "y" : "screenOriginY",
    "width" : "screenSizeX",
    "height" : "screenSizeY",
  }),
  moveToNextScreen: slate.operation("throw", {
    "screen" : getNextScreenID,
    "x" : "(screenOriginX+screenSizeX/2)-(min({windowSizeX,screenSizeX})/2)",
    "y" : "(screenOriginY+screenSizeY/2)-(min({windowSizeY,screenSizeY})/2)",
    "width" : "min({windowSizeX,screenSizeX})",
    "height" : "min({windowSizeY,screenSizeY})",
  }),
};

/*
 * Bind Keys
 */

// Move focus: Hyper + HJKL
slate.bind(withHyperKey('j'), slate.operation("focus", { "direction" : "down" }), true);
slate.bind(withHyperKey('k'), slate.operation("focus", { "direction" : "up" }), true);
slate.bind(withHyperKey('h'), slate.operation("focus", { "direction" : "left" }), true);
slate.bind(withHyperKey('l'), slate.operation("focus", { "direction" : "right" }), true);

// Move window: Hyper + Option + HJKL
slate.bind(withHyperKey('j', true), function (win) {
  win.doOperation(logStep);
  win.doOperation(operations.moveDown);
}, true);
slate.bind(withHyperKey('k', true), function (win) {
  win.doOperation(logStep);
  win.doOperation(operations.moveUp);
}, true);
slate.bind(withHyperKey('h', true), function (win) {
  win.doOperation(logStep);
  win.doOperation(operations.moveLeft);
}, true);
slate.bind(withHyperKey('l', true), function (win) {
  win.doOperation(logStep);
  win.doOperation(operations.moveRight);
}, true);

// Resize window: Hyper + Option + NM,.
slate.bind(withHyperKey('m', true), function (win) {
  win.doOperation(logStep);
  win.doOperation(slate.operation("sequence", {
    "operations" : [
      operations.increaseHeight,
      operations.moveUp,
    ],
  }));
}, true);
slate.bind(withHyperKey(',', true), function (win) {
  win.doOperation(logStep);
  win.doOperation(slate.operation("sequence", {
    "operations" : [
      operations.decreaseHeight,
      operations.moveDown,
    ],
  }));
}, true);
slate.bind(withHyperKey('n', true), function (win) {
  win.doOperation(logStep);
  win.doOperation(slate.operation("sequence", {
    "operations" : [
      operations.decreaseWidth,
      operations.moveRight,
    ],
  }));
}, true);
slate.bind(withHyperKey('.', true), function (win) {
  win.doOperation(logStep);
  win.doOperation(slate.operation("sequence", {
    "operations" : [
      operations.increaseWidth,
      operations.moveLeft,
    ],
  }));
}, true);

// Layout window: Hyper + Option + o0-
slate.bind(withHyperKey('o', true), function (win) {
  win.doOperation(logStep);
  win.doOperation(operations.moveToCenter);
}, true);
slate.bind(withHyperKey('0', true), function (win) {
  win.doOperation(logStep);
  win.doOperation(operations.moveAndResizeToCenter);
}, true);
slate.bind(withHyperKey('-', true), function (win) {
  win.doOperation(logStep);
  win.doOperation(operations.fullScreen);
}, true);
slate.bind(withHyperKey('p', true), function (win) {
  win.doOperation(logStep);
  win.doOperation(operations.moveToNextScreen);
}, true);

// Undo
slate.bind(withHyperKey('u', true), function (win) {
  win.doOperation(stepBack);
}, true);

/*
 * Events
 */

slate.on("appActivated", function (event, app) {
  // Hide Franz when lose focus
  if (app.name() != 'Franz' && app.name() != 'Flycut') {
    slate.operation("hide", {
      "app" : 'Franz',
    }).run();
  }

  // Fix Franz window size
  if (app.name() === 'Franz') {
    app.mainWindow().doOperation(slate.operation("move", {
      "x" : "screenOriginX+screenSizeX/2-min({screenSizeX*0.9,1152})/2",
      "y" : "screenOriginY+screenSizeY/2-min({screenSizeY*0.9,780})/2",
      "width" : "min({screenSizeX*0.9,1152})",
      "height" : "min({screenSizeY*0.9,780})",
    }));
  }

  // Fix Dash window size
  if (app.name() === 'Dash') {
    app.mainWindow().doOperation(slate.operation("move", {
      "x" : "screenOriginX+screenSizeX/2-min({screenSizeX*0.9,1024})/2",
      "y" : "screenOriginY+screenSizeY/2-min({screenSizeY*0.9,780})/2",
      "width" : "min({screenSizeX*0.9,1024})",
      "height" : "min({screenSizeY*0.9,780})",
    }));
  }
});
