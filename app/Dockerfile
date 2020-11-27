#FROM node:15.3.0-alpine3.10 as builder
#WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH
#COPY ./package.json .
#RUN yarn
#COPY . .
#RUN yarn build
#
#FROM busybox
#WORKDIR /app
#COPY --from=builder /app/build .

FROM busybox
WORKDIR /app
COPY ./build .
