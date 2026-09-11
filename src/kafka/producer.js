const { Kafka } = require("kafkajs")

const kafka = new Kafka({
    clientId: "order-backend",
    brokers: [process.env.KAFKA_BROKER || "broker:9092"]
})

const producer = kafka.producer()

async function connectProducer() {
    await producer.connect()
}

async function publishOrderCreated(orderID) {
    await producer.send({
        topic: "OrderCreated",
        messages: [
            {
                key: String(orderID),
                value: JSON.stringify({
                    eventType: "OrderCreated",
                    orderID
                })
            }
        ]
    })
}

async function disconnectProducer() {
    await producer.disconnect()
}

module.exports = {
    connectProducer,
    publishOrderCreated,
    disconnectProducer
}