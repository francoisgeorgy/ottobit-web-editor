export const control_id = {
    exp_pedal: 4,
    bypass: 14,
    tempo: 15,
    sample_rate: 16,
    filter: 17,
    bits: 18,
    stutter: 19,
    sequencer: 20,
    sequencer_mult: 21,
    step1: 22,             // ALT / 2nd layer
    step2: 23,             // ALT / 2nd layer
    step3: 24,             // ALT / 2nd layer
    step4: 25,             // ALT / 2nd layer
    step5: 26,             // ALT / 2nd layer
    step6: 27,             // ALT / 2nd layer
    tap: 28,
    sequencer_type: 29,
    stutter_hold: 31
};

export const control = new Array(127);

const _0_100 = function (v) {
    return Math.floor(v / 127 * 100 + 0.5);
};

const _percent = function (v) {
    return Math.floor(v / 127 * 100 + 0.5) + '%';
};

/*
const _off_when_zero = function (v) {
    return v === 0 ? 'OFF' : v;
};
*/

const _off_when_zero_percent = function (v) {
    return v === 0 ? 'OFF' : _percent(v);
};

const _2_steps = function (v) {
    return v < 64 ? 0 : 127;
};

const _3_steps = function (v) {
    if (v < 63) {
        return 0;
    } else if (v === 63) {
        return 63;
    } else {
        return 127;
    }
};

const _4_steps = function (v) {
    if (v < 32) {
        return 0;
    } else if (v < 64) {
        return 63;
    } else if (v < 96) {
        return 95;
    } else {
        return 127;
    }
};

const _sample_rate = function (v) {
    // if (v === 0) {
    //     return "-2 oct";
    // } else if (v < 12) {
    //     return "-1 oct";
    // } else if (v < 56) {
    //     return Math.floor((v - 56) / 4);
    // } else if (v >= 56 && v < 72) {
    //     return "0";
    // } else if (v < 116) {
    //     return Math.floor((v - 68) / 4);
    // } else if (v < 127) {
    //     return "+1 oct";
    // } else {
    //     return "+2 oct";
    // }

    // TODO!!
    return v;
};


const _sequencer = function (v) {
    if (v === 0) {
        return "OFF";
    } else if (v < 33) {
        return "1X";
    } else if (v < 60) {
        return "2X";
    } else if (v < 88) {
        return "4X";
    } else if (v < 116) {
        return "8X";
    } else {
        return "INF";
    }
};

const _step = function (v) {
    if (v === 0)
        return "OFF";
    if (v === 127)
        return "MUTE";

    if (control[control_id.sequencer_type].raw_value < 63) {
        // PITCH:
        if (v < 13)
            return "-12";
        if (v < 17)
            return "-11";
        if (v < 21)
            return "-10";
        if (v < 25)
            return "-9";
        if (v < 29)
            return "-8";
        if (v < 33)
            return "-7";
        if (v < 37)
            return "-6";
        if (v < 41)
            return "-5";
        if (v < 46)
            return "-4";
        if (v < 50)
            return "-3";
        if (v < 54)
            return "-2";
        if (v < 58)
            return "-1";
        if (v < 74)
            return "-0";
        if (v < 78)
            return "+1";
        if (v < 83)
            return "+2";
        if (v < 87)
            return "+3";
        if (v < 91)
            return "+4";
        if (v < 95)
            return "+5";
        if (v < 99)
            return "+6";
        if (v < 103)
            return "+7";
        if (v < 107)
            return "+8";
        if (v < 111)
            return "+9";
        if (v < 115)
            return "+10";
        if (v < 119)
            return "+11";
        return "+12";
    }
    else {
        // FILTER/SAMPLE is %
        return Math.floor(v / 125 * 100) + '%';
    }
};

const _stutter = function (v) {
    // 1. Stutter Off
    if (v === 0)
        return "OFF";
    // 2. Full Speed, Stutter Once
    if (v < 12)
        return "1:1X";
    // 3. Full Speed, Stutter Twice
    if (v < 18)
        return "1:2X";
    // 4. Full Speed, Stutter Three Times
    if (v < 23)
        return "1:3X";
    // 5. Full Speed, Stutter Four Times
    if (v < 29)
        return "1:4X";
    // 6. Full Speed, Stutter Six Times
    if (v < 35)
        return "1:6X";
    // 7. Full Speed, Stutter Eight Times
    if (v < 41)
        return "1:8X";
    // 8. Full Speed, Stutter Sixteen Times
    if (v < 46)
        return "1:16X";
    // 9. Double Speed, Stutter Once
    if (v < 52)
        return "2:1X";
    // 10. Double Speed, Stutter Twice
    if (v < 58)
        return "2:2X";
    // 11. Double Speed, Stutter Three Times
    if (v < 64)
        return "2:3X";
    // 12. Double Speed, Stutter Four Times
    if (v < 69)
        return "2:4X";
    // 13. Double Speed, Stutter Six Times
    if (v < 75)
        return "2:6X";
    // 14. Double Speed, Stutter Eight Times
    if (v < 81)
        return "2:8X";
    // 15. Double Speed, Stutter Sixteen Times
    if (v < 87)
        return "2:16X";
    // 16. Half Speed, Stutter Once
    if (v < 92)
        return ".5:1X";
    // 17. Half Speed, Stutter Twice
    if (v < 98)
        return ".5:2X";
    // 18. Half Speed, Stutter Three Times
    if (v < 104)
        return ".5:3X";
    // 19. Half Speed, Stutter Four Times
    if (v < 110)
        return ".5:4X";
    // 20. Half Speed, Stutter Six Times
    if (v < 115)
        return ".5:6X";
    // 21. Half Speed, Stutter Eight Times
    if (v < 121)
        return ".5:8X";
    // 22. Half Speed, Stutter Sixteen Times
    if (v < 127)
        return ".5:16X";
    // 23. Random (combination of all of the above, plus the reverse of all the above)
    return "RND";
};

const _sequencer_mult = function (v) {
    if (v === 0)
        return "1X";
    if (v < 20)
        return "2X";
    if (v < 40)
        return "4X";
    if (v < 60)
        return "8X";
    if (v < 80)
        return "16X";
    if (v < 100)
        return "32X";
    // note that sending 120 seems to cause 128X even on pedal???
    if (v < 125)
        return "64X";
    return "128X";


    // old
    // if (v < 17) {
    //     return "1X";
    // } else if (v < 33) {
    //     return "2X";
    // } else if (v < 49) {
    //     return "4X";
    // } else if (v < 65) {
    //     return "8X";
    // } else if (v < 81) {
    //     return "16X";
    // } else if (v < 97) {
    //     return "32X";
    // } else if (v < 113) {
    //     return "64X";
    // } else {
    //     return "128X";
    // }
};

const _sequencer_type = function (v) {
    if (v < 63) {
        return "Pitch";
    } else if (v === 63) {
        return "Sample Rate";
    } else {
        return "Filter";
    }
};

const _stutter_hold = function (v) {
    if (v < 64) {
        return "off";
    } else {
        return "on";
    }
};

export const _tempo_ms = function (v) {
    return (v * 10);    // + "ms";
};

export const _tempo_bpm = function (v) {
    // console.log("tempo bpm", v, Math.round(60000 / (v * 10)));
    const bpm = v > 0 ? Math.round(60000 / (v * 10)) : 0;
    return `${bpm}`;
};

// TODO!! Check/change below Sysex's

function defineControls() {
    control[control_id.exp_pedal] = { // 4,
        name: "Exp pedal",
        human: _0_100,
        infos: "The expression pedal works by morphing between two complete settings of all of the knob values (even the second layer knob values)."
    };
    control[control_id.bypass] = { // 14,
        name: "Bypass",
        no_init: true,
        no_randomize: true,
        map_raw: _2_steps,
        sysex: {
            offset: 21,
            mask: [0x7F]
        },
        infos: "Disables processing and passes the input through to the output."
    };
    control[control_id.tempo] = { // 15,
        name: "Tempo",
        human: _tempo_ms,
        sysex: {
            offset: 25,
            mask: [0x7F]
        },
        infos: "Sets the time for the delay line and arpeggiated Synth."
    };
    control[control_id.sample_rate] = { // 16,
        name: "Sample Rate",
        init_value: 63,
        cc_center: [63, 64],
        human: _sample_rate,
        sysex: {
            offset: 9,
            mask: [0x7F]
        },
        sysex2: {
            offset: 26,
            mask: [0x7F]
        },
        infos: "Changes the sample rate from 48 Hz to 48 kHz."
    };
    control[control_id.filter] = { // 17,
        name: "Filter",
        init_value: 127,
        human: _percent,
        sysex: {
            offset: 10,
            mask: [0x7F]
        },
        sysex2: {
            offset: 27,
            mask: [0x7F]
        },
        infos: "Changes the cutoff frequency of the Meris original ladder style low pass filter from 96Hz to 24kHz."
    };
    control[control_id.bits] = { // 18,
        name: "Bits",
        init_value: 127,
        human: _percent,
        sysex: {
            offset: 11,
            mask: [0x7F]
        },
        sysex2: {
            offset: 28,
            mask: [0x7F]
        },
        infos: "Changes the bit depth from 1 bit to 24 bits."
    };
    control[control_id.stutter] = { // 19,
        name: "Stutter",
        human: _stutter,
        sysex: {
            offset: 12,
            mask: [0x7F]
        },
        sysex2: {
            offset: 29,
            mask: [0x7F]
        },
        infos: "Changes the play speed and length of the stutter."
    };
    control[control_id.sequencer] = { // 20,
        name: "Sequencer",
        human: _sequencer,
        sysex: {
            offset: 13,
            mask: [0x7F]
        },
        sysex2: {
            offset: 30,
            mask: [0x7F]
        },
        infos: "Sets Sequencer to Play Once, Play Twice, Play 4 Times, Play 8 Times, or Play Continuously."
    };
    control[control_id.sequencer_mult] = { // 21,
        name: "Sequencer Mult",
        human: _sequencer_mult,
        sysex: {
            offset: 14,
            mask: [0x7F]
        },
        sysex2: {
            offset: 31,
            mask: [0x7F]
        },
        infos: "Sets the sequencer speed as a multiple of the tap tempo."
    };

    control[control_id.step1] = { // 22,
        name: "Step 1",
        init_value: 63,
        human: _step,
        sysex: {
            offset: 15,
            mask: [0x7F]
        },
        sysex2: {
            offset: 32,
            mask: [0x7F]
        },
        infos: "Step 1 of the sequencer."
    };
    control[control_id.step2] = { // 23,
        name: "Step 2",
        init_value: 63,
        human: _step,
        sysex: {
            offset: 16,
            mask: [0x7F]
        },
        sysex2: {
            offset: 33,
            mask: [0x7F]
        },
        infos: "Step 2 of the sequencer."
    };
    control[control_id.step3] = { // 24,
        name: "Step 3",
        init_value: 63,
        human: _step,
        sysex: {
            offset: 17,
            mask: [0x7F]
        },
        sysex2: {
            offset: 34,
            mask: [0x7F]
        },
        infos: "Step 3 of the sequencer."
    };
    control[control_id.step4] = { // 25,
        name: "Step 4",
        init_value: 63,
        human: _step,
        sysex: {
            offset: 18,
            mask: [0x7F]
        },
        sysex2: {
            offset: 35,
            mask: [0x7F]
        },
        infos: "Step 4 of the sequencer."
    };
    control[control_id.step5] = { // 26,
        name: "Step 5",
        init_value: 63,
        human: _step,
        sysex: {
            offset: 19,
            mask: [0x7F]
        },
        sysex2: {
            offset: 36,
            mask: [0x7F]
        },
        infos: "Step 5 of the sequencer."
    };
    control[control_id.step6] = { // 27,
        name: "Step 6",
        init_value: 63,
        human: _step,
        sysex: {
            offset: 20,
            mask: [0x7F]
        },
        sysex2: {
            offset: 37,
            mask: [0x7F]
        },
        infos: "Step 6 of the sequencer."
    };

    control[control_id.tap] = { // 28,
        name: "Tap",
        // no_init: true,
        init_value: 0,
        no_randomize: true,
        map_raw: () => 127,
        infos: "Sets the speed and the timing of the Sequencer and the Stutter."
        // sysex: {
        //     offset: 22,
        //     mask: [0x7F]
        // }
    };
    control[control_id.sequencer_type] = { // 29,
        name: "Sequencer Type",
        init_value: 0,
        human: _sequencer_type,
        map_raw: _3_steps,
        sysex: {
            offset: 23,
            mask: [0x7F]
        },
        infos: "Pitch: choice of every semitone between and octave below and above the guitar’s pitch\nSample Rate: Modify sample rate\nFilter: Modify filter"
    };
    control[control_id.stutter_hold] = { // 31
        name: "Stutter Hold",
        init_value: 0,
        human: _stutter_hold,
        map_raw: _2_steps,
        sysex: {
            offset: 24,
            mask: [0x7F]
        },
        infos: "Freeze audio on/off."
    };

    // add the missing default properties
    control.forEach(function (obj) {

        obj.cc_number = control.indexOf(obj);
        obj.cc_type = "cc";

        let bits = 7;

        if (!obj.hasOwnProperty("human")) {
            obj.human = v => v;
        }

        if (!obj.hasOwnProperty("on_off")) {
            obj.on_off = false;
        }

        if (!obj.hasOwnProperty("range")) {
            obj.range = obj.on_off ? [0, 1] : [0, (1 << bits) - 1];
        }

        if (!obj.hasOwnProperty("cc_range")) {
            obj.cc_range = [0, (1 << bits) - 1];
        }

        // pre-computed value that may be useful:
        obj.cc_min = Math.min(...obj.cc_range);
        obj.cc_max = Math.max(...obj.cc_range);
        obj.cc_delta = obj.cc_max - obj.cc_min;

        if (!obj.hasOwnProperty("init_value")) {
            if (obj.hasOwnProperty("cc_center")) {
                obj.init_value = Array.isArray(obj.cc_center) ? obj.cc_center[0] : obj.cc_center;
            } else if ((Math.min(...obj.range) < 0) && (Math.max(...obj.range) > 0)) {
                obj.init_value = (1 << (bits - 1)) - 1; // very simple rule: we take max/2 as default value
            } else {
                obj.init_value = Math.min(...obj.range);
            }
        }

        if (!obj.hasOwnProperty("raw_value")) {
            obj.raw_value = obj.init_value;
        }

        if (obj.hasOwnProperty("sysex2")) {
            obj.two_values = true;    // true for the controls that can have two values, available with the EXP pedal
            obj.init_value2 = obj.init_value;
            obj.raw_value2 = obj.raw_value;
        } else {
            obj.two_values = false;
        }

        obj.changed = function () {
            return obj.raw_value !== obj.init_value;
        }

    });

} // defineControls()

defineControls();
