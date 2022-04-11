# ReactJS + ExpressJS + JWT Authentication

## Setup

### Client

```
npx create-react-app client --template typescript
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
