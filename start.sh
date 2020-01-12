#!/bin/bash

fuser -k 3001/tcp
fuser -k 8081/tcp

sleep 1

nodemon --ignore public/ --ignore database/ index.js