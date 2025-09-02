--- === AutoWindowLayout ===
---
--- Auto layout windows.

local obj = {}
obj.__index = obj

-- Metadata
obj.name = "AutoWindowLayout"
obj.version = "0.1"

local function autoWindowLayout()
  -- hs.notify.new({title="AutoWindowLayout", informativeText="autoWindowLayout called"}):send()

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

        if appName == "Code" then
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
          })

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
          })

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
          })
        end
      end
    end
  end
end


function obj:bindHotkey(mods, key)
  hs.hotkey.bind(mods, key, autoWindowLayout)
end


return obj
