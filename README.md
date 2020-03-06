# Interactive Video
A Vue.js solution to the coding exercise by Latitude, and hosted with Firebase hosting at [https://interactive-video-6f911.web.app/](https://interactive-video-6f911.web.app/)

I have implemented solutions 1, 2, 3(b), and 4.

## Prerequisites
- The project uses faker library to generate random comments to do this, ensure you have [json-server](https://github.com/typicode/json-server) installed globally.
- Go to the dir `~src/assets/json` and run `json-server generator.js`. This would create a db-`timestamp`.json file which you should rename to comments.json

## Project setup
Do the following to setup the project
```
- clone the repo
- cd interactive-video
- yarn/npm install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```
Afterwards, you can either run the build locally using [http-server](https://github.com/http-party/http-server) or deploy the dist folder to your server or Firebase hosting

### Lints and fixes files
```
yarn lint
```
