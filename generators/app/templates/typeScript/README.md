# <%= serviceName %>

## Setup

- Install/update nvm, `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash`
- Clone this repository, cd into it, and run `nvm install && nvm use && npm install`

## Developing

- Run tests, `npm test`
- Invoke locally, `npm run invoke`

## Deploying

- Ensure your [AWS credentials are available](https://serverless.com/framework/docs/providers/aws/guide/credentials/) and run `STAGE=your-stage DEPLOYMENT_BUCKET=your-bucket npm run deploy`
