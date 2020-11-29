FROM node:8.9-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY ./dist ./dist
COPY ./static ./static
VOLUME ["/usr/src/app/config"]
EXPOSE 3001
CMD node dist/app.js