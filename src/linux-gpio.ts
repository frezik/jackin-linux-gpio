import * as Jackin from 'jackin';
import * as Onoff from 'onoff';


export class LinuxGPIO
    implements Jackin.GPIO
{
    private pin: Jackin.Pin;
    private gpio_num: number;
    private gpio;


    constructor(
        pin: Jackin.Pin
        ,gpio_num: number
    )
    {
        this.pin = pin;
        this.gpio_num = gpio_num;
        this.gpio = new Onoff.Gpio( gpio_num, 'out' );
    }


    getPins(): Jackin.Pin[]
    {
        return [ this.pin ];
    }

    setMode(
        mode: Jackin.Mode
    ): Promise<void>
    {
        let direction = Jackin.Mode.read == mode
            ? 'in'
            : 'out';

        return new Promise( (resolve, reject) => {
            this.gpio.setDirection( direction );
            resolve();
        });
    }

    setValue(
        val: boolean
    ): Promise<void>
    {
        return new Promise( (resolve, reject) => {
            this.gpio.write(
                val ? 1 : 0
                ,(err) => {
                    if( err ) reject( err );
                    else resolve();
                }
            );
        });
    }

    getValue(
    ): Promise<boolean>
    {
        return new Promise( (resolve, reject) => {
            this.gpio.read( (err, value) => {
                if( err ) reject( err );
                else resolve( value > 0 );
            });
        });
    }

    setPullup(
        is_up: boolean
    ): Promise<void>
    {
        // TODO
        return new Promise( (resolve, reject) => {
            resolve();
        });
    }
}
