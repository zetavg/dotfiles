import arc_browser_modifications from '../rules/arc-browser-modifications.mjs';
import blender_modifications from '../rules/blender-modifications.mjs';
// import keyboard_brightness_control from '../rules/keyboard-brightness-control.mjs';
import caps_lock_as_control_or_change_input_source_when_pressed_alone from '../rules/caps-lock-as-control-or-change-input-source-when-pressed-alone.mjs';
import command_key_sequences from '../rules/command-key-sequences.mjs';
import function_key_combinations from '../rules/function-key-combinations.mjs';
import game_modifications from '../rules/game-modifications.mjs';
import iso_ansi_universal from '../rules/iso-ansi-universal.mjs';
import shift_backspace_to_forward_delete from '../rules/shift-backspace-to-forward-delete.mjs';
import space_switching from '../rules/space-switching.mjs';
import thinkpad_trackpoint_keyboard_ii_middle_mouse_button_remap from '../rules/thinkpad-trackpoint-keyboard-ii-middle-mouse-button-remap.mjs';
import vi_mode_hjkl from '../rules/vi-mode-hjkl.mjs';
import vi_mode_modifier_key_semicolon from '../rules/vi-mode-modifier-key-semicolon.mjs';
import vi_mode_modifier_key_semicolon_fast_typing_fixups from '../rules/vi-mode-modifier-key-semicolon-fast-typing-fixups.mjs';
import vi_mode_repeats from '../rules/vi-mode-repeats.mjs';
import vi_mode_show_relative_line_numbers from '../rules/vi-mode-show-relative-line-numbers.mjs';
import fn_keys from '../shared-definitions/fn-keys.mjs';

export default {
  complex_modifications: {
    parameters: { 'basic.to_if_alone_timeout_milliseconds': 500 },
    rules: [
      arc_browser_modifications,
      blender_modifications,
      caps_lock_as_control_or_change_input_source_when_pressed_alone,
      command_key_sequences,
      function_key_combinations,
      game_modifications,
      iso_ansi_universal,
      // keyboard_brightness_control,
      shift_backspace_to_forward_delete,
      space_switching,
      thinkpad_trackpoint_keyboard_ii_middle_mouse_button_remap,
      vi_mode_hjkl,
      vi_mode_modifier_key_semicolon_fast_typing_fixups,
      vi_mode_modifier_key_semicolon,
      vi_mode_repeats,
      vi_mode_show_relative_line_numbers,
    ],
  },
  devices: [
    {
      identifiers: {
        is_keyboard: true,
        product_id: 63100000,
        vendor_id: 1452,
      },
      simple_modifications: [
        {
          from: { key_code: 'down_arrow' },
          to: [{ key_code: 'right_control' }],
        },
        {
          from: { key_code: 'left_arrow' },
          to: [{ key_code: 'right_control' }],
        },
        {
          from: { key_code: 'right_arrow' },
          to: [{ key_code: 'right_control' }],
        },
        {
          from: { key_code: 'up_arrow' },
          to: [{ key_code: 'right_control' }],
        },
      ],
    },
    {
      identifiers: {
        is_keyboard: true,
        product_id: 24814,
        vendor_id: 6127,
      },
      simple_modifications: [
        {
          from: { key_code: 'left_command' },
          to: [{ key_code: 'left_option' }],
        },
        {
          from: { key_code: 'left_option' },
          to: [{ key_code: 'left_command' }],
        },
      ],
    },
    {
      identifiers: {
        is_pointing_device: true,
        product_id: 24814,
        vendor_id: 6127,
      },
      ignore: false,
    },
    {
      identifiers: {
        is_keyboard: true,
        is_pointing_device: true,
        product_id: 24801,
        vendor_id: 6127,
      },
      ignore: false,
      simple_modifications: [
        {
          from: { key_code: 'f1' },
          to: [{ consumer_key_code: 'mute' }],
        },
        {
          from: { key_code: 'f2' },
          to: [{ consumer_key_code: 'volume_decrement' }],
        },
        {
          from: { key_code: 'f3' },
          to: [{ consumer_key_code: 'volume_increment' }],
        },
        {
          from: { key_code: 'f4' },
          to: [{ key_code: 'f4' }],
        },
        {
          from: { key_code: 'f5' },
          to: [{ apple_vendor_keyboard_key_code: 'brightness_down' }],
        },
        {
          from: { key_code: 'f6' },
          to: [{ apple_vendor_keyboard_key_code: 'brightness_up' }],
        },
        {
          from: { key_code: 'f7' },
          to: [{ apple_vendor_keyboard_key_code: 'mission_control' }],
        },
        {
          from: { key_code: 'f8' },
          to: [{ consumer_key_code: 'dictation' }],
        },
        {
          from: { key_code: 'f9' },
          to: [{ consumer_key_code: 'rewind' }],
        },
        {
          from: { key_code: 'f10' },
          to: [{ consumer_key_code: 'play_or_pause' }],
        },
        {
          from: { key_code: 'f11' },
          to: [{ consumer_key_code: 'fastforward' }],
        },
        {
          from: { key_code: 'f12' },
          to: [{ key_code: 'f10' }],
        },
        {
          from: { key_code: 'left_command' },
          to: [{ key_code: 'left_option' }],
        },
        {
          from: { key_code: 'left_option' },
          to: [{ key_code: 'left_command' }],
        },
        {
          from: { key_code: 'print_screen' },
          to: [{ key_code: 'right_option' }],
        },
        {
          from: { key_code: 'right_option' },
          to: [{ key_code: 'right_command' }],
        },
      ],
    },
  ],
  fn_function_keys: fn_keys,
  name: 'Default profile',
  virtual_hid_keyboard: {
    caps_lock_delay_milliseconds: 0,
    country_code: 0,
    keyboard_type: 'ansi',
    keyboard_type_v2: 'ansi',
  },
};
