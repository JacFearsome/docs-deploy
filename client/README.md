## docs-client
1. Edit `src/Constants.js` apiUrl value.
2. Build docker image and run
```bash
docker build . -t docs-client
docker run --name docs-client -d -p 8080:80 docs-client
```
