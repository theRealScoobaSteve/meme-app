# meme-app

## SetUp
- Create a .env file in the route directory
- add the follwing config
```
SERVER_PORT=3001
CLIENT_PORT=3000
DB_PASSWORD=123456
DB_USERNAME=root
DB_NAME=backend
```

- Create a .env file within ./api folder
- add the following config
```
JWT_SECRET=zsdfghnuygbtyvfhftrcvkhbyt
JWT_EXPIRATION_TIME=150000
```
## Starting up
- Make sure you have docker installed
- run ```docker-compose build``` in the project root
- run ```docker-compose up``` in the project root
- go to http://localhost:3050

## Testing
 To run the API unit tests, you will need to sh into a container
 - ```docker exec -it api sh```
 - run yarn test to run the test suite

## Enhancements
- Add unit tests via enzyme for the frontend
- Add integration tests with puppeteer
- Use a cookie to store access token
- Use SCSS for better styling
