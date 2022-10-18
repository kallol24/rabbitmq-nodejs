// 1: Connect to RabbitMQ server
// 2: Create a new channel on that connection
// 3: Create the exchange
// 4: Create the queue
// 5: Bind the exchange to the queue
// 6: Consume the message from the queue

const amqp = require('amqplib');
const { rabbitMQ } = require('./config');
const queueName = 'InfoQueue';
const routingKey = 'info';

async function consumeMessage() {
    const connection = await amqp.connect(rabbitMQ.url);
    const channel = await connection.createChannel();
    
    await channel.assertExchange(rabbitMQ.exchangeName, "direct");
    
    const q = await channel.assertQueue(queueName);

    await channel.bindQueue(q.queue, rabbitMQ.exchangeName, routingKey);

    channel.consume(q.queue, msg => {
        const data = JSON.parse(msg.content);
        console.log(data);
        channel.ack(msg);
    })
}

consumeMessage();

