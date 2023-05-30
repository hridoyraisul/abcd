FROM node:slim
LABEL authors="raisulhridoy"

WORKDIR /app
COPY . /app
RUN npm install && npm run build
EXPOSE 8080
CMD ["npm","run","serve"]