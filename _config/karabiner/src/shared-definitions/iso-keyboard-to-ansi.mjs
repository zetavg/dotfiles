// Key remapping to make ISO keyboards work like ANSI keyboards.
// We made `conditions` a variable so this can be applied to built-in keyboard for specific profiles (since there's no way to determine the type of built-in keyboards) or specify vendor_id and product_id for certain external keyboards.
export default (description, conditions) => ({
  description: `ISO Keyboard to ANSI (${description})`,
  manipulators: [
    {
      type: 'basic',
      from: {
        key_code: 'non_us_backslash',
        modifiers: {
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'grave_accent_and_tilde',
        },
      ],
      conditions,
    },
    {
      type: 'basic',
      from: {
        key_code: 'grave_accent_and_tilde',
        modifiers: {
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'left_shift',
        },
      ],
      conditions,
    },
    {
      type: 'basic',
      from: {
        key_code: 'backslash',
        modifiers: {
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'return_or_enter',
        },
      ],
      conditions,
    },
    // Keyboard shortcut to invoke Alfred
    {
      type: 'basic',
      from: {
        key_code: 'return_or_enter',
        modifiers: {
          mandatory: ['command', 'shift'],
        },
      },
      to: [
        {
          key_code: 'backslash',
          modifiers: ['command', 'shift'],
        },
      ],
      conditions,
    },
  ],
});
