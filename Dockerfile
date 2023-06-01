FROM node
WORKDIR /app
COPY package.json .
RUN npm i
COPY tsconfig.json .
COPY src src
RUN npx tsc
CMD node dist/main.js