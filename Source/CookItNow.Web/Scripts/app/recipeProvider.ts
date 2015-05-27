//import {autoinject} from 'aurelia-framework';
//import {HttpClient} from 'aurelia-http-client';
//
//@autoinject
//export class RecipeProvider{
//	url = "http://localhost/api/quickrecipes/";
//  	http:HttpClient;
//  	constructor(http:HttpClient){
//    	this.http = http;
//  	}
//
//	getRecipe(id) {
//		return this.http.jsonp(this.url + id).then(response => {
//			var resp = response.content;
//		});
//  	}
//}
