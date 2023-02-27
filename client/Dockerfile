# No bash, can still use once confident
# FROM node:alpine

FROM node
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .

EXPOSE 5000
CMD ["npm", "run", "dev"]