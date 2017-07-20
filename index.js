var am2315_addon = require('./build/Debug/am2315.node');
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
    this.temperatureService = new Service.TemperatureSensor(this.name);
    this.humidityService = new Service.HumiditySensor(this.name);
    this.temperatureService.getCharacteristic(Characteristic.CurrentTemperature).on('get', this.getTemperature.bind(this));
    this.humidityService.getCharacteristic(Characteristic.CurrentRelativeHumidity).on('get', this.getHumidity.bind(this));
}
PiSensorAccessory.prototype.getTemperature = function(callback) {
    callback(null, am2315.temperature())
}

PiSensorAccessory.prototype.getHumidity = function(callback) {
    callback(null, am2315.humidity())
}

PiSensorAccessory.prototype.getServices = function() {
    return [this.temperatureService, this.humidityService];
}
