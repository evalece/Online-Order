From node:lts-trixie-slim

WORKDIR /src


COPY package*.json ./
COPY .dockerignore ./

RUN  npm ci
COPY . . 
EXPOSE 3000

CMD ["npm", "start"]