export default {
  description: 'ISO-ANSI Universal',
  manipulators: [
    // Universal "backslash key" that works on both ISO and ANSI keyboards.
    // This is still under experimentation to figure out what's the best solution which is intuitive and doesn't cause any issues or conflicts.
    {
      type: 'basic',
      from: {
        key_code: 'quote',
        modifiers: {
          mandatory: ['fn'],
          optional: ['shift', 'option'],
        },
      },
      to: [
        {
          key_code: 'backslash',
        },
      ],
    },
  ],
};
