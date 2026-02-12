// Currently not used, but may be useful in the future if I want to re-map the fn key when pressed alone.
export default {
  description: 'fn → (alone ? fn+T : fn)',
  manipulators: [
    {
      type: 'basic',
      from: {
        apple_vendor_top_case_key_code: 'keyboard_fn',
        modifiers: {
          optional: ['any'],
        },
      },
      to: [
        {
          apple_vendor_top_case_key_code: 'keyboard_fn',
          lazy: true,
        },
      ],
      to_if_alone: [
        {
          key_code: 't',
          modifiers: ['left_option', 'left_shift'],
          hold_down_milliseconds: 300,
        },
      ],
    },
  ],
};
