import * as Jackin from 'jackin';


export class LinuxGPIO
    implements Jackin.GPIO
{
    private pin: Jackin.Pin;
    private gpio_num: number;


    constructor(
        pin: Jackin.Pin
        ,gpio_num: number
    )
    {
        this.pin = pin;
        this.gpio_num = gpio_num;
    }


    getPins(): Jackin.Pin[]
    {
        return [ this.pin ];
    }

    setMode(
        mode: Jackin.Mode
    ): Promise<void>
    {
        // TODO
        return new Promise( (resolve, reject) => {
            resolve();
        });
    }

    setValue(
        val: boolean
    ): Promise<void>
    {
        // TODO
        return new Promise( (resolve, reject) => {
            resolve();
        });
    }

    getValue(
    ): Promise<boolean>
    {
        // TODO
        return new Promise( (resolve, reject) => {
            resolve( true );
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
