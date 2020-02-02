import * as Tap from 'tap';
import * as Jackin from 'jackin';
import * as GPIO from '../index';


let gpio_pin = {
    note: ""
    ,gpio: null
};
const gpio = new GPIO.LinuxGPIO( gpio_pin, 13 );
Tap.ok( gpio, "Got GPIO" );
