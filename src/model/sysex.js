import {control} from "./cc.js";
import meta from "./meta.js";
import {control_id} from "./cc";
import {log, warn} from "../debug";
import {toHexString} from "../utils";
import {GROUP_ID, MODEL_ID, SYSEX_CMD} from "./constants";
import {global_conf} from "./global_conf";

export const SYSEX_START_BYTE = 0xF0;
export const SYSEX_END_BYTE = 0xF7;

// results of validate(...):
export const SYSEX_INVALID = 0;
export const SYSEX_IGNORE = 1;
export const SYSEX_PRESET = 2;
export const SYSEX_GLOBALS = 3;

export function validate(data) {

    log("validate", toHexString(data, ' '));

    let type = SYSEX_INVALID;   // default value

    if (data[0] !== SYSEX_START_BYTE) {
        warn("validate: invalid start byte", data[0]);
        return {
            type: SYSEX_INVALID,
            error: "invalid start byte",
            message: "Invalid header"
        };
    }

    let offset = meta.signature.sysex.offset;
    for (let i = 0; i < meta.signature.sysex.value.length; i++) {
        if (data[offset + i] !== meta.signature.sysex.value[i]) {
            log(`validate: invalid sysex at offset ${offset + i}. Expected ${meta.signature.sysex.value[i]}. Found ${data[offset + i]}`);
            return {
                type: SYSEX_IGNORE,
                error: "invalid manufacturer ID",
                message: "Invalid signature. Try selecting a preset."
            };
        }
    }

/*
    FIXME: device id should match midi channel

    if ((data[meta.device_id.sysex.offset] > 0) && (data[meta.device_id.sysex.offset] !== meta.device_id.value)) {
        log(`validate: invalid device_id: ${data[meta.device_id.sysex.offset]}`);
        return {
            type: SYSEX_IGNORE,
            error: "invalid device ID",
            message: "Invalid device ID"
        };
    }
*/

    if (data[meta.group_id.sysex.offset] !== meta.group_id.value) {
        log(`validate: invalid group_id: ${data[meta.group_id.sysex.offset]}`);
        return {
            type: SYSEX_IGNORE,
            error: "invalid group ID",
            message: "Invalid group ID"
        };
    }

    if (data[meta.model_id.sysex.offset] !== meta.model_id.value) {
        log(`validate: invalid model_id: ${data[meta.model_id.sysex.offset]}`);
        return {
            type: SYSEX_IGNORE,
            error: "invalid model ID",
            message: "SysEx is for another Meris product."
        };
    }

    // we ignore known commands, we let the other pass
    const cmd = data[meta.command.sysex.offset];
    // log("***", toHexString(data), data, meta.command.sysex.offset, data[meta.command.sysex.offset], cmd);
    switch(cmd) {
        case SYSEX_CMD.preset_request:
            log("validate: sysex is request for preset");
            type = SYSEX_IGNORE;
            break;
        case SYSEX_CMD.preset_response:
            log("validate: sysex is preset data");
            type = SYSEX_PRESET;
            break;
        case SYSEX_CMD.globals_request:
            log("validate: sysex is request for globals");
            type = SYSEX_IGNORE;
            break;
        case SYSEX_CMD.globals_response:
            log("validate: sysex is globals data");
            type = SYSEX_GLOBALS;
            break;
        case SYSEX_CMD.preset_write:
            log("validate: sysex is preset write");
            type = SYSEX_IGNORE;
            break;
        default:
            log(`validate: sysex is unknown command: ${cmd}`);
            type = SYSEX_IGNORE;
            break;
    }

    const last_byte = data[data.length - 1];
    if (last_byte === SYSEX_END_BYTE) {
        log("validate: the sysex is valid");
        return {
            type,
            error: "",
            message: ""
        }
    } else {
        log(`validate: invalid end marker: ${last_byte}`);
        return {
            type: SYSEX_INVALID,
            error: "invalid end marker",
            message: ""
        }
    }
}

/**
 *
 * @param data
 */
function decodeMeta(data) {
    log("decodeMeta", data);
    meta.preset_id.value = data[meta.preset_id.sysex.offset]
    log("decodeMeta: meta.preset_id.value", meta.preset_id.value);
}

/**
 * Get values from sysex data and store the value in a (new) property "value" in each control.
 * @param data
 * @param controls
 */
function decodeControls(data, controls) {

    for (let i = 0; i < controls.length; i++) {

        if (typeof controls[i] === "undefined") continue;
        if (!controls[i].hasOwnProperty("sysex")) continue;

        let sysex = controls[i].sysex;
        if (!sysex.hasOwnProperty("mask")) continue;

        let raw_value = data[sysex.offset] & sysex.mask[0];

        // let final_value = 0;
        let final_value = controls[i].human(raw_value);

        controls[i]["raw_value"] = raw_value;
        controls[i]["value"] = final_value;

        // 2nd value for the controls that support it:
        if (control[i].hasOwnProperty("sysex2")) {

            sysex = controls[i].sysex2;
            if (!sysex.hasOwnProperty("mask")) continue;

            if (sysex.offset >= data.length) {
                // if second values not present in sysex, than we simply use the first values
            } else {
                raw_value = data[sysex.offset] & sysex.mask[0];
                final_value = controls[i].human(raw_value);
            }

            controls[i]["raw_value2"] = raw_value;
            controls[i]["value2"] = final_value;
        }

        // console.log(`decodeSysExControls: cc=${i} 0x${i.toString(16)}, offset=0x${sysex.offset.toString(16)}, v=${raw_value} 0x${raw_value.toString(16)} ${control[i].name}`);

    }

}

function decodeGlobals(data, globals) {

    //TODO: decodeControls and decodeGlobals should be the same function

    for (let i = 0; i < globals.length; i++) {

        if (typeof globals[i] === "undefined") continue;
        if (!globals[i].hasOwnProperty("sysex")) continue;

        const sysex = globals[i].sysex;
        if (!sysex.hasOwnProperty("mask")) continue;

        globals[i]["value"] = data[sysex.offset] & sysex.mask[0];
    }
}

/**
 * Set values from a SysEx dump
 * @param data
 * @returns {*}
 */
export function decodeSysex(data, ignorePresetID = false) {

    log("decodeSysex: ignorePresetID", ignorePresetID);

    const valid = validate(data);
    switch (valid.type) {
        case SYSEX_PRESET:
            log("decodeSysex: sysex is preset data");
            if (!ignorePresetID) {
                decodeMeta(data);
            }
            decodeControls(data, control);
            return {
                type: SYSEX_PRESET,
                error: "",
                message: ""
            };
        case SYSEX_GLOBALS:
            log("decodeSysex: sysex is globals data");
            decodeGlobals(data, global_conf);
            return {
                type: SYSEX_GLOBALS,
                error: "",
                message: ""
            };
        default:
            log("decodeSysex: sysex is not preset nor globals; probably an echo; ignored");
            return valid;
    }
}

/**
 * Create a SysEx dump data structure
 * @param complete If false do not include the sysex header and footer bytes nor the manufacturer ID
 * @returns {Uint8Array}
 */
export function getPreset(complete = true) {

    const data = new Uint8Array(complete ? 39 : 34);

    let i = 0;

    if (complete) {
        data[i++] = SYSEX_START_BYTE;                               // 0
        data[i++] = 0x00;
        data[i++] = 0x20;
        data[i++] = 0x10;
    }

    data[i++] = 0;    // We set device ID to 0 in order to get a sysex dump that can be sent to any Ottobit Jr..
    data[i++] = meta.group_id.value;
    data[i++] = meta.model_id.value;

    data[i++] = 0x26; // the pedal always sent this value when sending a sysex. (TODO!! - check this is the same command value Ottobit uses)

    data[i++] = meta.preset_id.value;                               // 8

    data[i++] = control[control_id.sample_rate].raw_value;                // 9
    data[i++] = control[control_id.filter].raw_value;
    data[i++] = control[control_id.bits].raw_value;
    data[i++] = control[control_id.stutter].raw_value;
    data[i++] = control[control_id.sequencer].raw_value;
    data[i++] = control[control_id.sequencer_mult].raw_value;
    data[i++] = control[control_id.step1].raw_value;
    data[i++] = control[control_id.step2].raw_value;
    data[i++] = control[control_id.step3].raw_value;
    data[i++] = control[control_id.step4].raw_value;
    data[i++] = control[control_id.step5].raw_value;
    data[i++] = control[control_id.step6].raw_value;
    data[i++] = control[control_id.bypass].raw_value;
    data[i++] = 0; // TODO!! stutter hold? control[control_id.stutter_hold].raw_value;
    data[i++] = control[control_id.sequencer_type].raw_value;
    data[i++] = 0; // TODO!! unknown? control[control_id.??].raw_value;
    data[i++] = control[control_id.tempo].raw_value;

    // values 2 (EXP)
    data[i++] = control[control_id.sample_rate].raw_value2;               // 26
    data[i++] = control[control_id.filter].raw_value2;
    data[i++] = control[control_id.bits].raw_value2;
    data[i++] = control[control_id.stutter].raw_value2;
    data[i++] = control[control_id.sequencer].raw_value2;
    data[i++] = control[control_id.sequencer_mult].raw_value2;
    data[i++] = control[control_id.step1].raw_value2;
    data[i++] = control[control_id.step2].raw_value2;
    data[i++] = control[control_id.step3].raw_value2;
    data[i++] = control[control_id.step4].raw_value2;
    data[i++] = control[control_id.step5].raw_value2;
    data[i++] = control[control_id.step6].raw_value2;      // 37

    if (complete) data[i] = SYSEX_END_BYTE;                         // 38

    // log(data, meta.preset_id.value);

    return data;
}

export function getSysexDataForGlobalConfig(global_num, value) {

    // F0
    // 00 20 10    Meris ID	(different manufacturers have different IDs)
    // 00          Prod ID 	(user definable, matches midi channel)
    // 01          Group ID    (01 = pedal series)
    // 03          Model #	(00 = Ottobit Jr, 01 = Mercury7, 02 = Polymoon, 03 = Enzo)
    // 2A          Command (2A = global edit via sysex)
    // 00          Global Num (listed below, 0 is TRS input)
    // 7F          Value (00 = OFF, 7F = ON)
    // F7

    let data = new Uint8Array(6);

    data[0] = 0x00;
    data[1] = GROUP_ID.pedal;
    data[2] = MODEL_ID.ottobitjr;
    data[3] = 0x2A;
    data[4] = global_num;
    data[5] = value;

    return data;
}
