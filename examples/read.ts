import * as Jackin from 'jackin';
import * as GPIO from '../index';

const GPIO_PIN = 25;
const WAIT_TIME_MS = 500;


let gpio_pin = {
    note: ""
    ,gpio: null
};
const gpio = new GPIO.LinuxGPIO( gpio_pin, GPIO_PIN );

function get_value(): Promise<void>
{
    return new Promise( (resolve, reject) => {
	gpio.getValue()
	    .then( (value) => {
                console.log( value );

                setTimeout(
                    () => get_value()
                    ,WAIT_TIME_MS
                );
            });
    });
}


gpio
    .setMode( Jackin.Mode.read )
    .then( () => get_value() );
