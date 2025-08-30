import a_to_z from '../shared-definitions/a-to-z.mjs';

export default {
  description: '⌘ Key Sequences',
  manipulators: [
    {
      type: 'basic',
      from: {
        key_code: 'left_command',
      },
      conditions: [
        {
          type: 'variable_if',
          name: 'left_command_pressed_2',
          value: 1,
        },
      ],
      to: [
        {
          key_code: 'x',
          modifiers: [
            'left_shift',
            'left_command',
            'left_control',
            'left_option',
          ],
        },
      ],
    },
    ...a_to_z.map((c) => ({
      type: 'basic',
      from: {
        key_code: c,
      },
      conditions: [
        {
          type: 'variable_if',
          name: 'left_command_pressed_2',
          value: 1,
        },
      ],
      to: [
        {
          key_code: c,
          modifiers: [
            'left_shift',
            'left_command',
            'left_control',
            'left_option',
          ],
        },
      ],
    })),
    {
      type: 'basic',
      from: {
        key_code: 'left_command',
      },
      conditions: [
        {
          type: 'variable_if',
          name: 'left_command_pressed',
          value: 1,
        },
      ],
      to: [
        {
          set_variable: {
            name: 'left_command_pressed_2',
            value: 1,
          },
        },
        {
          key_code: 'left_command',
        },
      ],
      to_delayed_action: {
        to_if_invoked: [
          {
            set_variable: {
              name: 'left_command_pressed_2',
              value: 0,
            },
          },
        ],
        to_if_canceled: [
          {
            set_variable: {
              name: 'left_command_pressed_2',
              value: 0,
            },
          },
        ],
      },
    },
    {
      type: 'basic',
      from: {
        key_code: 'left_command',
      },
      to: [
        {
          set_variable: {
            name: 'left_command_pressed',
            value: 1,
          },
        },
        {
          key_code: 'left_command',
        },
      ],
      to_delayed_action: {
        to_if_invoked: [
          {
            set_variable: {
              name: 'left_command_pressed',
              value: 0,
            },
          },
        ],
        to_if_canceled: [
          {
            set_variable: {
              name: 'left_command_pressed',
              value: 0,
            },
          },
        ],
      },
    },
  ],
};
