-----------
  READ ME  
-----------
This is what you need to know and do to run this shit. 

	
--------------
  CLIENT APP
--------------

Preparation
-----------
To be able to run the client app, you need to do the following: 

- Install Node globally
	Get NodeJS here : https://nodejs.org/download/
	You can choose between the LTS version or the latest and greatest version. Both will work though the latest might broke sometime.

- Install app packages
	navigate to solution folder /Source/E133.Web/
	npm install
	jspm install

Executing the app
-----------------
Gulp tasks are setup to build, run and watch the application. Here is a description
of each such task. You run these tasks either from your IDE or in a console from the 
/Source/E133.Web/ folder. 

- gulp bump-version
	Changes the current version in the /package.json file. 

- gulp typedef
	Copies the typescript definition files (*.d.ts) from the Aurelia packages 
	to the /typings folder. This is used when the Aurelia libraries change. 
	
- gulp clean
	Cleans the /dist folder.

- gulp build
	Cleans the /dist folder and compiles the application less stylesheets, 
	typescript files and html views in the /dist folder. 
	build-ts, build-less and build-html also exist, for better control over what you 
	need to do. 
	
- gulp serve
	Cleans the /dist folder, compiles the application, and sets up a local web server 
	and runs the application, normally at localhost:9000. 
	
- gulp watch
	Does exactly like the serve task, but also listens for changes in typescript, less and
	html files. If those files change, gulp will build them again and update its
	running app through browser sync. 
	watch-ts, watch-less and watch-html also exist, for better control over what you 
	need to do. 
	
- gulp export
	This will clean the /dist folder, clean the /export folder, then build, bundle and copy the production files into the /export folder. 
	All those files will be bundled, minified and compressed, to replicate the production environment. You can test on your local machine using a local web server. 