
let activity_in = false;

export function showMidiInActivity(input_num = 1) {
    console.log("showmidiinactivity", input_num, `#midi-in-led-${input_num}`);
    if (!activity_in) {
        activity_in = true;
        const led = $(`#midi-in-led-${input_num}`);
        console.log(led);
        led.addClass("on");
        let timeoutID = window.setTimeout(
            function () {
                timeoutID = null;
                led.removeClass("on");
                activity_in = false;
            },
            500);
    }
}

let activity_out = false;

export function showMidiOutActivity() {
    if (!activity_out) {
        activity_out = true;
        $("#midi-out-led").addClass("on");
        let timeoutID = window.setTimeout(
            function () {
                timeoutID = null;
                $("#midi-out-led").removeClass("on");
                activity_out = false;
            },
            500);
    }
}
