import {fromEvent} from "rxjs";
import {distinctUntilChanged, groupBy, map, merge, mergeAll} from "rxjs/operators";
import {log} from "./debug";
import {animateCC} from "./animate_cc";
import {updateControl, updateModelAndUI} from "./ui";
import {setAndSendPC, updateDevice} from "./midi_out";
import MODEL from "./model";
import {presetDec, presetInc, selectPreset} from "./ui_presets";
import {init, randomize} from "./presets";
import {tapDown, tapRelease, updateBypassSwitch} from "./ui_switches";
import {SEQUENCER_TYPE, STUTTER_HOLD} from "./model/constants";
import {switchKnobsDisplay} from "./ui_knobs";
import {expHeel, expToe, showExpValues, toggleExpEditMode} from "./ui_exp";
import {toggleLibrary, toggleScroll} from "./preset_library";

let kb_enabled = true;

export function disableKeyboard() {
    kb_enabled = false;
}
export function enableKeyboard() {
    kb_enabled = true;
}

function toggleBypass() {
    const c = MODEL.control[MODEL.control_id.bypass];
    const v = MODEL.getControlValue(c) === 0 ? 127 : 0;
    updateDevice(c.cc_type, c.cc_number, v);
    updateBypassSwitch(v);
}

function selectStutterHoldOn() {
    const c = MODEL.control[MODEL.control_id.stutter_hold];
    updateDevice(c.cc_type, c.cc_number, STUTTER_HOLD.on);
    updateControl(c.cc_type, c.cc_number, STUTTER_HOLD.on);
}

function selectStutterHoldOff() {
    const c = MODEL.control[MODEL.control_id.stutter_hold];
    updateDevice(c.cc_type, c.cc_number, STUTTER_HOLD.off);
    updateControl(c.cc_type, c.cc_number, STUTTER_HOLD.off);
}

function selectPitch() {
    const c = MODEL.control[MODEL.control_id.sequencer_type];
    updateDevice(c.cc_type, c.cc_number, SEQUENCER_TYPE.pitch);
    updateControl(c.cc_type, c.cc_number, SEQUENCER_TYPE.pitch);
}

function selectSampleRate() {
    const c = MODEL.control[MODEL.control_id.sequencer_type];
    updateDevice(c.cc_type, c.cc_number, SEQUENCER_TYPE.sample_rate);
    updateControl(c.cc_type, c.cc_number, SEQUENCER_TYPE.sample_rate);
}

function selectFilter() {
    const c = MODEL.control[MODEL.control_id.sequencer_type];
    updateDevice(c.cc_type, c.cc_number, SEQUENCER_TYPE.filter);
    updateControl(c.cc_type, c.cc_number, SEQUENCER_TYPE.filter);
}

function setExpMin() {
    const c = MODEL.control[MODEL.control_id.exp_pedal];
    updateDevice(c.cc_type, c.cc_number, 0);
    updateControl(c.cc_type, c.cc_number, 0);
}

function setExpMax() {
    const c = MODEL.control[MODEL.control_id.exp_pedal];
    updateDevice(c.cc_type, c.cc_number, 127);
    updateControl(c.cc_type, c.cc_number, 127);
}



/**
 * https://codepen.io/fgeorgy/pen/NyRgxV?editors=1010
 */
export function setupKeyboard() {

    let keyDowns = fromEvent(document, "keydown");
    let keyUps = fromEvent(document, "keyup");

    let keyPresses = keyDowns.pipe(
        merge(keyUps),
        groupBy(e => e.keyCode),
        map(group => group.pipe(distinctUntilChanged(null, e => e.type))),
        mergeAll()
    );

    keyPresses.subscribe(function(e) {
        if (e.type === "keydown") {
            keyDown(e.keyCode, e.altKey, e.shiftKey, e.metaKey, e.ctrlKey);
        } else if (e.type === "keyup") {
            keyUp(e.keyCode);
        }
    });

    log("keyboard set up");
}

function animateFromTo(cc, from, to) {
    animateCC(cc, from, to, function (v) {
        updateModelAndUI("cc", cc, v);
        updateDevice("cc", cc, v);
    });
}

function animateTo(cc, to) {
    animateFromTo(cc, MODEL.getControlValue(MODEL.getControl(cc)), to);
}


// noinspection JSUnusedLocalSymbols
function keyUp(code) {

    if (!kb_enabled) return;

    switch (code) {
        case 16:                // Shift
            showExpValues(false);
            expHeel();
            break;
        // case 18:                // ALT
            // $(".header-shortcut").addClass("hidden");
            // switchKnobsDisplay(false);
            // break;
        case 27:                // close all opened panel with ESC key
            // closeAppPreferencesPanel();
            // closeGlobalSettingsPanel();
            // closeHelpPanel();
            // showDefaultPanel();
            break;
        case 84:                // T            tap
            tapRelease("cc-28-127");
            break;
    }
}

function keyDown(code, alt, shift, meta, ctrl) {

    if (!kb_enabled) return;

    log("keyDown", code, alt, shift, meta);

    if (code === 48) {   // 0
        selectPreset(10);
        setAndSendPC(10);
        return;
    }

    if ((code >= 49) && (code <= 57)) {   // 1..9
        let pc;
        if (shift && code <= 54) {
            pc = code - 48 + 10;
        } else {
            pc = code - 48;
        }
        selectPreset(pc);
        setAndSendPC(pc);
        return;
    }

    switch (code) {
        case 9:                 // TAB
            log("TAB");
            toggleExpEditMode();
            break;
        case 16:                // Shift
            showExpValues(true);
            expToe();
            break;
        case 18:                // ALT
            // $(".header-shortcut").removeClass("hidden");
            // switchKnobsDisplay(true);
            break;
    }

    //FIXME: map to key's position, not key's value (in order to be isolated from the keyboard layout)

    if (!alt && !shift && !meta) {
        switch (code) {
            case 82:                // R Randomize
                randomize();
                break;
            case 80:                // P Pitch
                selectPitch();
                break;
            case 83:                // S Sample Rate
                selectSampleRate();
                break;
            case 70:                // F Filter
                selectFilter();
                break;
            case 73:                // I Init
                init();
                break;
            case 85:                // U Stutter hold on
                selectStutterHoldOn();
                break;
            case 74:                // J Stutter hold off
                selectStutterHoldOff();
                break;
            case 33:                // PageUp
                setExpMax();
                break;
            case 34:                // PageDown
                setExpMin();
                break;
            case 38:                // Up arrow
                animateTo(MODEL.control_id.exp_pedal, ctrl ? 63 : 127);
                break;
            case 39:                // Right arrow
                presetInc();
                break;
            case 40:                // Down arrow
                animateTo(MODEL.control_id.exp_pedal, ctrl ? 63 : 0);
                break;
            case 37:                // Left arrow
                presetDec();
                break;
            case 84:                // T            tap
                tapDown("cc-28-127");
                break;
            case 32:                // SPACE
                toggleBypass();
                break;
            // case 83:                // S    toggle sustain
            //     // animateTo(MODEL.control_id.sustain, ctrl ? 0 : 127);
            //     let v = MODEL.getControlValue(MODEL.getControl(MODEL.control_id.sustain)) ? 0 : 127;
            //     updateModelAndUI("cc", MODEL.control_id.sustain, v);
            //     updateDevice("cc", MODEL.control_id.sustain, v);
            //     break;
            case 75:                // K
                toggleScroll();
                break;
            case 76:                // L
                toggleLibrary();
                break;
        }
    }
}
