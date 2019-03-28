--- === Basic Definitions ===

-- Show debug notifications
local debug = false

-- Window operation modification key
local winOpMods = {"ctrl", "cmd"}
-- Window modification modification key
local winMdMods = {"ctrl", "option", "cmd"}

-- Apps that should not be considered as normal windows
local floatingAppNames = {
  "1Password 6",
  "1Password",
  "Alfred 3",
  "Alfred",
  -- "App Store",
  -- "Bear",
  -- "Calendar",
  -- "Contacts",
  -- "DaisyDisk",
  "Dash",
  "Evernote", -- For Evernote Helper
  "Flycut",
  "Franz",
  -- "ImageAlpha",
  -- "ImageOptim",
  -- "iTunes",
  "LICEcap",
  -- "Notes",
  -- "OmniFocus",
  -- "Photos",
  -- "Spotify",
  -- "Station",
  -- "便條紙",
  -- "備忘錄",
  -- "地圖",
  -- "字體簿",
  -- "提醒事項",
  -- "文字編輯",
  -- "照片",
  -- "系統偏好設定",
  -- "聯絡資訊",
  -- "行事曆",
  -- "計算機",
  -- "訊息",
  -- "辭典"
}

hs.window.animationDuration = 0

--- === Focusing Windows ===

-- This is done by Slate now because it's much faster

-- -- hs.hotkey.bind(winOpMods, "left", function()
-- --   hs.window:focusedWindow():focusWindowWest()
-- -- end)
-- hs.hotkey.bind(winOpMods, "H", function()
--   hs.window:focusedWindow():focusWindowWest()
-- end)

-- -- hs.hotkey.bind(winOpMods, "down", function()
-- --   hs.window:focusedWindow():focusWindowSouth()
-- -- end)
-- hs.hotkey.bind(winOpMods, "J", function()
--   hs.window:focusedWindow():focusWindowSouth()
-- end)

-- -- hs.hotkey.bind(winOpMods, "up", function()
-- --   hs.window:focusedWindow():focusWindowNorth()
-- -- end)
-- hs.hotkey.bind(winOpMods, "K", function()
--   hs.window:focusedWindow():focusWindowNorth()
-- end)

-- -- hs.hotkey.bind(winOpMods, "right", function()
-- --   hs.window:focusedWindow():focusWindowEast()
-- -- end)
-- hs.hotkey.bind(winOpMods, "L", function()
--   hs.window:focusedWindow():focusWindowEast()
-- end)

--- === Moving Windows ===

-- This is done by Slate now because it's much faster

-- -- hs.hotkey.bind(winMdMods, "left", function()
-- --   hs.window:focusedWindow():move({-16, 0})
-- -- end)
-- hs.hotkey.bind(winMdMods, "H", function()
--   hs.window:focusedWindow():move({-16, 0})
-- end)

-- -- hs.hotkey.bind(winMdMods, "down", function()
-- --   hs.window:focusedWindow():move({0, 16})
-- -- end)
-- hs.hotkey.bind(winMdMods, "J", function()
--   hs.window:focusedWindow():move({0, 16})
-- end)

-- -- hs.hotkey.bind(winMdMods, "up", function()
-- --   hs.window:focusedWindow():move({0, -16})
-- -- end)
-- hs.hotkey.bind(winMdMods, "K", function()
--   hs.window:focusedWindow():move({0, -16})
-- end)

-- -- hs.hotkey.bind(winMdMods, "right", function()
-- --   hs.window:focusedWindow():move({16, 0})
-- -- end)
-- hs.hotkey.bind(winMdMods, "L", function()
--   hs.window:focusedWindow():move({16, 0})
-- end)

--- === Resize Windows ===

-- This is done by Slate now because it's much faster

-- hs.hotkey.bind(winMdMods, "N", function()
--   local originalSize = hs.window:focusedWindow():size()
--   hs.window:focusedWindow():setSize(originalSize.w - 16, originalSize.h)
-- end)

-- hs.hotkey.bind(winMdMods, "M", function()
--   local originalSize = hs.window:focusedWindow():size()
--   hs.window:focusedWindow():setSize(originalSize.w, originalSize.h + 16)
-- end)

-- hs.hotkey.bind(winMdMods, ",", function()
--   local originalSize = hs.window:focusedWindow():size()
--   hs.window:focusedWindow():setSize(originalSize.w, originalSize.h - 16)
-- end)

-- hs.hotkey.bind(winMdMods, ".", function()
--   local originalSize = hs.window:focusedWindow():size()
--   hs.window:focusedWindow():setSize(originalSize.w + 16, originalSize.h)
-- end)

--- === More Operation On Windows ===

hs.hotkey.bind(winMdMods, 'O', function()
  hs.window:focusedWindow():centerOnScreen()
end)

hs.hotkey.bind(winMdMods, 'P', function()
  local win = hs.window:focusedWindow()
  win:moveToScreen(win:screen():next(), true)
end)

hs.hotkey.bind(winMdMods, '0', function()
  local window = hs.window:focusedWindow()
  local screen = window:screen()
  local frame = screen:frame()
  local h = frame.h * 0.83
  local w = frame.w * 0.72
  window:setSize(w, h)
  window:centerOnScreen()
end)

hs.hotkey.bind(winMdMods, '-', function()
  hs.window:focusedWindow():maximize()
end)

hs.hotkey.bind(winMdMods, '=', function()
  hs.window:focusedWindow():maximize()
end)

hs.hotkey.bind(winMdMods, ']', nil, function()
  moveFocusedWindowToAdjacentSpace('right')
end)

hs.hotkey.bind(winMdMods, '[', nil, function()
  moveFocusedWindowToAdjacentSpace('left')
end)

hs.hotkey.bind(winMdMods, '4', nil, function()
  local image = hs.window:focusedWindow():snapshot()
  if not image then return end
  image:saveToFile(string.format('~/Desktop/Screen Shot %s.png', os.date('%Y-%m-%d at %I.%M.%S %p')))
end)

--- === App Event Handling ===

function franzWatchFunction(appName, eventType, appObject)
  if appName == "Franz" then
    if
      eventType == hs.application.watcher.unhidden or
      eventType == hs.application.watcher.activated or
      eventType == hs.application.watcher.launched
    then
      local window = appObject:mainWindow()
      local screen = window:screen()
      local frame = screen:frame()
      local maxH = frame.h * 0.9
      local maxW = frame.w * 0.9
      local h = 920
      local w = 1152
      window:setSize(math.min(w, maxW), math.min(h, maxH))
      window:centerOnScreen()

    elseif eventType == hs.application.watcher.deactivated then
      local activatedApp = hs.application.frontmostApplication()
      if not isFloatingApp(activatedApp) then
        if debug then hs.alert.show("Franz lose focus, hidding") end
        appObject:hide()
      end
    end
  end
end
franzWatcher = hs.application.watcher.new(franzWatchFunction)
franzWatcher:start()

function dashWatchFunction(appName, eventType, appObject)
  if appName == "Dash" then
    if
      eventType == hs.application.watcher.unhidden or
      eventType == hs.application.watcher.activated or
      eventType == hs.application.watcher.launched
    then
      local window = appObject:mainWindow()
      local screen = window:screen()
      local frame = screen:frame()
      local maxH = frame.h * 0.9
      local maxW = frame.w * 0.9
      local h = 920
      local w = 1152
      window:setSize(math.min(w, maxW), math.min(h, maxH))
      window:centerOnScreen()

    elseif eventType == hs.application.watcher.deactivated then
      local activatedApp = hs.application.frontmostApplication()
      local activatedApp = hs.application.frontmostApplication()
      if not isFloatingApp(activatedApp) then
        appObject:hide()
      end
    end
  end
end
dashWatcher = hs.application.watcher.new(dashWatchFunction)
dashWatcher:start()

--- === Extended Functions ===

function isFloatingApp(app)
  local appName = app:name()
  return tableContains(floatingAppNames, appName)
end

-- function nextScreen()
--   return nextOfTable(hs.screen.allScreens(), hs.screen.mainScreen())
-- end

-- move a window to an adjacent Space
local mouseOrigin
local inMove = 0
function moveFocusedWindowToAdjacentSpace(direction)
  local win = hs.window.focusedWindow()
  if not win then return end
  local clickPoint = win:zoomButtonRect()
  if inMove == 0 then mouseOrigin = hs.mouse.getAbsolutePosition() end

  clickPoint.x = clickPoint.x + clickPoint.w + 5
  clickPoint.y = clickPoint.y + (clickPoint.h / 2)
  local mouseClickEvent = hs.eventtap.event.newMouseEvent(hs.eventtap.event.types.leftMouseDown, clickPoint)
  mouseClickEvent:post()

  local nextSpaceDownEvent = hs.eventtap.event.newKeyEvent({"ctrl"}, direction, true)
   nextSpaceDownEvent:post()
   inMove = inMove + 1  -- nested moves possible, ensure reentrancy

   hs.timer.doAfter(.1, function()
    local nextSpaceUpEvent = hs.eventtap.event.newKeyEvent({"ctrl"}, direction, false)
    nextSpaceUpEvent:post()
    -- wait to release the mouse to avoid sticky window syndrome
    hs.timer.doAfter(.25, function()
      local mouseReleaseEvent = hs.eventtap.event.newMouseEvent(hs.eventtap.event.types.leftMouseUp, clickPoint)
      mouseReleaseEvent:post()
      inMove = math.max(0, inMove - 1)
      if inMove == 0 then hs.mouse.setAbsolutePosition(mouseOrigin) end
    end)
  end)
end

--- === Helper Functions ===

function tableContains(table, val)
  for i = 1, #table do
    if table[i] == val then
      return true
    end
  end
  return false
end

-- function nextOfTable(table, val)
--   for i = 1, (#table - 1) do
--     if table[i] == val then
--       return table[i + 1]
--     end
--   end

--   return table[1]
-- end

--- === Reload Configuration ===

hs.hotkey.bind({"cmd", "alt", "ctrl", "shift"}, "H", function()
  hs.reload()
  hs.notify.new({title="Hammerspoon", informativeText="Reloading"}):send()
end)

hs.hotkey.bind({"cmd", "alt", "ctrl", "shift"}, "R", function()
  hs.reload()
  hs.notify.new({title="Hammerspoon", informativeText="Reloading"}):send()
end)

--- === Auto Reload Configuration ===

hs.loadSpoon("ReloadConfiguration")
spoon.ReloadConfiguration:start()

--- === Inbox ===

hs.hotkey.bind({"cmd", "alt", "ctrl"}, "W", function()
  hs.notify.new({title="Hammerspoon", informativeText="Hello World!!"}):send()
end)
