FROM node:22-alpine AS build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npm run build

# Étape 2 : Production
FROM node:22-alpine AS production
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
ENV NODE_ENV=production
EXPOSE 3000
CMD [ "node", "dist/main.js" ]
