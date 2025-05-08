#!/bin/bash

echo "Install dependencies"

npm install

chown -Rf docker:docker ./

exec "$@";