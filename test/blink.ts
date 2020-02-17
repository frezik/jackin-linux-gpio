import * as Tap from 'tap';
import * as Jackin from 'jackin';
import * as GPIO from '../index';
import * as Process from 'process';

/*
 * Test blinking output on GPIO 8. You must set "FULL_TEST=1" as an 
 * environment var to run this test.
 */

const GPIO_PIN = 8;
const BLINK_TIME_MS = 10000;

if(! Process.env['FULL_TEST'] ) {
    Tap.pass( "Skip test; set environment var FULL_TEST=1 to run" );
    Process.exit( 0 );
}


let gpio_pin = {
    note: ""
    ,gpio: null
};
const gpio = new GPIO.LinuxGPIO( gpio_pin, GPIO_PIN );

Tap.ok( gpio, "Fetched GPIO object for pin " + GPIO_PIN );
gpio.setMode( Jackin.Mode.write )
    .then( () => {
        gpio.setValue( true );
	Tap.pass( "Set GPIO value high" );
    })
    .then( () => new Promise( (resolve, reject) => {
        setTimeout(
            () => resolve()
            ,BLINK_TIME_MS
        );
    }) )
    .then( () => {
	gpio.setValue( false )
        Tap.pass( "Set GPIO value low" );
    });
