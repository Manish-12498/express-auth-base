# auth-starter

> Node.js auth starter with JWT, Redis, OTP, and email verification

A production-ready authentication backend built with Express, MongoDB, and Redis. Includes full registration flow with email verification, OTP-based login, JWT access/refresh tokens, and rate limiting out of the box.

---

## Features

- **Email registration** with token-based verification link (stored in Redis, expires in 24h)
- **OTP login** — password verified first, then a 6-digit OTP is sent to email (expires in 5 min)
- **JWT auth** — short-lived access token (1 min) + long-lived refresh token (7 days), both as `httpOnly` cookies
- **Redis** — OTP storage, refresh token storage, rate limiting
- **Rate limiting** — per-IP + per-email, 5 attempts per 15 min window on register and login
- **Input validation** — Zod schemas with mongo-sanitize to prevent injection
- **Beautiful email templates** — responsive HTML for verification and OTP emails

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Express 5 |
| Database | MongoDB + Mongoose |
| Cache / Store | Redis |
| Auth | JWT (jsonwebtoken) |
| Email | Nodemailer + Gmail SMTP |
| Validation | Zod + mongo-sanitize |
| Password hashing | bcrypt |

---

## Project Structure

```
src/
├── config/
│   ├── config.js                    # Env var validation & exports
│   ├── config.DB.js                 # MongoDB connection
│   ├── config.REDIS.js              # Redis client setup
│   ├── config.generateJWT.js        # Access + refresh token generation
│   ├── config.emailSend.js          # Nodemailer transporter
│   ├── config.email.html.templet.js # HTML email templates
│   └── config.zod.js                # Zod validation schemas
├── controller/
│   └── user.controller.js           # register, verifyUser, loginUser, verifyOTP
├── middlewares/
│   └── tryCatch.js                  # Async error handler wrapper
├── model/
│   └── user.model.js                # Mongoose user schema
├── routes/
│   └── user.routes.js               # Route definitions
└── app.js                           # Express app setup

server.js                            # Entry point — connects DB, Redis, starts server
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Redis instance (local or cloud)
- Gmail account with an [App Password](https://support.google.com/accounts/answer/185833)

### Installation

```bash
git clone https://github.com/your-username/auth-starter.git
cd auth-starter
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/auth-starter
REDIS_URL=redis://localhost:6379

SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password

JWT_SEC_ACCESS=your-access-token-secret
JWT_SEC_REFRESH=your-refresh-token-secret

FRONTEND_URL=http://localhost:5173
APP_NAME=MyApp
```

### Run

```bash
node server.js
```

---

## API Reference

### Register

```
POST /api/register
```

**Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass1"
}
```

**Response:** Sends a verification email. Returns `200` with a confirmation message.

---

### Verify Email

```
GET /api/verify/:token
```

Confirms the email and creates the user account. Token expires in 5 minutes.

---

### Login

```
POST /api/login
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass1"
}
```

**Response:** Sends a 6-digit OTP to the registered email. Returns `200` with a message.

---

### Verify OTP

```
POST /api/verify
```

**Body:**
```json
{
  "email": "john@example.com",
  "otp": "482910"
}
```

**Response:** Sets `accessToken` and `refreshToken` cookies. Returns user object.

---

## Security

- Passwords hashed with bcrypt (12 rounds)
- All tokens stored in `httpOnly`, `secure`, `sameSite: strict` cookies
- OTPs are single-use and deleted from Redis after verification
- Rate limiting applied at registration and login (5 req / 15 min per IP + email)
- Input sanitized against NoSQL injection via `mongo-sanitize`
- Zod enforces schema validation before any DB interaction

---

## License

MIT
