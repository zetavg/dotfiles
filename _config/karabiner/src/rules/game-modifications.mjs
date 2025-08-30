import game_bundle_identifiers from '../shared-definitions/game-bundle-identifiers.mjs';
import fn_keys from '../shared-definitions/fn-keys.mjs';

export default {
  description: 'Game Modifications',
  manipulators: [
    ...Array.from(new Array(12)).map((_, i) => ({
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: game_bundle_identifiers,
        },
      ],
      type: 'basic',
      from: {
        key_code: `f${i + 1}`,
        modifiers: {
          optional: ['caps_lock', 'control', 'command', 'shift', 'option'],
        },
      },
      to: {
        key_code: `f${i + 1}`,
      },
    })),
    ...fn_keys.map((def) => ({
      type: 'basic',
      ...def,
      conditions: [
        ...(def.conditions || []),
        {
          type: 'frontmost_application_if',
          bundle_identifiers: game_bundle_identifiers,
        },
      ],
      from: {
        ...def.from,
        modifiers: {
          ...(def.from.modifiers || {}),
          mandatory: [...(def.from.modifiers?.mandatory || []), 'fn'],
        },
      },
    })),
    {
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: ['^com\\.ColossalOrder\\.CitiesSkylines$'],
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
    {
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: ['^com\\\\.coffeestainstudios\\\\.goatsimulator'],
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
          pointing_button: 'button2',
        },
      ],
    },
  ],
};
