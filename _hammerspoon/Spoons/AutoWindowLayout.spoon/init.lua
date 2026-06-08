--- === AutoWindowLayout ===
---
--- Auto layout windows.

local obj = {}
obj.__index = obj

-- Metadata
obj.name = "AutoWindowLayout"
obj.version = "0.1"

-- Multiple passes let the macOS window server settle between AX API calls,
-- ensuring windows reach their final position in a single hotkey press.
local totalPasses = 1
local delayBetweenPasses = 0.01 -- seconds

-- State for the in-progress overlay
local activeAlertUUID = nil

local function layoutWindows()
  -- Get the current focused space
  local currentSpaceId = hs.spaces.focusedSpace()

  -- Get all windows in the current space
  local windowIds = hs.spaces.windowsForSpace(currentSpaceId)

  for _, windowId in ipairs(windowIds) do
    local win = hs.window.get(windowId)

    if win and win:isVisible() and win:isStandard() then
      local app = win:application()

      if app then
        local appName = app:name()
        local screen = win:screen()
        local screenFrame = screen:frame()

        if appName == "Code" or appName == "Cursor" then
          -- Calculate width
          local width = screenFrame.w - 8
          width = math.min(width, 1600)
          if screenFrame.w <= 1440 then
            width = screenFrame.w
          end

          -- Calculate height
          local marginTop = 4
          local marginBottom = 8
          if screenFrame.h <= 1024 then
            marginTop = 0
            marginBottom = 4
          end
          if string.find(screen:name(), "Sidecar Display") then
            marginBottom = 32
          end

          local height = screenFrame.h - marginTop - marginBottom

          -- Calculate position (horizontally center)
          local x = screenFrame.x + (screenFrame.w - width) / 2
          local y = screenFrame.y + marginTop

          win:setFrame({
            x = x,
            y = y,
            w = width,
            h = height
          }, 0)

        elseif appName == "iTerm2" or appName == "iTerm" then
          -- Do not resize, only position
          local currentFrame = win:frame()

          -- Calculate right position
          local right = 4
          if screenFrame.w <= 1800 then
            right = 0
          end

          local x = screenFrame.x + screenFrame.w - currentFrame.w - right

          -- Calculate bottom position
          local bottom = 8
          if string.find(screen:name(), "Sidecar Display") then
            bottom = 20
          end

          local y = screenFrame.y + screenFrame.h - currentFrame.h - bottom

          win:setFrame({
            x = x,
            y = y,
            w = currentFrame.w,
            h = currentFrame.h
          }, 0)

        elseif appName == "Tower" then
          -- Do not resize, only position
          local currentFrame = win:frame()

          -- Calculate left position
          local left = 4
          if screenFrame.w <= 1800 then
            left = 0
          end

          local x = screenFrame.x + left

          -- Calculate top position
          local top = 4
          if screenFrame.h <= 1024 then
            top = 0
          end

          local y = screenFrame.y + top

          win:setFrame({
            x = x,
            y = y,
            w = currentFrame.w,
            h = currentFrame.h
          }, 0)
        end
      end
    end
  end
end

local function autoWindowLayout()
  -- Close any existing overlay from a previous invocation
  if activeAlertUUID then
    hs.alert.closeSpecific(activeAlertUUID)
    activeAlertUUID = nil
  end

  -- Show overlay to indicate work in progress
  activeAlertUUID = hs.alert.show(
    "Arranging windows…",
    {
      strokeWidth  = 0,
      strokeColor = { white = 0, alpha = 0 },
      fillColor   = { white = 0, alpha = 0.9 },
      textColor = { white = 1, alpha = 0.9 },
      textFont  = ".AppleSystemUIFont",
      textSize  = 28,
      radius = 24,
      atScreenEdge = 0,
      fadeInDuration = 0.04,
      fadeOutDuration = 0.04,
      padding = 20,
    },
    hs.screen.mainScreen(),
    10
  )

  print("Starting AutoWindowLayout with " .. totalPasses .. " passes and " .. delayBetweenPasses .. "s delay between passes. Alert UUID: " .. activeAlertUUID)

  local passesRemaining = totalPasses

  local function runPass()
    print("Running pass, remaining: " .. passesRemaining)
    layoutWindows()
    passesRemaining = passesRemaining - 1

    if passesRemaining > 0 then
      hs.timer.doAfter(delayBetweenPasses, runPass)
    else
      -- All passes complete, dismiss overlay
      if activeAlertUUID then
        print("All passes complete, closing alert")
        hs.alert.closeSpecific(activeAlertUUID)
        activeAlertUUID = nil
      end
    end
  end

  -- Defer the first pass so the run loop can render the alert first
  hs.timer.doAfter(0.05, runPass)
end


function obj:bindHotkey(mods, key)
  hs.hotkey.bind(mods, key, autoWindowLayout)
end


return obj
