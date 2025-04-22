# ms‑person Microservice

A NestJS-based microservice for “Person” management in a SaaS ERP, with multi‑tenant support, addresses & phones sub‑resources, domain events via SNS/SQS, Zod validation, Prisma ORM and LocalStack for local development.

---

## 🔍 Table of Contents

1. Tech Stack  
2. Prerequisites  
3. Getting Started  
4. Environment Variables  
5. Docker Compose (Local Dev)  
6. Database Setup & Migrations  
7. Running the App  
8. API Endpoints  
9. Error Handling  
10. Domain Events  
11. Contributing  
12. License  

---

## 🛠️ Tech Stack

- NestJS (v10+)  
- TypeScript  
- Prisma ORM → PostgreSQL  
- Zod for validation  
- AWS SNS/SQS (via LocalStack)  
- GlobalExceptionFilter  
- Docker & Docker‑Compose  

---

## ⚙️ Prerequisites

- Node.js ≥ 18  
- npm or yarn  
- Docker & Docker‑Compose  
- AWS CLI (optional)  

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-org/ms-person.git
cd ms-person
npm install
cp .env.example .env.dev
# Edit .env.dev as needed
docker-compose up -d
npx prisma migrate dev --name init
npx prisma generate
npm run start:dev
```

---

## 🔑 Environment Variables

```ini
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/common
AWS_REGION=us-east-1
SNS_ARN_person_created=arn:aws:sns:us-east-1:000000000000:person-created
SNS_ARN_person_updated=arn:aws:sns:us-east-1:000000000000:person-updated
PORT=3002
```

---

## 🐳 Docker Compose

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    env_file: .env.dev
    ports: ['5432:5432']
  localstack:
    image: localstack/localstack
    environment:
      - SERVICES=sns,sqs
      - DEFAULT_REGION=${AWS_REGION}
    ports: ['4566:4566']
```

---

## 🎯 API Endpoints

**Headers required:**  
`Content-Type: application/json`  
`x-account-id: <accountId>`

### Persons

- `POST /persons`
- `GET /persons/:id`
- `GET /persons?document=...`
- `PATCH /persons/:id`

### Addresses

- `POST /persons/:personId/addresses`
- `GET /persons/:personId/addresses`
- `PATCH /persons/:personId/addresses/:addressId`
- `DELETE /persons/:personId/addresses/:addressId`

### Phones

- `POST /persons/:personId/phones`
- `GET /persons/:personId/phones`
- `PATCH /persons/:personId/phones/:phoneId`
- `DELETE /persons/:personId/phones/:phoneId`

---

## 🛡️ Error Handling

Global exception filter maps:

- `400` → Validation errors
- `404` → Not found
- `409` → Conflict
- `500` → Internal errors

---

## 📣 Domain Events

- Publishes `person.created` and `person.updated` to SNS  
- Uses LocalStack locally  

---

## 🤝 Contributing

1. Fork  
2. Branch  
3. PR  

---

## 📄 License

MIT © 2025 Mentor TI