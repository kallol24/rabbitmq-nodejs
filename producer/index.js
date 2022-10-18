const express = require("express");
const cors = require("cors");

const Producer = require("./Producer");

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

const producer = new Producer();

app.get("/", (req, res) => {
    res.send("hi");
});

app.post("/send-msg", async (req, res) => {
    const { routingKey, message } = req.body;
    await producer.publishMessage(routingKey, message);
    res.send("Message sent successfully");
});

app.listen(port, () => console.log(`app running on port ${port}`));
