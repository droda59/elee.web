import {IQuickRecipe} from "interfaces/quick-recipe";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

@inject (HttpClient)
export class QuickRecipe {
    http:HttpClient;
    url:string = "../../Json/recipeModel-pouding.json";
    recipe:IQuickRecipe;
	
	constructor(http:HttpClient) {
		this.http = http;
	}
	
	activate() {
        return this.http.get(this.url).then(response => {
            this.recipe = response.content;
        });
	}
}