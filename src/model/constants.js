
export const device_name = "Ottobit Jr.";

export const SYSEX_CMD = {
    preset_request: 0x25,
    preset_response: 0x26,      // TO BE CONFIRMED
    globals_request: 0x27,
    globals_response: 0x28,     // TO BE CONFIRMED
    preset_write: 0x29
};

export const GROUP_ID = {
    pedal: 1
};

export const MODEL_ID = {
    ottobitjr: 0,
    mercury7: 1,
    polymoon: 2,
    enzo: 3
};

export const SEQUENCER_TYPE = {
    pitch: 0,
    sample_rate: 63,
    filter: 127
};

export const STUTTER_HOLD = {
    off: 0,
    on: 127
};
