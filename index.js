var am2315_addon = require('./build/Release/am2315.node');
var am2315 = new am2315_addon.AM2315();
var Service,
    Characteristic;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory('homebridge-pi-sensor', 'PiSensor', PiSensorAccessory);
}

function PiSensorAccessory(log, config) {
    this.log = log;
    this.name = config['name'];
    this.service = new Service.TemperatureSensor(this.name);
    this.service.getCharacteristic(Characteristic.CurrentTemperature).on('get', this.getState.bind(this));
}
PiSensorAccessory.prototype.getState = function(callback) {
    callback(null, am2315.temperature())
}

PiSensorAccessory.prototype.getServices = function() {
    return [this.service];
}
