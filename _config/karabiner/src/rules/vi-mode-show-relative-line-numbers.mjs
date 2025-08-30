export default {
  description: 'Vi Mode - Show Relative Line Numbers',
  manipulators: [
    {
      conditions: [
        {
          name: 'vi_mode',
          type: 'variable_if',
          value: 1,
        },
        {
          name: 'vi_visual_mode',
          type: 'variable_if',
          value: 0,
        },
      ],
      from: {
        key_code: 's',
        modifiers: {
          optional: ['caps_lock', 'command', 'shift', 'option'],
        },
      },
      to: [
        {
          key_code: 'r',
          modifiers: ['command', 'control'],
        },
      ],
      type: 'basic',
    },
    {
      conditions: [
        {
          name: 'vi_mode',
          type: 'variable_if',
          value: 1,
        },
        {
          name: 'vi_visual_mode',
          type: 'variable_if',
          value: 0,
        },
      ],
      from: {
        key_code: 'i',
        modifiers: {
          optional: ['caps_lock', 'command', 'shift', 'option'],
        },
      },
      to: [
        {
          key_code: 'r',
          modifiers: ['command', 'control'],
        },
      ],
      type: 'basic',
    },
  ],
};
