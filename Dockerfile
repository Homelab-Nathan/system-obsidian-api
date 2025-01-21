FROM node:22-alpine AS build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npm run build

# Étape 2 : Production
FROM node:22-alpine AS production
RUN apk add --no-cache git

WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

ENV NODE_ENV=production
ENV GIT_TOKEN=change_me
ENV PORT=80

EXPOSE 80
CMD [ "node", "dist/main.js" ]
