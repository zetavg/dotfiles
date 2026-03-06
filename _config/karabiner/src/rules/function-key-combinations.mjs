export default {
  description: 'Function Key Combinations',
  manipulators: [
    // {
    //   type: 'basic',
    //   from: {
    //     key_code: 'f1',
    //     modifiers: {
    //       mandatory: ['control'],
    //     },
    //   },
    //   to: [
    //     {
    //       key_code: 'f1',
    //       modifiers: ['control'],
    //     },
    //   ],
    // },
    // {
    //   type: 'basic',
    //   from: {
    //     key_code: 'f2',
    //     modifiers: {
    //       mandatory: ['control'],
    //     },
    //   },
    //   to: [
    //     {
    //       key_code: 'f2',
    //       modifiers: ['control'],
    //     },
    //   ],
    // },
    // {
    //   type: 'basic',
    //   from: {
    //     key_code: 'f3',
    //     modifiers: {
    //       mandatory: ['control'],
    //     },
    //   },
    //   to: [
    //     {
    //       key_code: 'f3',
    //       modifiers: ['control'],
    //     },
    //   ],
    // },
    // ...['f3', 'f10', 'f11', 'f12']
    //   .map((k) => [
    //     {
    //       type: 'basic',
    //       from: {
    //         key_code: k,
    //         modifiers: {
    //           mandatory: ['command', 'shift'],
    //         },
    //       },
    //       to: [
    //         {
    //           key_code: k,
    //           modifiers: ['command', 'shift'],
    //         },
    //       ],
    //     },
    //     {
    //       type: 'basic',
    //       from: {
    //         key_code: k,
    //         modifiers: {
    //           mandatory: ['command'],
    //         },
    //       },
    //       to: [
    //         {
    //           key_code: k,
    //           modifiers: ['command'],
    //         },
    //       ],
    //     },
    //   ])
    //   .flat(),

    // MARK: F10 Combinations
    {
      from: {
        key_code: 'f10',
      },
      to: [
        {
          set_variable: {
            name: 'f10_flag',
            value: 1,
          },
        },
      ],
      to_after_key_up: [
        {
          set_variable: {
            name: 'f10_flag',
            value: 0,
          },
        },
      ],
      to_if_alone: [
        {
          consumer_key_code: 'mute',
        },
      ],
      type: 'basic',
    },
    {
      conditions: [
        {
          name: 'f10_flag',
          type: 'variable_if',
          value: 1,
        },
      ],
      from: {
        key_code: 'f11',
      },
      to: [
        {
          key_code: 'illumination_decrement',
        },
      ],
      type: 'basic',
    },
    {
      conditions: [
        {
          name: 'f10_flag',
          type: 'variable_if',
          value: 1,
        },
      ],
      from: {
        key_code: 'f12',
      },
      to: [
        {
          key_code: 'illumination_increment',
        },
      ],
      type: 'basic',
    },
    {
      conditions: [
        {
          name: 'f10_flag',
          type: 'variable_if',
          value: 1,
        },
      ],
      from: {
        key_code: 'f8',
      },
      to: [
        {
          key_code: 'f8',
          modifiers: ['control', 'option'],
        },
      ],
      type: 'basic',
    },

    // MARK: F3 Combinations
    {
      from: {
        key_code: 'f3',
      },
      to: [
        {
          set_variable: {
            name: 'f3_flag',
            value: 1,
          },
        },
      ],
      to_after_key_up: [
        {
          set_variable: {
            name: 'f3_flag',
            value: 0,
          },
        },
      ],
      to_if_alone: [
        {
          // Note: It's not `consumer_key_code: 'mission_control'` here!
          apple_vendor_keyboard_key_code: 'mission_control',
        },
      ],
      type: 'basic',
    },
    // Auto-layout provided by Hammerspoon
    {
      conditions: [
        {
          name: 'f3_flag',
          type: 'variable_if',
          value: 1,
        },
      ],
      from: {
        key_code: 'l',
      },
      to: [
        {
          key_code: 'l',
          modifiers: ['command', 'option', 'control', 'shift'],
        },
      ],
      type: 'basic',
    },
    // Toggle Sidecar display
    {
      conditions: [
        {
          name: 'f3_flag',
          type: 'variable_if',
          value: 1,
        },
      ],
      from: {
        key_code: 'f4',
      },
      to: [{ shell_command: '~/.bin/toggle-sidecar' }],
      type: 'basic',
    },

    // MARK: F5 (Dictation) Combinations
    {
      from: {
        key_code: 'f5',
      },
      to: [
        {
          set_variable: {
            name: 'f5_flag',
            value: 1,
          },
        },
      ],
      to_after_key_up: [
        {
          set_variable: {
            name: 'f5_flag',
            value: 0,
          },
        },
      ],
      to_if_alone: [
        {
          consumer_key_code: 'dictation',
        },
      ],
      // Not working - will break the entire rule.
      // Since we didn't actually use Siri for now, we just ignore this and leave the default behavior broken.
      // to_if_held_down: [
      //   { apple_vendor_keyboard_key_code: 'siri' },
      // ],
      type: 'basic',
    },
    // Dictate (Typeless, default is just fn but we changed it to fn+T, or VoiceInk)
    {
      conditions: [
        {
          name: 'f5_flag',
          type: 'variable_if',
          value: 1,
        },
      ],
      from: {
        key_code: 'spacebar',
      },
      to: [
        {
          key_code: 'd',
          modifiers: ['left_control', 'right_option'],
        },
      ],
      type: 'basic',
    },
    // Ask anything (Typeless)
    {
      conditions: [
        {
          name: 'f5_flag',
          type: 'variable_if',
          value: 1,
        },
      ],
      from: {
        key_code: 'f4',
      },
      to: [
        {
          key_code: 'a',
          modifiers: ['left_control', 'right_option'],
        },
      ],
      type: 'basic',
    },
    // Translate (Typeless)
    {
      conditions: [
        {
          name: 'f5_flag',
          type: 'variable_if',
          value: 1,
        },
      ],
      from: {
        key_code: 't',
      },
      to: [
        {
          key_code: 't',
          modifiers: ['left_control', 'right_option'],
        },
      ],
      type: 'basic',
    },
    // Toggle enhancement (patched version of VoiceInk)
    {
      conditions: [
        {
          name: 'f5_flag',
          type: 'variable_if',
          value: 1,
        },
      ],
      from: {
        key_code: 'y',
      },
      to: [
        {
          key_code: 'y',
          modifiers: ['left_control', 'right_option'],
        },
      ],
      type: 'basic',
    },
    // History (VoiceInk)
    {
      conditions: [
        {
          name: 'f5_flag',
          type: 'variable_if',
          value: 1,
        },
      ],
      from: {
        key_code: 'h',
      },
      to: [
        {
          key_code: 'h',
          modifiers: ['left_control', 'right_option'],
        },
      ],
      type: 'basic',
    },

    // MARK: For ThinkPad TrackPoint Keyboard II
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
          name: 'f10_flag',
          type: 'variable_if',
          value: 1,
        },
      ],
      from: {
        consumer_key_code: 'play_or_pause',
      },
      to: [
        {
          key_code: 'f8',
          modifiers: ['control', 'option'],
        },
      ],
      type: 'basic',
    },
  ],
};
