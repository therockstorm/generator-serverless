# <%= serviceName %>

## Setup

- Install/update nvm, `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash`
- Clone this repository, cd into it, and run `nvm install && nvm use && yarn`

## Developing

- Run tests, `yarn test`
- Invoke locally, `yarn invoke`

## Deploying

- Ensure your [AWS credentials are available](https://serverless.com/framework/docs/providers/aws/guide/credentials/) and run `STAGE=your-stage DEPLOYMENT_BUCKET=your-bucket yarn deploy`
