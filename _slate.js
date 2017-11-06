/*
 * Slate Config
 */

/* global slate */

slate.configAll({
  repeatOnHoldOps: 'resize,nudge',
  secondsBeforeRepeat: 0.4,
  secondsBetweenRepeat: 0.05,
  keyboardLayout: 'qwerty',
  snapshotMaxStackSize: 1000,
  undoMaxStackSize: 1000,
  windowHintsIgnoreHiddenWindows: true,
  windowHintsSpread: true,
})

/*
 * Define Keys
 */

/* eslint-disable no-var, vars-on-top */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

var hyperKey = 'ctrl;shift'

/*
 * Define Operations
 */

/* eslint-disable prefer-template */

var DEFAULT_UNIT = 32

var operations = {
  // Focus window
  focusDown: slate.operation('focus', { direction: 'down' }),
  focusUp: slate.operation('focus', { direction: 'up' }),
  focusLeft: slate.operation('focus', { direction: 'left' }),
  focusRight: slate.operation('focus', { direction: 'right' }),
  // Move window
  moveDown: slate.operation('nudge', {
    x: '+0',
    y: '+' + DEFAULT_UNIT,
  }),
  moveUp: slate.operation('nudge', {
    x: '+0',
    y: '-' + DEFAULT_UNIT,
  }),
  moveRight: slate.operation('nudge', {
    x: '+' + DEFAULT_UNIT,
    y: '+0',
  }),
  moveLeft: slate.operation('nudge', {
    x: '-' + DEFAULT_UNIT,
    y: '+0',
  }),
  // Resize window
  increaseHeight: slate.operation('resize', {
    width: '+0',
    height: '+' + (DEFAULT_UNIT * 2),
  }),
  decreaseHeight: slate.operation('resize', {
    width: '+0',
    height: '-' + (DEFAULT_UNIT * 2),
  }),
  increaseWidth: slate.operation('resize', {
    width: '+' + (DEFAULT_UNIT * 2),
    height: '+0',
  }),
  decreaseWidth: slate.operation('resize', {
    width: '-' + (DEFAULT_UNIT * 2),
    height: '+0',
  }),
  moveToCenter: slate.operation('move', {
    x: '(screenOriginX+screenSizeX/2)-(windowSizeX/2)',
    y: '(screenOriginY+screenSizeY/2)-(windowSizeY/2)',
    width: 'windowSizeX',
    height: 'windowSizeY',
  }),
  moveAndResizeToCenter: slate.operation('move', {
    x: 'screenOriginX+screenSizeX/10',
    y: 'screenOriginY+screenSizeY/10',
    width: 'screenSizeX*0.8',
    height: 'screenSizeY*0.8',
  }),
  fullScreen: slate.operation('move', {
    x: 'screenOriginX',
    y: 'screenOriginY',
    width: 'screenSizeX',
    height: 'screenSizeY',
  }),
  moveToNextScreen: slate.operation('throw', {
    screen: getNextScreenID,
    x: '(screenOriginX+screenSizeX/2)-(min({windowSizeX,screenSizeX})/2)',
    y: '(screenOriginY+screenSizeY/2)-(min({windowSizeY,screenSizeY})/2)',
    width: 'min({windowSizeX,screenSizeX})',
    height: 'min({windowSizeY,screenSizeY})',
  }),
  hideFranz: slate.operation('hide', {
    app: 'Franz',
  }),
  hideStation: slate.operation('hide', {
    app: 'Station',
  }),
}

/*
 * Bind Keys
 */

// Move focus: Hyper + HJKL
slate.bind(withHyperKey('j'), operations.focusDown, true)
slate.bind(withHyperKey('k'), operations.focusUp, true)
slate.bind(withHyperKey('h'), operations.focusLeft, true)
slate.bind(withHyperKey('l'), operations.focusRight, true)

// Move window: Hyper + cmd + HJKL
slate.bind(withHyperKey('j', { cmd: true }), function (win) {
  if (isDesktopTiling()) return
  win.doOperation(operations.moveDown)
}, true)
slate.bind(withHyperKey('k', { cmd: true }), function (win) {
  if (isDesktopTiling()) return
  win.doOperation(operations.moveUp)
}, true)
slate.bind(withHyperKey('h', { cmd: true }), function (win) {
  if (isDesktopTiling()) return
  win.doOperation(operations.moveLeft)
}, true)
slate.bind(withHyperKey('l', { cmd: true }), function (win) {
  if (isDesktopTiling()) return
  win.doOperation(operations.moveRight)
}, true)

// Resize window: Hyper + Option + NM,.
slate.bind(withHyperKey('m', { cmd: true }), function (win) {
  win.doOperation(slate.operation('sequence', {
    operations: [
      operations.increaseHeight,
      operations.moveUp,
    ],
  }))
}, true)
slate.bind(withHyperKey(',', { cmd: true }), function (win) {
  win.doOperation(slate.operation('sequence', {
    operations: [
      operations.decreaseHeight,
      operations.moveDown,
    ],
  }))
}, true)
slate.bind(withHyperKey('n', { cmd: true }), function (win) {
  win.doOperation(slate.operation('sequence', {
    operations: [
      operations.decreaseWidth,
      operations.moveRight,
    ],
  }))
}, true)
slate.bind(withHyperKey('.', { cmd: true }), function (win) {
  win.doOperation(slate.operation('sequence', {
    operations: [
      operations.increaseWidth,
      operations.moveLeft,
    ],
  }))
}, true)

// Layout window: Hyper + Option + o0-
slate.bind(withHyperKey('o', { cmd: true }), function (win) {
  win.doOperation(operations.moveToCenter)
}, true)
slate.bind(withHyperKey('0', { cmd: true }), function (win) {
  win.doOperation(operations.moveAndResizeToCenter)
}, true)
slate.bind(withHyperKey('-', { cmd: true }), function (win) {
  win.doOperation(operations.fullScreen)
}, true)
slate.bind(withHyperKey('p', { cmd: true }), function (win) {
  win.doOperation(operations.moveToNextScreen)
}, true)

/*
 * Windw Control
 */

slate.on('appActivated', function (event, app) {
  slate.log('appActivated: ' + app.name())
  // Hide Franz when lose focus
  if (app.name() !== 'Franz' && app.name() !== 'Flycut') {
    operations.hideFranz.run()
  }

  // Hide Station when lose focus
  if (app.name() !== 'Station' && app.name() !== 'Flycut') {
    operations.hideStation.run()
  }

  // Fix Franz window size
  if (app.name() === 'Franz') {
    app.mainWindow().doOperation(slate.operation('move', {
      x: 'screenOriginX+screenSizeX/2-min({screenSizeX*0.9,1152})/2',
      y: 'screenOriginY+screenSizeY/2-min({screenSizeY*0.9,780})/2',
      width: 'min({screenSizeX*0.9,1152})',
      height: 'min({screenSizeY*0.9,780})',
    }))
  }

  // Fix Station window size
  if (app.name() === 'Station') {
    app.mainWindow().doOperation(slate.operation('move', {
      x: 'screenOriginX+screenSizeX/2-min({screenSizeX*0.9,1152})/2',
      y: 'screenOriginY+screenSizeY/2-min({screenSizeY*0.9,780})/2',
      width: 'min({screenSizeX*0.9,1152})',
      height: 'min({screenSizeY*0.9,780})',
    }))
  }

  // Fix Dash window size
  if (app.name() === 'Dash') {
    app.mainWindow().doOperation(slate.operation('move', {
      x: 'screenOriginX+screenSizeX/2-min({screenSizeX*0.9,1024})/2',
      y: 'screenOriginY+screenSizeY/2-min({screenSizeY*0.9,780})/2',
      width: 'min({screenSizeX*0.9,1024})',
      height: 'min({screenSizeY*0.9,780})',
    }))
  }
})

/*
 * Helpers
 */

function withHyperKey(key, options) {
  if (options) {
    if (options.cmd) {
      return key + ':' + hyperKey + ';cmd'
    }
  }
  return key + ':' + hyperKey
}

function getNextScreenID() {
  var currentScreen = slate.screen()
  var currentScreenID = currentScreen.id()
  var nextScreenID = currentScreenID + 1
  if (nextScreenID >= slate.screenCount()) nextScreenID = 0
  return nextScreenID.toString()
}

function getDesktopMode() {
  var mode = slate.shell('/usr/local/bin/chunkc tiling::query --desktop mode', true)
  slate.log('desktopMode: ' + mode)
  return mode
}

function isDesktopTiling() {
  var mode = getDesktopMode()
  return mode === 'bsp' || mode === 'monocle'
}

///////////

/*
 * Define Keys
 */

// var hyperKey = 'cmd;shift';
// var optionKey = 'alt';

// function withHyperKey(key, option) {
//   if (option) {
//     return key + ':' + hyperKey + ';' + optionKey;
//   } else {
//     return key + ':' + hyperKey;
//   }
// }

// /*
//  * Define Applications
//  */

// var defaultApplications = {
//   webBrowser: 'Opera Developer',
//   terminal: 'iTerm',
//   textEditor: 'Sublime Text',
// };

// /*
//  * Helpers
//  */

// function getNextScreenID() {
//   var currentScreen = slate.screen();
//   var currentScreenID = currentScreen.id();
//   var nextScreenID = currentScreenID + 1;
//   if (nextScreenID >= slate.screenCount()) nextScreenID = 0;
//   slate.log(nextScreenID);
//   return nextScreenID.toString();
// }

// /*
//  * Define Step Logging Operations
//  */

// var logStep = slate.operation("snapshot", {
//   "name" : "loggedSteps",
//   "save" : true,
//   "stack" : true
// });

// var stepBack = slate.operation("activate-snapshot", {
//   "name" : "loggedSteps",
//   "delete" : true,
// });

// /*
//  * Define Operations
//  */

// var DEFAULT_UNIT = 20;

// var operations = {
//   // Move window
//   moveDown: slate.operation("nudge", {
//     "x" : "+0",
//     "y" : "+" + DEFAULT_UNIT,
//   }),
//   moveUp: slate.operation("nudge", {
//     "x" : "+0",
//     "y" : "-" + DEFAULT_UNIT,
//   }),
//   moveRight: slate.operation("nudge", {
//     "x" : "+" + DEFAULT_UNIT,
//     "y" : "+0",
//   }),
//   moveLeft: slate.operation("nudge", {
//     "x" : "-" + DEFAULT_UNIT,
//     "y" : "+0",
//   }),
//   // Resize window
//   increaseHeight: slate.operation("resize", {
//     "width" : "+0",
//     "height" : "+" + DEFAULT_UNIT * 2,
//   }),
//   decreaseHeight: slate.operation("resize", {
//     "width" : "+0",
//     "height" : "-" + DEFAULT_UNIT * 2,
//   }),
//   increaseWidth: slate.operation("resize", {
//     "width" : "+" + DEFAULT_UNIT * 2,
//     "height" : "+0",
//   }),
//   decreaseWidth: slate.operation("resize", {
//     "width" : "-" + DEFAULT_UNIT * 2,
//     "height" : "+0",
//   }),
//   moveToCenter: slate.operation("move", {
//     "x" : "(screenOriginX+screenSizeX/2)-(windowSizeX/2)",
//     "y" : "(screenOriginY+screenSizeY/2)-(windowSizeY/2)",
//     "width" : "windowSizeX",
//     "height" : "windowSizeY",
//   }),
//   moveAndResizeToCenter: slate.operation("move", {
//     "x" : "screenOriginX+screenSizeX/10",
//     "y" : "screenOriginY+screenSizeY/10",
//     "width" : "screenSizeX*0.8",
//     "height" : "screenSizeY*0.8",
//   }),
//   fullScreen: slate.operation("move", {
//     "x" : "screenOriginX",
//     "y" : "screenOriginY",
//     "width" : "screenSizeX",
//     "height" : "screenSizeY",
//   }),
//   moveToNextScreen: slate.operation("throw", {
//     "screen" : getNextScreenID,
//     "x" : "(screenOriginX+screenSizeX/2)-(min({windowSizeX,screenSizeX})/2)",
//     "y" : "(screenOriginY+screenSizeY/2)-(min({windowSizeY,screenSizeY})/2)",
//     "width" : "min({windowSizeX,screenSizeX})",
//     "height" : "min({windowSizeY,screenSizeY})",
//   }),
// };

// /*
//  * Bind Keys
//  */

// // Move focus: Hyper + HJKL
// slate.bind(withHyperKey('j'), slate.operation("focus", { "direction" : "down" }), true);
// slate.bind(withHyperKey('k'), slate.operation("focus", { "direction" : "up" }), true);
// slate.bind(withHyperKey('h'), slate.operation("focus", { "direction" : "left" }), true);
// slate.bind(withHyperKey('l'), slate.operation("focus", { "direction" : "right" }), true);

// // Move window: Hyper + Option + HJKL
// slate.bind(withHyperKey('j', true), function (win) {
//   win.doOperation(logStep);
//   win.doOperation(operations.moveDown);
// }, true);
// slate.bind(withHyperKey('k', true), function (win) {
//   win.doOperation(logStep);
//   win.doOperation(operations.moveUp);
// }, true);
// slate.bind(withHyperKey('h', true), function (win) {
//   win.doOperation(logStep);
//   win.doOperation(operations.moveLeft);
// }, true);
// slate.bind(withHyperKey('l', true), function (win) {
//   win.doOperation(logStep);
//   win.doOperation(operations.moveRight);
// }, true);

// // Resize window: Hyper + Option + NM,.
// slate.bind(withHyperKey('m', true), function (win) {
//   win.doOperation(logStep);
//   win.doOperation(slate.operation("sequence", {
//     "operations" : [
//       operations.increaseHeight,
//       operations.moveUp,
//     ],
//   }));
// }, true);
// slate.bind(withHyperKey(',', true), function (win) {
//   win.doOperation(logStep);
//   win.doOperation(slate.operation("sequence", {
//     "operations" : [
//       operations.decreaseHeight,
//       operations.moveDown,
//     ],
//   }));
// }, true);
// slate.bind(withHyperKey('n', true), function (win) {
//   win.doOperation(logStep);
//   win.doOperation(slate.operation("sequence", {
//     "operations" : [
//       operations.decreaseWidth,
//       operations.moveRight,
//     ],
//   }));
// }, true);
// slate.bind(withHyperKey('.', true), function (win) {
//   win.doOperation(logStep);
//   win.doOperation(slate.operation("sequence", {
//     "operations" : [
//       operations.increaseWidth,
//       operations.moveLeft,
//     ],
//   }));
// }, true);

// // Layout window: Hyper + Option + o0-
// slate.bind(withHyperKey('o', true), function (win) {
//   win.doOperation(logStep);
//   win.doOperation(operations.moveToCenter);
// }, true);
// slate.bind(withHyperKey('0', true), function (win) {
//   win.doOperation(logStep);
//   win.doOperation(operations.moveAndResizeToCenter);
// }, true);
// slate.bind(withHyperKey('-', true), function (win) {
//   win.doOperation(logStep);
//   win.doOperation(operations.fullScreen);
// }, true);
// slate.bind(withHyperKey('p', true), function (win) {
//   win.doOperation(logStep);
//   win.doOperation(operations.moveToNextScreen);
// }, true);

// // Undo
// slate.bind(withHyperKey('u', true), function (win) {
//   win.doOperation(stepBack);
// }, true);

// /*
//  * Events
//  */

// slate.on("appActivated", function (event, app) {
//   slate.log("Act:" + app.name())
//   // Hide Franz when lose focus
//   if (app.name() != 'Franz' && app.name() != 'Flycut') {
//     slate.operation("hide", {
//       "app" : 'Franz',
//     }).run();
//   }

//   // Fix Franz window size
//   if (app.name() === 'Franz') {
//     app.mainWindow().doOperation(slate.operation("move", {
//       "x" : "screenOriginX+screenSizeX/2-min({screenSizeX*0.9,1152})/2",
//       "y" : "screenOriginY+screenSizeY/2-min({screenSizeY*0.9,780})/2",
//       "width" : "min({screenSizeX*0.9,1152})",
//       "height" : "min({screenSizeY*0.9,780})",
//     }));
//   }

//   // Fix Dash window size
//   if (app.name() === 'Dash') {
//     app.mainWindow().doOperation(slate.operation("move", {
//       "x" : "screenOriginX+screenSizeX/2-min({screenSizeX*0.9,1024})/2",
//       "y" : "screenOriginY+screenSizeY/2-min({screenSizeY*0.9,780})/2",
//       "width" : "min({screenSizeX*0.9,1024})",
//       "height" : "min({screenSizeY*0.9,780})",
//     }));
//   }
// });
