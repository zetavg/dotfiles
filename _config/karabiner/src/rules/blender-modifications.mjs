export default {
  description: 'Blender Modifications',
  manipulators: [
    ...['f3', 'f4', 'f5', 'f6'].map((fn_key) => ({
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: ['org.blenderfoundation.blender'],
        },
      ],
      type: 'basic',
      from: {
        key_code: fn_key,
        modifiers: {
          optional: ['caps_lock', 'control', 'command', 'shift', 'option'],
        },
      },
      to: {
        key_code: fn_key,
      },
    })),
    {
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: ['This.rule.is.useless'],
        },
      ],
      type: 'basic',
      from: {
        key_code: 'caps_lock',
        modifiers: {
          optional: ['any'],
        },
      },
      to: [
        {
          pointing_button: 'button4',
        },
      ],
    },
  ],
};
