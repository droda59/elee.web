-----------
  READ ME  
-----------
This is what you need to know and do to run this shit. 

--------------
  SERVER API
--------------

Preparation
-----------
To be able to run the server api, you need to do the following: 

- Install MongoDB
	https://www.mongodb.org/downloads#production
	Current release is 3.0.5
	
- RTFM
	http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/
	Configure a Windows Service for MongoDB: 
		In Admin command prompt: 
			Create db and log folders ("mkdir C:\dev\mongodb\db" and "mkdir C:\dev\mongodb\log")
		In the MongoDB installation folder, create a mongod.cfg file with the following actual content: 
			systemLog:
				destination: file
				path: c:\dev\mongodb\log\mongod.log
			storage:
				dbPath: c:\dev\mongodb\db
		In Admin commant prompt: 
			sc.exe create MongoDB binPath= "C:\mongodb\bin\mongod.exe --service --config=\"C:\mongodb\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"
			All quotes and double quotes are important as-is. This will install the mongodb service and start it automatically at startup. 
			
			
Executing the app
-----------------
To run the API, run the Visual Studio solution. It contains a REST API that you can use to test and develop. 
To use it, open a REST client (https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo). 

- ParserTestController
	/parsertest/get: Returns the list of recipes in the database in SearchResult format (id, name, url)
	ex. GET http://localhost:50817/api/parsertest
	
	/parsertest/get/{id}: Returns the recipe with the id in the database, if it exists
	ex. GET http://localhost:50817/api/parsertest/e879fde3-9bf3-47c9-bbb8-03b163a45ca8
	
	/parsertest/put?url={url}: Parses the url for a known recipe, inserts it in the database, and returns it. 
	ex. PUT http://localhost:50817/api/parsertest?url=http://www.ricardocuisine.com/recettes/5409-pouding-au-chocolat

	
--------------
  CLIENT APP
--------------

Preparation
-----------
To be able to run the client app, you need to do the following: 

- Install Node globally
	https://nodejs.org/download/

- Install jspm globally
	! The latest Aurelia version uses the latest jspm beta version. However, there are 
	stll known bugs in that version. So install the current release version of jspm. 
	npm install jspm -g

- Install app packages
	navigate to solution folder /Source/CookItNow.Web/
	npm install
	jspm install

You will want to be able to bundle the Aurelia script files and the project views 
eventually. For this, you need to install the following: 

- Install Aurelia-cli globally
	npm install aurelia-cli -g


Executing the app
-----------------
The Aurelia script files bundle is already included in the /dist folder of the app. 
However, ou may need to re-bundle the Aurelia script files (when you update Aurelia, 
for example). To bundle the Aurelia script files, you need to do the following: 

- Update Aurelia bundle
	navigate to solution folder /Source/CookItNow.Web/
	aurelia bundle --force

Gulp tasks are setup to build, run and watch the application. Here is a description
of each such task. You run these tasks either from your IDE or in a console from the 
/Source/CookItNow.Web/ folder. 

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
	Cleans de /dist folder, compiles the application, and sets up a local web server 
	and runs the application, normally at localhost:9000. 
	
- gulp watch
	Does exactly like the serve task, but also listens for changes in typescript, less and
	html files. If those files change, gulp will build them again and update its
	running app through browser sync. 
	watch-ts, watch-less and watch-html also exist, for better control over what you 
	need to do. 