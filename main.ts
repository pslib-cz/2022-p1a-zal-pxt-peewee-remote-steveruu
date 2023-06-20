//https://tomaskazda.github.io/pxt-sensors/ senzory
//https://tomaskazda.github.io/pxt-magicbit-pca9685/ motory

//piny:

//servo - S1
//levy motor - M1
//pravy motor - M4

//center IR - P15
//levy IR - P14
//pravy IR - P13
//levy RPM check - P12
//pravy RPM check - P8
//sonar trig - P2
//sonar echo - P1
//led - P0

pins.touchSetMode(TouchTarget.P0, TouchTargetMode.Capacitive);
pins.touchSetMode(TouchTarget.P1, TouchTargetMode.Capacitive);
pins.touchSetMode(TouchTarget.P2, TouchTargetMode.Capacitive);
pins.touchSetMode(TouchTarget.LOGO, TouchTargetMode.Capacitive);

radio.setTransmitSerialNumber(true);

let xmod;
let ymod;

basic.forever(function () {
    xmod = input.acceleration(Dimension.X) + 1024;
    xmod = Math.floor(xmod / 8);
    if (xmod > 255) xmod = 255;
    if (xmod < 0) xmod = 0;

    ymod = input.acceleration(Dimension.Y) + 1024;
    ymod = Math.floor(ymod / 8);
    if (ymod > 255) ymod = 255;
    if (ymod < 0) ymod = 0;

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