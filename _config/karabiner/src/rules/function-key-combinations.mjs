export default {
  description: 'Function Key Combinations',
  manipulators: [
    {
      type: 'basic',
      from: {
        key_code: 'f1',
        modifiers: {
          mandatory: ['control'],
        },
      },
      to: [
        {
          key_code: 'f1',
          modifiers: ['control'],
        },
      ],
    },
    {
      type: 'basic',
      from: {
        key_code: 'f2',
        modifiers: {
          mandatory: ['control'],
        },
      },
      to: [
        {
          key_code: 'f2',
          modifiers: ['control'],
        },
      ],
    },
    {
      type: 'basic',
      from: {
        key_code: 'f3',
        modifiers: {
          mandatory: ['control'],
        },
      },
      to: [
        {
          key_code: 'f3',
          modifiers: ['control'],
        },
      ],
    },
    ...['f3', 'f10', 'f11', 'f12']
      .map((k) => [
        {
          type: 'basic',
          from: {
            key_code: k,
            modifiers: {
              mandatory: ['command', 'shift'],
            },
          },
          to: [
            {
              key_code: k,
              modifiers: ['command', 'shift'],
            },
          ],
        },
        {
          type: 'basic',
          from: {
            key_code: k,
            modifiers: {
              mandatory: ['command'],
            },
          },
          to: [
            {
              key_code: k,
              modifiers: ['command'],
            },
          ],
        },
      ])
      .flat(),
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
    // For ThinkPad TrackPoint Keyboard II
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
