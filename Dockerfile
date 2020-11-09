FROM node:12.16.1-alpine As builder

WORKDIR /usr/src/app

COPY . .

RUN npm i

RUN npm run build

FROM nginx:1.15.8-alpine

COPY --from=builder /usr/src/app/dist/front/ /usr/share/nginx/html
