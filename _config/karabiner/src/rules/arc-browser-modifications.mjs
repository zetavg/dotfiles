export default {
  description: 'Arc Browser Modifications',
  manipulators: [
    // The shortcut of Instapaper can't be changed, so we need to map it here
    // Not needed since the shortcut of Instapaper can be changed in arc://extensions/shortcuts
    {
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: [
            'this.manipulator.is.not.needed.company.thebrowser.Browser',
          ],
        },
      ],
      type: 'basic',
      from: {
        key_code: 'd',
        modifiers: {
          mandatory: ['command', 'shift'],
        },
      },
      to: {
        key_code: 's',
        modifiers: ['command', 'shift'],
      },
    },
    // The "Save Page As" shortcut is changed to avoid conflict with Instapaper, we map it back here
    // Not needed since the shortcut of Instapaper can be changed in arc://extensions/shortcuts
    {
      conditions: [
        {
          type: 'frontmost_application_if',
          bundle_identifiers: [
            'this.manipulator.is.not.needed.company.thebrowser.Browser',
          ],
        },
      ],
      type: 'basic',
      from: {
        key_code: 's',
        modifiers: {
          mandatory: ['command', 'shift'],
        },
      },
      to: {
        key_code: 's',
        modifiers: ['command', 'shift', 'option'],
      },
    },
  ],
};
