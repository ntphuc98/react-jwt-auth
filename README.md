# ReactJS + ExpressJS + JWT Authentication

## Setup

### Client

```
npx create-react-app client --template typescript
```

- react-router-dom

```
npm i react-router-dom
```

```
npm i @types/react-router-dom -D
```

### Server

```
mkdir server
```

```
cd server
```

```
npm init -y
```

```
npm install express dotenv cors
```

```
npm i -D typescript @types/express @types/node @types/cors concurrently nodemon
```

- `package.json`

```json
{
  "scripts": {
    "build": "npx tsc",
    "start": "node build/app.js",
    "dev": "concurrently \"npx tsc --watch\" \"nodemon -q build/app.js\""
  }
}
```

```
npx tsc --init
```

- `tsconfig.json`

```json
{
  "baseUrl": "./src"
}
```

- `src/app.ts`

```javascript
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3100;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
```

## JWT

- [JSON Web Tokens](https://jwt.io)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

```
npm install jsonwebtoken
```

```
npm i @types/jsonwebtoken -D
```

## Cookie Parser

- [cookie-parser](https://github.com/expressjs/cookie-parser)

```
npm i cookie-parser
```

```
npm i @types/cookie-parser -D
```

## Flows

1. jwt
`JWT = base64UrlEncode(header) + "." + base64UrlEncode(payload) + "." + base64UrlEncode(signature)`

- header: algorithm (HS256) and token type (JWT)
- payload: user's public information
- signature:
  `HMACSHA256( base64UrlEncode(header) + "." + base64UrlEncode(payload), SECRET_KEY )`

2. Access token

- expires
  - should be short-lived. `30m`, `1h`, `2h`,...
  - limit the risk of leaked access tokens
  - short-lived access tokens and no refresh tokens ?

3. Refresh token

- same `access token` with different secret
- expires
  - should be long-lived
  - Non-expiring access tokens?
- when logout -> how to remove refresh token?
  - store in DB
  - remove from DB when logout to check valid refresh token

4. login

- check user?
- generate `access token` and `refresh token`
- `access token` is sent by json response
- `refresh token` is attached in `cookie` with `secure` and `httpOnly` flag and `/refresh-token` path
- send `401` code for invalid information
- send `200` code for successful

5. logout

- verify refresh token
- remove refresh token on DB
- send `301` code to redirect to `login` path
- send `401` code for unauthorization

6. refresh access token

- 2 ways:
  - Client: check `access token` expired before send request
    - can change exprires
    - handle timezone
    - reduce request to server
  - Server: check `access token` in `cookie`
  - send `400` code for invalid token
  - send `401` code for unauthorization when expired
  - send `201` code for successful

7. verify access token

- get `access token` from `authorization header`
- send `401` code for `unauthorization` - invalid token
- send `401` code and ??? for `unauthorization` - token expired

## VS Code extension

- REST Client
