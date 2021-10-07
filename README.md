## Front end 
### Description
This repository contains the public frontend project it is an angular SPA web app that handle mangment clusters and api. 
### Technologies
- Angular
- Typescript
- npm

### Set up
```
#Build app and run 
docker build -t carbo-frontend:latest .
docker run -d --restart unless-stopped -p 8080:80 -e API_URL=${your api url} -e SOCKET_URL=${your web socket address}  carbo-frontend:latest
```
