const app = require("express")();
const amqp = require("amqplib");

const port = 3002;

(async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("test");
        channel.consume('test', (message) => {
            const msg = JSON.parse(message.content.toString());
            console.log(msg);
            channel.ack(message);
        })
        console.log("message consumed successfully");
    } catch (e) {
        console.log("error in queue", e);
    }
})();

app.listen(port, () => console.log(`app running on port ${port}`));
