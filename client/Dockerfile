# pull official base image
FROM node:12 AS builder
WORKDIR /app
# add app
COPY . ./
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN sed -i 's/ace\.require*.\W.*\w.*/ace\.Range\;/g' node_modules/react-ace/lib/ace.js
RUN npm install react-scripts -g --silent
RUN react-scripts build

FROM node:12
RUN npm install serve -g --silent
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]
