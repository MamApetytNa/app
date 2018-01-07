#!/bin/bash

set -e

echo "==================="
echo "== Release & Run =="
echo "==================="

echo "= Build ==========="
npm run build

echo "= Release ========="
npm run release

echo "= Copying package ="
mkdir -p ~/release
cp release.zip ~/release
cd ~/release

echo "= Extracting ====="
unzip -o release.zip

echo "= Installing ====="
yarn

echo "= Starting ======="
npm start

set +e
