## docs-server

## Run with docker

You'll neet to edit the config and change the `redisHost` property to be the name of the redis container, which should be `doc-deploy-redis` if you followed the instructions below.

### Build the image
``` bash
docker build -t jac:doc-deploy-server .
```

### Create a network
``` bash
docker network create doc-deploy-network
```

### Start the redis database
``` bash
docker run -d --name doc-deploy-redis --network doc-deploy-network redis
```

### Start the server
``` bash
docker run -d --name doc-deploy-server -p3003:3003 --network doc-deploy-network jac:doc-deploy-server
```
