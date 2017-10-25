#!/usr/bin/env bash

git pull "origin" "develop"

rm -rf node_modules/

npm install

return