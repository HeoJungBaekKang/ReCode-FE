FROM node:14 as builder
WORKDIR /recode-fe
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=builder /recode-fe/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]