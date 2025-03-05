FROM node:18 AS build
WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build --configuration=production

FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
EXPOSE 443
