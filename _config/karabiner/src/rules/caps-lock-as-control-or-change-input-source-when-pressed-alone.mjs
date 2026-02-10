import game_bundle_identifiers from '../shared-definitions/game-bundle-identifiers.mjs';

const excluded_bundle_identifiers = [...game_bundle_identifiers];

export default {
  description: '⇪ → (alone ? A/注 : ⌃)',
  manipulators: [
    {
      conditions: [
        {
          type: 'input_source_if',
          input_sources: [
            {
              language: 'en',
            },
          ],
        },
        {
          type: 'frontmost_application_unless',
          bundle_identifiers: excluded_bundle_identifiers,
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
          key_code: 'left_control',
        },
      ],
      to_if_alone: [
        // In some applications, the input method will not be change to Zhuyin completely with this way, so we just simulate pressing "Control + Space" instead.
        // {
        //   select_input_source: {
        //     language: 'zh-Hant',
        //     input_source_id: 'com.apple.inputmethod.TCIM.Zhuyin',
        //   },
        // },
        // I use Ctrl + Option + Space (and disabled Ctrl + Space) to change input source to avoid conflicting with Ctrl + Space, which is probably the most common "trigger completion / suggestions" shortcut across IDEs
        // {
        //   key_code: 'spacebar',
        //   modifiers: ['control'],
        // },
        {
          key_code: 'spacebar',
          modifiers: ['control', 'option'],
        },
      ],
    },
    {
      conditions: [
        {
          type: 'input_source_unless',
          input_sources: [
            {
              language: 'en',
            },
          ],
        },
        {
          type: 'frontmost_application_unless',
          bundle_identifiers: excluded_bundle_identifiers,
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
          key_code: 'left_control',
        },
      ],
      to_if_alone: [
        {
          select_input_source: {
            language: 'en',
            input_source_id: 'com.apple.keylayout.ABC',
          },
        },
      ],
    },
  ],
};
