Ottobit Jr. Editor Presets Management
==============================
             
|    | Operation                             | Editor Preset Selector \(ID\) | Editor preset dirty indicator | Editor values  | Ottobit Jr. Preset ID | Ottobit Jr. values                     |
|----|---------------------------------------|-------------------------------|-------------------------------|----------------|----------------|---------------------------------|
|  1 | Editor startup with no Ottobit Jr. connected | none selected \(0\)           | set clean                     | init           | N/A            | N/A                             |
|  2 | Ottobit Jr. connected                        | none selected \(0\)           | set clean                     | \-             | \-             | \-                              |
|  3 | Editor startup with Ottobit Jr. connected    | read from Ottobit Jr.                | set clean                     | loaded from Ottobit Jr. | \-           | \-                              |
|  4 | Read Ottobit Jr.                             | updated from Ottobit Jr.             | set clean                     | loaded from Ottobit Jr. | \-           | \-                              |
|  5 | Send to Ottobit Jr.                          | \-                            | \-                            | \-             | \-             | updated with Editor values      |
|  6 | Select preset in Editor               | updated                       | set clean                     | loaded from Ottobit Jr. | updated      | updated with Ottobit Jr. preset values |
|  7 | Modify control in Editor              | \-                            | set dirty                     | updated        | \-             | updated by MIDI CC              |
|  8 | Modify control in Ottobit Jr.                | \-                            | set dirty                     | updated        | \-             | updated by MIDI CC              |
|  9 | Load sysex file                       | \-                            | \-                            | \-             | \-             | \-                              |
| 10 | Select preset in Library              | \-                            | set dirty                     | updated        | \-             | updated by MIDI CC              |
| 11 | Bookmark Preset in the Editor         | \-                            | \-                            | \-             | \-             | \-                              |
| 12 | Save Preset from the Editor           | \-                            | set clean                     | \-             | \-             | saved in Ottobit Jr. memory            |

TODO: preset from URL

- means "not changed/not affected".

### Editor startup with no Ottobit Jr. connected: 

If the Ottobit Jr. is connected _after_ the Editor has been started, then the Editor will not be updated and will not reflect the Ottobit Jr. current settings. This is by design in order
avoid loosing a preset you may have prepared in the Editor. 

If the Ottobit Jr. is connected after the Editor has been started and you want the editor to reflects the Ottobit Jr. settings you have two possibilites:

1. Click the "Read Ottobit Jr." command in the Editor.
2. Refresh the browser page. This will restart the Editor and it will automatically read the Ottobit Jr.. 

### Editor startup with Ottobit Jr. already connected:

If the Ottobit Jr. is already connected and the Editor MIDI settings are already setup in the Editor's preferences, then the Editor will automatically
read the Ottobit Jr. and reflects its settings. 

### Presets Library:

- All preset in the Library have Preset ID set to 0.
- All imported presets from sysex files have their Preset ID set to 0.

This is by design in order to avoid changing the Preset number (ID) when you select a preset in the Library.

To save in Ottobit Jr. a preset from the Library you have to:

1. Select the Preset Number
2. Select the Preset in the Library
3. Click the SAVE command.



1. Editor startup
    - read Ottobit Jr. current preset
    - editor Preset Selector == Ottobit Jr. preset #
    
2. Modify a control in the editor
    - update Ottobit Jr.
    - show Preset as Dirty (dot in the preset selector)
    - The Preset Selector displays the Dirty Indicator (dot)
    
5. Select a preset from the library
    - Editor is update
    - Ottobit Jr. is update
    - The current Preset ID (Editor & Ottobit Jr.) is not changed
    - The Preset Selector displays the Dirty Indicator (dot)    
