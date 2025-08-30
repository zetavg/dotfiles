export default {
  description: 'Vi Mode - HJKL',
  manipulators: [
    ...Array.from(new Array(128))
      .map((_, i) =>
        [
          ['h', 'left_arrow'],
          ['j', 'down_arrow'],
          ['k', 'up_arrow'],
          ['l', 'right_arrow'],
        ].map(([from_key, to_key]) => ({
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
            {
              name: 'vi_repeat_key_for',
              type: 'variable_if',
              value: i,
            },
          ],
          from: {
            key_code: from_key,
            modifiers: {
              optional: ['caps_lock', 'command', 'shift', 'control', 'option'],
            },
          },
          to: [
            {
              set_variable: {
                name: 'vi_repeat_key_for',
                value: 0,
              },
            },
            ...Array.from(new Array(i === 0 ? 1 : i)).map(() => ({
              key_code: to_key,
            })),
          ],
          type: 'basic',
        })),
      )
      .flat(),
  ],
};
