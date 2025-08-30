export default {
  description: 'Vi Mode [;]',
  manipulators: [
    {
      from: {
        key_code: 'semicolon',
        modifiers: {
          optional: ['caps_lock', 'control', 'command', 'shift', 'option'],
        },
      },
      to: [
        {
          set_variable: {
            name: 'vi_mode',
            value: 1,
          },
        },
        {
          set_variable: {
            name: 'vi_repeat_key_for',
            value: 0,
          },
        },
      ],
      to_after_key_up: [
        {
          set_variable: {
            name: 'vi_mode',
            value: 0,
          },
        },
        {
          set_variable: {
            name: 'vi_repeat_key_for',
            value: 0,
          },
        },
      ],
      to_if_alone: [
        {
          key_code: 'semicolon',
        },
      ],
      type: 'basic',
    },
    {
      type: 'mouse_motion_to_scroll',
      conditions: [
        {
          type: 'variable_if',
          name: 'vi_mode',
          value: 1,
        },
      ],
      options: {
        momentum_scroll_enabled: false,
        speed_multiplier: 1.0,
      },
    },
  ],
};
