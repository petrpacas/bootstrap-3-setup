# Grunt + Bootstrap 3 Setup (v2.3.3) #

Starter pack for ease of mind

## Current Bootstrap version ##

*3.3.7 (SCSS)*

## Build requirements ##

- [Node.js](https://nodejs.org/en/download/)
- [Grunt's CLI](https://gruntjs.com/getting-started/)

## How to use ##

`npm install`
installs dependencies

`grunt`
starts and opens reload server for development (localhost:2222)

(When using PHP, change proxy in the Gruntfile's BrowserSync settings accordingly)

`grunt build`
runs build tasks for staging/production

(For production, remove the local jQuery inside `index.html` and uncomment the CDN one)
