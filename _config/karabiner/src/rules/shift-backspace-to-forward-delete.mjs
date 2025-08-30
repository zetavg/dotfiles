export default {
  description: '⇧⌫ → ⌦',
  manipulators: [
    {
      from: {
        key_code: 'delete_or_backspace',
        modifiers: {
          mandatory: ['shift'],
        },
      },
      to: [
        {
          key_code: 'delete_forward',
        },
      ],
      type: 'basic',
    },
  ],
};
