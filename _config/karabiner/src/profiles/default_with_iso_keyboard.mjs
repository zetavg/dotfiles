import iso_keyboard_to_ansi from '../shared-definitions/iso-keyboard-to-ansi.mjs';

import default_profile from './default.mjs';

export default {
  ...default_profile,
  name: `${default_profile.name} (ISO Keyboard)`,
  complex_modifications: {
    ...default_profile.complex_modifications,
    rules: [
      ...default_profile.complex_modifications.rules,
      iso_keyboard_to_ansi('Built in Keyboard', [
        {
          type: 'device_if',
          identifiers: [{ is_built_in_keyboard: true }],
        },
      ]),
    ],
  },
};
