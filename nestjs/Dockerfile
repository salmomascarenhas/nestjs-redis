FROM node

COPY package*.json /nestjs/
WORKDIR /nestjs/
RUN npm install
# ENV PATH /data/node_modules/.bin:$PATH 

COPY . /nestjs
WORKDIR /nestjs

RUN npm i -g @nestjs/cli

CMD ["npm", "run", "start:dev"]