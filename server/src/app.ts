import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import users from "./data/users";
import JWT from "jsonwebtoken";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3100;
app.use(cors());
// req.body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// routes
app.post("/register", (req: Request, res: Response) => {
  const userData = req.body;
  // validate data
  // encode password. https://www.npmjs.com/package/bcrypt
  // store to DB
  // send 201 or 200 code when created
  // send 409 code when data is duplicated
  // send 400
  res.send(userData);
});

app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = username && users.find((user) => user.username === username);
  if (!user) return res.sendStatus(401); // unauthorized
  // create jwt
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
  const accessTokenSecret = process.env.JWT_SECRET || "helloworld"; // should generate a hash key, no meaning
  const accessToken = JWT.sign(payload, accessTokenSecret, {
    expiresIn: "1h",
  });
  const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET || "abcd1234"; // should generate a hash key, no meaning
  const refreshToken = JWT.sign(payload, refreshTokenSecret, {
    expiresIn: "30 days",
  });
  return res.status(200).json({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
});

app.post("/logout", (req: Request, res: Response) => {
  res.send("logout");
});

app.post("/refresh-token", (req: Request, res: Response) => {
  res.send("refresh-token");
});

app.get(
  "/protected-route",
  (req: Request, res: Response, next: NextFunction) => {
    // middleware to verify token
    const authorization = req.headers["authorization"];
    const jwtToken = authorization?.split(" ")?.[1];
    if (!jwtToken) return res.sendStatus(401); // unauthorized
    const secret = process.env.JWT_SECRET || "helloworld"; // should generate a hash key, no meaning
    try {
      const payload = JWT.verify(jwtToken, secret);
      console.log(payload);
      next();
    } catch (error) {
      return res.sendStatus(401); // unauthorized
    }
  },
  (req: Request, res: Response) => {
    res.send("protected-route");
  }
);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running ...");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
