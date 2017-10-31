# Atomic Web Service (AWS, REST API) for converting DOC/DOCX files to plain/text, powered by [catdoc](http://www.wagner.pp.ru/~vitus/software/catdoc/), [docx2txt](http://docx2txt.sourceforge.net/) and [Node.js](https://nodejs.org)

Part of the "Automated scientific research workstation" atomic web services ecosystem.

### Requirements/Dependencies

Program runs on modern MacOS and Linux distributions.
To run program you will need:

* [catdoc](http://www.wagner.pp.ru/~vitus/software/catdoc/)
* [docx2txt](http://docx2txt.sourceforge.net/)
* [Node.js](https://nodejs.org)

### Install

##### For [Ubuntu Server Linux](https://www.ubuntu.com/download/server) distribution

```
$ git clone https://github.com/malakhovks/doc-docx-extract-api.git

```

### Use cases

#### Basic usage. Run and config

Run program in **development** mode (default port: 3001; log-mode: development).
[Winston](https://www.npmjs.com/package/winston) logging level will be set to **debug** and transport debug/info/warning logs to Console:

```
$ npm run start-development
```

You can set **port** in ./config/development.json:

```
{
  "port": 3001,
  "log-mode": "development"
}
```

Run program in **production** mode (default port: 3001; log-mode: production).
[Winston](https://www.npmjs.com/package/winston) logging level will be set to **error** and transport error logs to Console:

```
$ npm run start-production
```

You can set **port** in ./config/production.json:

```
{
  "port": 3001,
  "log-mode": "production"
}
```

##### Quick example with cURL:

```
$ curl -X POST -F "doc=@document.doc" http://127.0.0.1:3000/api/doctotext
$ curl -X POST -F "docx=@document.docx" http://127.0.0.1:3000/api/docxtotext
```

##### Response:

```
HTTP/1.1 200 OK
Content-Type: text/plain
body: raw text
```

#### Use with [PM2](http://pm2.keymetrics.io/). Run and config

###### Coming soon

#### Use with custom queue reverse proxy server. Run and config

###### Coming soon

#### Use with custom server of an automatic composition of atomic web services

###### Coming soon