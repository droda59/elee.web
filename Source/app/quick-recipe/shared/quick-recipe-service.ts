import {autoinject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {QuickRecipe} from "app/quick-recipe/shared/models/quick-recipe";
import {QuickRecipeSearchResult} from "app/quick-recipe/shared/models/quick-recipe-search-result";
import "fetch";

@autoinject()
export class QuickRecipeService {
    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient.configure(config => {
            config
                .useStandardConfiguration()
                .withDefaults({
                    headers: {
                        "Accept": "application/json",
                        "X-Requested-With": "Fetch"
                    }
                })
                .withBaseUrl("http://eleeapi.azurewebsites.net/");
        });
    }

    findRecipes(searchTerms: string): Promise<Array<QuickRecipeSearchResult>> {
        return this._httpClient.fetch("api/quickrecipe/search?query=" + searchTerms)
            .then(response => response.json());
    }

    getRecipesToReview(): Promise<Array<QuickRecipeSearchResult>> {
        return this._httpClient.fetch("api/review")
            .then(response => response.json());
    }

    getRecipe(id: string): Promise<QuickRecipe> {
        return this._httpClient.fetch("api/quickrecipe/" + id)
            .then(response => response.json());
    }

    saveRecipe(id: string, quickRecipe: QuickRecipe): Promise<boolean> {
        return this._httpClient.fetch("api/quickrecipe/" + id, {
            method: "put",
            body: json(quickRecipe)
        }).then(response => response.json());
    }

    report(id: string): Promise<boolean> {
        return this._httpClient.fetch("api/review/flag/" + id, {
            method: "put"
        }).then(response => response.json());
    }
}
