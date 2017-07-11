var Service,
    Characteristic;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-pi-sensor", "PiSensor", PiSensorAccessory);
}

function PiSensorAccessory(log, config) {
    this.log = log;
    this.name = config["name"];
    this.service = new Service.TemperatureSensor(this.name);
    this.service.getCharacteristic(Characteristic.CurrentTemperature).on('get', this.getState.bind(this));
}
PiSensorAccessory.prototype.getState = function(callback) {
    callback(null, 88.8)
}

PiSensorAccessory.prototype.getServices = function() {
    return [this.service];
}
