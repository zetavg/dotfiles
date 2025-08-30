export default {
  description: 'ThinkPad TrackPoint Keyboard II Middle Mouse Button Remap',
  manipulators: [
    {
      conditions: [
        {
          type: 'device_if',
          identifiers: [
            {
              is_keyboard: true,
              is_pointing_device: true,
              product_id: 24801,
              vendor_id: 6127,
            },
          ],
        },
      ],
      from: {
        pointing_button: 'button3',
        modifiers: {
          optional: ['caps_lock', 'control', 'command', 'shift', 'option'],
        },
      },
      to: [
        {
          set_variable: {
            name: 'thinkpad_trackpoint_keyboard_button3_down',
            value: 1,
          },
        },
      ],
      to_after_key_up: [
        {
          set_variable: {
            name: 'thinkpad_trackpoint_keyboard_button3_down',
            value: 0,
          },
        },
      ],
      to_if_alone: [
        {
          key_code: 'vk_none',
        },
      ],
      type: 'basic',
    },
    {
      conditions: [
        {
          type: 'device_if',
          identifiers: [
            {
              is_keyboard: true,
              is_pointing_device: true,
              product_id: 24801,
              vendor_id: 6127,
            },
          ],
        },
        {
          type: 'variable_if',
          name: 'thinkpad_trackpoint_keyboard_button3_down',
          value: 1,
        },
      ],
      from: {
        pointing_button: 'button1',
        modifiers: {
          optional: ['caps_lock', 'control', 'command', 'shift', 'option'],
        },
      },
      to: [
        {
          pointing_button: 'button3',
        },
      ],
      type: 'basic',
    },
    {
      conditions: [
        {
          type: 'device_if',
          identifiers: [
            {
              is_keyboard: true,
              is_pointing_device: true,
              product_id: 24801,
              vendor_id: 6127,
            },
          ],
        },
        {
          type: 'variable_if',
          name: 'thinkpad_trackpoint_keyboard_button3_down',
          value: 1,
        },
      ],
      from: {
        key_code: 'f',
      },
      to: [
        {
          pointing_button: 'button3',
        },
      ],
      type: 'basic',
    },
    // Browser back / forward
    {
      conditions: [
        {
          type: 'device_if',
          identifiers: [
            {
              is_keyboard: true,
              is_pointing_device: true,
              product_id: 24801,
              vendor_id: 6127,
            },
          ],
        },
        {
          type: 'variable_if',
          name: 'thinkpad_trackpoint_keyboard_button3_down',
          value: 1,
        },
      ],
      from: {
        key_code: 'g',
      },
      to: [
        {
          key_code: 'open_bracket',
          modifiers: ['command'],
        },
      ],
      type: 'basic',
    },
    {
      conditions: [
        {
          type: 'device_if',
          identifiers: [
            {
              is_keyboard: true,
              is_pointing_device: true,
              product_id: 24801,
              vendor_id: 6127,
            },
          ],
        },
        {
          type: 'variable_if',
          name: 'thinkpad_trackpoint_keyboard_button3_down',
          value: 1,
        },
      ],
      from: {
        key_code: 'h',
      },
      to: [
        {
          key_code: 'close_bracket',
          modifiers: ['command'],
        },
      ],
      type: 'basic',
    },
    // Simulate four finger swipe up / down
    {
      conditions: [
        {
          type: 'device_if',
          identifiers: [
            {
              is_keyboard: true,
              is_pointing_device: true,
              product_id: 24801,
              vendor_id: 6127,
            },
          ],
        },
        {
          type: 'variable_if',
          name: 'thinkpad_trackpoint_keyboard_button3_down',
          value: 1,
        },
      ],
      from: {
        key_code: 'y',
      },
      to: [
        {
          key_code: 'up_arrow',
          modifiers: ['left_control'],
        },
      ],
      type: 'basic',
    },
    {
      conditions: [
        {
          type: 'device_if',
          identifiers: [
            {
              is_keyboard: true,
              is_pointing_device: true,
              product_id: 24801,
              vendor_id: 6127,
            },
          ],
        },
        {
          type: 'variable_if',
          name: 'thinkpad_trackpoint_keyboard_button3_down',
          value: 1,
        },
      ],
      from: {
        key_code: 'b',
      },
      to: [
        {
          key_code: 'down_arrow',
          modifiers: ['left_control'],
        },
      ],
      type: 'basic',
    },
    // Simulate four finger swipe left / right
    {
      conditions: [
        {
          type: 'device_if',
          identifiers: [
            {
              is_keyboard: true,
              is_pointing_device: true,
              product_id: 24801,
              vendor_id: 6127,
            },
          ],
        },
        {
          type: 'variable_if',
          name: 'thinkpad_trackpoint_keyboard_button3_down',
          value: 1,
        },
      ],
      from: {
        key_code: 'v',
      },
      to: [
        {
          key_code: 'left_arrow',
          modifiers: ['left_control'],
        },
      ],
      type: 'basic',
    },
    {
      conditions: [
        {
          type: 'device_if',
          identifiers: [
            {
              is_keyboard: true,
              is_pointing_device: true,
              product_id: 24801,
              vendor_id: 6127,
            },
          ],
        },
        {
          type: 'variable_if',
          name: 'thinkpad_trackpoint_keyboard_button3_down',
          value: 1,
        },
      ],
      from: {
        key_code: 'n',
      },
      to: [
        {
          key_code: 'right_arrow',
          modifiers: ['left_control'],
        },
      ],
      type: 'basic',
    },
    // Command + ...    %>
    {
      conditions: [
        {
          type: 'device_if',
          identifiers: [
            {
              is_keyboard: true,
              is_pointing_device: true,
              product_id: 24801,
              vendor_id: 6127,
            },
          ],
        },
        {
          type: 'variable_if',
          name: 'thinkpad_trackpoint_keyboard_button3_down',
          value: 1,
        },
      ],
      from: {
        key_code: 'j',
      },
      to: [
        {
          key_code: 'j',
          modifiers: ['left_command'],
        },
      ],
      type: 'basic',
    },
    {
      conditions: [
        {
          type: 'device_if',
          identifiers: [
            {
              is_keyboard: true,
              is_pointing_device: true,
              product_id: 24801,
              vendor_id: 6127,
            },
          ],
        },
        {
          type: 'variable_if',
          name: 'thinkpad_trackpoint_keyboard_button3_down',
          value: 1,
        },
      ],
      from: {
        key_code: 'k',
      },
      to: [
        {
          key_code: 'k',
          modifiers: ['left_command'],
        },
      ],
      type: 'basic',
    },
    {
      conditions: [
        {
          type: 'device_if',
          identifiers: [
            {
              is_keyboard: true,
              is_pointing_device: true,
              product_id: 24801,
              vendor_id: 6127,
            },
          ],
        },
        {
          type: 'variable_if',
          name: 'thinkpad_trackpoint_keyboard_button3_down',
          value: 1,
        },
      ],
      from: {
        key_code: 'u',
      },
      to: [
        {
          key_code: 'w',
          modifiers: ['left_command'],
        },
      ],
      type: 'basic',
    },
    {
      conditions: [
        {
          type: 'device_if',
          identifiers: [
            {
              is_keyboard: true,
              is_pointing_device: true,
              product_id: 24801,
              vendor_id: 6127,
            },
          ],
        },
        {
          type: 'variable_if',
          name: 'thinkpad_trackpoint_keyboard_button3_down',
          value: 1,
        },
      ],
      from: {
        key_code: 't',
      },
      to: [
        {
          key_code: 't',
          modifiers: ['left_command'],
        },
      ],
      type: 'basic',
    },
  ],
};
