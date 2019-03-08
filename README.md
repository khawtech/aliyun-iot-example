# aliyun-iot-example
Simulates an IoT device publishing on a topic in Alibaba Cloud IoT. Function Compute and Table Store are pushed using Alibaba Cloud Fun.

This examples assumes `ap-southeast-1` as region (Singapore).

## steps
- Write your credentials to the `.env` file.
- From the `template.yml` file, change the services names to more suitable names for you.
- Install fun if you don't have it yet (`npm install @alicloud/fun -g`).
- Run `fun deploy` and wait to the process to finish.
- Create an Iot product following instructions at [Alibaba Cloud IoT Documentation](https://www.alibabacloud.com/help/product/30520.htm).

## reference material
- PDF with some information about [MQTT and Alibaba Cloud IoT]().
