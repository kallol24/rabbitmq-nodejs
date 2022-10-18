const amqp = require('amqplib');
const { rabbitMQ } = require('./config');

// https://www.youtube.com/watch?v=igaVS0S1hA4&ab_channel=Computerix
// 1: Connect to RabbitMQ server
// 2: Create a new channel on that connection
// 3: Create the exchange
// 4: Publish the message to that exchange with a routing key

class Producer {
    channel;

    async createChannel() {
        try {
             const connection = await amqp.connect(rabbitMQ.url);
             this.channel = await connection.createChannel();
        } catch (e) {
            console.log('error', e);
        }
    }

    async publishMessage(routingKey, message) {
        if (!this.channel) {
            await this.createChannel();
        }

        const logDetals = {
            logType: routingKey,
            message,
            dateTime: new Date(),
        };

        try {
            await this.channel.assertExchange(rabbitMQ.exchangeName, "direct");
            await this.channel.publish(
                rabbitMQ.exchangeName,
                routingKey,
                Buffer.from(JSON.stringify(logDetals))
            );
        } catch (e) {
            console.log('error', e)
        }
    }
};

module.exports = Producer;