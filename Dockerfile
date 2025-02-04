FROM node:18-alpine

WORKDIR /kepegServer

COPY package*.json ./

RUN npm install

COPY . .

# ENV PORT=3000
# ENV DATABASE_URL=postgresql://postgres:Ccdn0koment@postgres:5432/KepegServerDB?schema=public

RUN npx prisma generate
# RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ];

