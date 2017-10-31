#!/usr/bin/env bash

git pull "origin" "master"

rm -rf node_modules/

npm install

return