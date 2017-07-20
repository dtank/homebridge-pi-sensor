# homebridge-pi-sensor

Homebridge plugin for 5-in-1 sensor on raspberry pi

## Dependence

-   node & node-gyp
-   [homebridge](https://github.com/nfarina/homebridge)

## Development

1.  Install plugin: copy the project folder to path `/usr/lib/node_modules/` on pi
2.  Build plugin: `$ sudo npm --prefix /usr/lib/node_modules/homebridge-pi-sensor run build-debug`
3.  Configure homebridge with the following contents in /home/pi/.homebridge-dev/config.json

```json
{
    "bridge": {
        "name": "Homebridge",
        "username": "CC:22:3D:E3:CE:30",
        "port": 51826,
        "pin": "031-45-154"
    },

    "description": "This is an configuration file",

    "accessories": [
        {
            "accessory": "PiSensor",
            "name": "5-in-1 Sensor"
        }
    ]
}
```

4.  Run homebridge: `$ DEBUG=* homebridge -D -U ~/.homebridge-dev -P /usr/lib/node_modules/homebridge-pi-sensor/`
5.  Open your home app on iphone/ipad, add accessories and enjoy it!
