import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {QuickRecipe, QuickRecipeSearchResult} from "app/quick-recipe/models/quick-recipe";

@autoinject()
export class QuickRecipeService {
    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient;
    }

    findRecipes(searchTerms: string): Promise<Array<QuickRecipeSearchResult>> {
        return this._httpClient.createRequest(null)
            .withUrl("http://eleeapi.azurewebsites.net/api/quickrecipe/search?query=" + searchTerms)
            .withHeader("Accept", "application/json")
            .asGet()
            .send();
    }

    getRecipesToReview(): Promise<Array<QuickRecipeSearchResult>> {
        return this._httpClient
            .get("http://eleeapi.azurewebsites.net/api/review/");
    }

    getRecipe(id: string): Promise<QuickRecipe> {
        return this._httpClient
            .get("http://eleeapi.azurewebsites.net/api/quickrecipe/" + id);
    }

    saveRecipe(quickRecipe: QuickRecipe): Promise<boolean> {
        return this._http.createRequest(null)
            .withUrl("http://eleeapi.azurewebsites.net/api/quickrecipe", quickRecipe)
            .withHeader("Content-Type", "application/json")
            .asPut()
            .send();
    }

    report(id: string): Promise<boolean> {
		return this._httpClient
            .put("http://eleeapi.azurewebsites.net/api/review/flag/" + id);
    }
}
