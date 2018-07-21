r.js -o build.js dir=../dist

rm -rf ../dist/templates

# Tables
cd ../dist/tables
rm *.json
ln -s ../../js/tables/*.json .
