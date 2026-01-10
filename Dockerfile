FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build-keycloak-theme

FROM scratch AS export
COPY --from=builder /app/dist_keycloak/*.jar /theme/
