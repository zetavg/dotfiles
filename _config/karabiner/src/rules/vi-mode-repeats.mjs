export default {
  description: 'Vi Mode - Repeats',
  manipulators: [
    ...Array.from(new Array(13)).flatMap((_, i) =>
      Array.from(new Array(10)).map((_, j) => ({
        conditions: [
          {
            name: 'vi_mode',
            type: 'variable_if',
            value: 1,
          },
          {
            name: 'vi_repeat_key_for',
            type: 'variable_if',
            value: i,
          },
        ],
        from: {
          key_code: `${j}`,
        },
        to: [
          {
            set_variable: {
              name: 'vi_repeat_key_for',
              value: i * 10 + j,
            },
          },
        ],
        type: 'basic',
      })),
    ),
  ],
};
