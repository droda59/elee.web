import {QuickRecipe} from "interfaces/quick-recipe";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

@inject (HttpClient)
export class QuickRecipePage {
    http:HttpClient;
    url:string = "../../Json/recipeModel-pouding.json";
    recipe:QuickRecipe;
	
	constructor(http:HttpClient) {
		this.http = http;
	}
	
	activate() {
        return this.http.get(this.url).then(response => {
            this.recipe = response.content;
        });
	}
}