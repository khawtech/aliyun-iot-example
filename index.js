const mqtt = require('aliyun-iot-mqtt');

const productKey = 'PRODUCT_KEY';
const deviceName = 'DEVINE_NAME';
const deviceSecret = 'DEVICE_SECRET';

exports.handler = function (event, context, callback) {
  const parsedEvent = JSON.parse(event);
  const {level} = parsedEvent;
  const client = mqtt.getAliyunIotMqttClient({productKey, deviceName, deviceSecret, regionId: context.region});

  const response = function () {
    callback(null, '"OK"');
  };

  client.publish(`/${productKey}/TOPIC_GOES_HERE`, JSON.stringify({level}), [], response);
};
