DEPENDECIES ON PACKAGE.JSON EXPLAINED:

"devDependencies": { //NECESSARY TO RUN LOCALLY
    "concurrently": "4.1.0", 
    "react-scripts": "3.4.1" //DOES THE COMPILING AND TRANSPILING OF THE JSX CODE
  },
  "dependencies": { 
    "autoprefixer-stylus": "0.14.0", //styling
    "stylus": "0.54.5", //Missing?
    "firebase": "^7.6.0", //connect to the database
    "prop-types": "^15.6.0", //specify what data looks like
    "re-base": "4.0.0", //connect to firebase
    "react": "^16.6.3",
    "react-dom": "^16.6.3",
    "react-router-dom": "^4.2.2",
    "react-transition-group": "^2.2.1", //have nice litte animations            
    "serve": "^10.1.2",
    "stylus": "0.54.5"
  },
  "scripts": {
    "dev": "react-scripts start",
    "start": "react-scripts start",
    "watch": "concurrently --names \"webpack, stylus\" --prefix name \"npm run start\" \"npm run styles:watch\"",
    "build": "react-scripts build",
    "eject": "react-scripts eject",
    "styles": "stylus -u autoprefixer-stylus ./src/css/style.styl -o ./src/css/style.css",
    "now-build": "npm run build && mv build dist",
    "styles:watch": "npm run styles -- -w"
  },
  "browserslist": [
    ">0.2%",
    "not ie <= 11",
    "not op_mini all"
  ]
}