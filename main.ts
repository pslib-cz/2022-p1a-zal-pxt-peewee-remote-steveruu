pins.touchSetMode(TouchTarget.P0, TouchTargetMode.Capacitive);
pins.touchSetMode(TouchTarget.P1, TouchTargetMode.Capacitive);
pins.touchSetMode(TouchTarget.P2, TouchTargetMode.Capacitive);
pins.touchSetMode(TouchTarget.LOGO, TouchTargetMode.Capacitive);

radio.setTransmitSerialNumber(true);

let xmod;
let ymod;

basic.forever(function () {
    xmod = Math.floor((input.acceleration(Dimension.X) + 1024) / 8); // floor kvuli 255
    xmod = Math.constrain(xmod, 0, 255); // <0, 255>
    ymod = Math.floor((input.acceleration(Dimension.Y) + 1024) / 8);
    ymod = Math.constrain(ymod, 0, 255);

    let data = {
        x: xmod,
        y: ymod,
        a: input.buttonIsPressed(Button.A),
        b: input.buttonIsPressed(Button.B),
        l: input.logoIsPressed(),
        p0: input.pinIsPressed(TouchPin.P0),
        p1: input.pinIsPressed(TouchPin.P1),
        p2: input.pinIsPressed(TouchPin.P2)
    }

    let sendData = String.fromCharCode(data.x) + String.fromCharCode(data.y) + (data.a ? 1 : 0) + (data.b ? 1 : 0) + (data.l ? 1 : 0) + (data.p0 ? 1 : 0) + (data.p1 ? 1 : 0) + (data.p2 ? 1 : 0);
    radio.sendString(sendData);
    basic.pause(10);
})
