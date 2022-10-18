// (async function connect() {
//     try {
//         const msg = { data: "i am test message" };
//         const connection = await amqp.connect('amqp://localhost:5672');
//         const channel = await connection.createChannel();
//         const result = await channel.assertQueue('test');
//         channel.sendToQueue('test', Buffer.from(JSON.stringify(msg)));
//         console.log('message sent successfully');
//     } catch (e) {
//         console.log('error in queue', e);
//     }
// })();
