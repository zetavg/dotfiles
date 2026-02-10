export default {
  description: 'Space Switching',
  manipulators: [
    {
      from: {
        key_code: 'q',
        modifiers: {
          mandatory: ['control'],
        },
      },
      to: [
        {
          key_code: '4',
          modifiers: ['control'],
        },
      ],
      type: 'basic',
    },
    {
      from: {
        key_code: 'w',
        modifiers: {
          mandatory: ['control'],
        },
      },
      to: [
        {
          key_code: '5',
          modifiers: ['control'],
        },
      ],
      type: 'basic',
    },
    {
      from: {
        key_code: 'e',
        modifiers: {
          mandatory: ['control'],
        },
      },
      to: [
        {
          key_code: '6',
          modifiers: ['control'],
        },
      ],
      type: 'basic',
    },
  ]
};
