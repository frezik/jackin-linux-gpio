import * as Tap from 'tap';
import * as Jackin from 'jackin';
import * as GPIO from '../index';
import * as Process from 'process';

/*
 * Test input on GPIO 25. You must set "FULL_TEST=1" as an 
 * environment var to run this test.
 */

const GPIO_PIN = 25;
const WAIT_TIME_MS = 10000;

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
gpio.setMode( Jackin.Mode.read )
    .then( () => gpio.getValue() )
    .then( (value) => {
        Tap.ok( value, "Reads high" );
        Tap.comment( "Now connect GPIO " + GPIO_PIN + " to ground" );
	Tap.comment( "Waiting " + (WAIT_TIME_MS / 1000) + " seconds" );
    })
    .then( () => new Promise( (resolve, reject) => {
        setTimeout(
            () => resolve()
            ,WAIT_TIME_MS
        );
    }) )
    .then( () => gpio.getValue() )
    .then( (value) => {
        Tap.ok( !value, "Reads low" );
    });
