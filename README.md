# Order Backend

A containerized Node.js backend for order processing, built with Express, PostgreSQL, Docker Compose, and Kafka.

The project focuses on backend fundamentals including layered architecture, transactional database writes, graceful shutdown, environment-based configuration, automated testing, and event-driven workflows.

## Architecture

Client
→ Express Router
→ Service Layer
→ Repository Layer
→ PostgreSQL

Order creation also publishes an `OrderCreated` event to Kafka for asynchronous downstream processing for analytics. 

## Features

- REST API for creating and retrieving orders
- PostgreSQL persistence with connection pooling
- Transactional order creation with `BEGIN`, `COMMIT`, and `ROLLBACK`
- Layered route / service / repository architecture
- Global error handling
- Graceful shutdown for HTTP server, database pool, and Kafka producer
- Environment-based configuration
- Jest and Supertest tests
- Dockerized Node.js and PostgreSQL services
- Persistent PostgreSQL volume
- Kafka-based `OrderCreated` event publishing

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Kafka
- KafkaJS
- Docker
- Docker Compose
- Jest
- Supertest

## Roadmap
- [x] PostgreSQL persistence
- [x] Docker / Docker Compose
- [x] Kafka broker
- [x] Kafka producer
- [ ] Automatic topic provisioning
- [ ] Kafka consumer
- [ ] Async analytics consumer
- [ ] Retry and idempotency handling
- [ ] Structured logging / metrics
- [ ] Transactional outbox pattern

## Use of AI

This project use ChatGPT in the following tasks:
1. Syntax checking
2. Implementation discussion 
3. Code Review 
4. Debugging in complicated problems
5. Pretty-formatting in codebase
5. First version of ReadME.