import {QuickRecipe} from "interfaces/quick-recipe";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {Compiler} from "gooy/aurelia-compiler";
import {jquery} from "jquery";

@inject (HttpClient, Compiler)
export class QuickRecipePage {
    http:HttpClient;
    url:string = "../../Json/recipeModel-pouding.json";
    recipe:QuickRecipe;
	compiler: Compiler;
	
	constructor(http:HttpClient, compiler: Compiler) {
		this.http = http;
		this.compiler = compiler;
	}
	
	activate() {
        return this.http.get(this.url).then(response => {
            this.recipe = response.content;
        });
	}
    
    attached() {
		$(".step .compose").toArray().forEach(function(element) {
			this.compiler.compile(element, null, null, element);
		}, this);
    }
}