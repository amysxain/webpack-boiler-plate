# Webpack 3 Boilerplate with Generic PHP form setup
A webpack 3 boilerplate to start with any JS/ES6 based project. The template includes Ajax generic form setup with jQuery Validation, A viewport plugin setion with .section class and some basic css setup
<br>
## Guide
This basic boilerplate is the final output of this comprehensive write up on Medium. I recommend to read this article to know the insight of how you can configure webpack from scratch.
[Webpack 3 quickstarter: Configure webpack from scratch](https://medium.com/@nirjhor123/webpack-3-quickstarter-configure-webpack-from-scratch-30a6c394038a)
<br>
## Install dependencies

```
npm install
```


## Develop locally with webpack-dev-server
1. Run

```
npm run dev
```

2. In your browser, navigate to: [http://localhost:8080/](http://localhost:8080/)
## For bundled output

```
npm run build
```

## For production-ready output

```
npm run build:prod
```
 
## Loaders and Plugins used in this boilerplate

### Loaders
* babel-loader
* html-loader
* sass-loader
* css-loader
* style-loader
* file-loader

### Plugins
* clean-webpack-plugin
* extract-text-webpack-plugin
* html-webpack-plugin
