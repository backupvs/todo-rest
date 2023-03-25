## Description

Fullstack app 'Todo list' with React on frontend and ExpressJS on backend. </br>
You can see deployed app here: https://todo-rest.fly.dev/

## Running with Docker
1. Create and configure '.env' file in /client directory:
```env
REACT_APP_API_BASE_URL="http://localhost:3001/api"
REACT_APP_NODE_DEV=development
```
2. Create and configure '.env' file in /api directory:
```env
# DATABASE
ATLAS_URI="<your connection string URI>"

# CORS
CORS_ORIGIN="http://localhost:3000"

# SESSION
SESSION_SECRET=<your session secret>
SESSION_COOKIE_MAX_AGE=3600000 # 1 hour
```
3. Type docker compose command:
```bash
$ docker-compose up --build -d
```
It will launch docker containers.
Then server will be hosted on http://localhost:3001/, client - http://localhost:3000/.

## Running without Docker

1. Create and configure '.env' file as described in previous section.
2. Install dependencies:
```bash
$ cd /api
$ npm install
$ cd ../client
$ npm install
```
3. Run app:
```bash
$ cd /api
$ npm run start:dev
$ cd ../client
$ npm run start
```