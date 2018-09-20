# <%= serviceName %>

## Developing

```shell
# Install dependencies
nvm install && nvm use && npm install

# Run tests, format, and lint
npm test

# Build with webpack and start local server
npm start
```

### Deploying / Publishing

```shell
# Build and push Docker image
npm run deploy:docker

# Deploy serverless stack
npm run deploy
```
