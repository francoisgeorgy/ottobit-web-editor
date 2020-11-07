- sysex:
    - set device ID before sending preset data

- bugs: 
    - bypass is not set after loading preset
    - shift is used for two functions

- keyboard
    - remap keyboard by key-position, not key-value
        - use KeyboardEvent.code (see https://www.w3.org/TR/uievents-code/, https://keyshorts.com/blogs/blog/37615873-how-to-identify-macbook-keyboard-localization)
   
- connection/disconnection

- midi
    - check that the connected device (chosen by the user) is an Enzo
    - after changing the preset (send PC), bypass must be set to 127 (pedal ON)

- preferences

- preset
    - auto-save current preset before switching to another preset
    - auto-save current preset after ... seconds of no-change
    - allow quick-access to preset not stored in enzo memory

- URL and bookmarks

- print
    - add sysex as hash, not querystring
    - better layout
    - export as markdown / html

- EXP

- preferences

- presets management
    - re-open (last opened...)

- menu

- init
    - URL params to bypass preferences
        - URL param to force init from URL or from device
        - URL param to force MIDI channel
        - URL param to force MIDI device

- 2 layouts:
    - ~~pedal-like~~
    - logical (signal-flow)

- doc
    - update EXP screenshots
    - doc about keyboard shortcuts
    - state diagram for the ports connections/disconnections.
    - state diagram for the preset selection/save/dirty/...
    - explain that sysex works even when the channel is invalid, because sysex messages are not channel-bounded.
        - that's why we have MODEL and ID in the sysex message
    
- architecture
    - use async functions for all MIDI interactions
        - use RxJS ?
