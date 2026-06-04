# Nest With Contract Backend

Nest backend for the `MyContact` contract using `viem` and MongoDB.

## Setup

```bash
npm install
cp .env.example .env
```

Update `.env` with your deployed contract address, RPC URL, wallet private key, and MongoDB connection string.

## Run

```bash
npm run start:dev
```

## APIs

- `GET /contract/name`
- `GET /contract/mobile`
- `GET /contract/user-details`
- `POST /contract/name` with `{ "name": "New Name" }`
- `POST /contract/user-details` with `{ "name": "Name", "mobile": "9876543210" }`
- `GET /contract/events`

Contract events are watched on app startup and stored in MongoDB.
