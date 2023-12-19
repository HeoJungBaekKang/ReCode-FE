FROM node:14 as builder

WORKDIR /recode-fe
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM alpine:latest
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
RUN apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone

FROM nginx:latest
COPY --from=builder /recode-fe /usr/share/nginx/html/
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
