import {lazy} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {QuickRecipe, QuickRecipeSearchResult} from "app/quick-recipe/models/quick-recipe";

const fetch = !self.fetch ? System.import("isomorphic-fetch") : Promise.resolve(self.fetch);

export class QuickRecipeService {
    private _httpClient: HttpClient;

    constructor(@lazy(HttpClient) private getHttpClient: () => HttpClient) {
        const http = this._httpClient = getHttpClient();
        http.configure(config => {
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

    async findRecipes(searchTerms: string): Promise<Array<QuickRecipeSearchResult>> {
        const response = await this._httpClient.fetch("api/quickrecipe/search?query=" + searchTerms);
        var results = await response.json();

        return results;
    }

    async getRecipesToReview(): Promise<Array<QuickRecipeSearchResult>> {
        const response = await this._httpClient.fetch("api/review");
        var results = await response.json();

        return results;
    }

    async getRecipe(id: string): Promise<QuickRecipe> {
        const response = await this._httpClient.fetch("api/quickrecipe/" + id);
        var results = await response.json();

        return results;
    }

    async saveRecipe(quickRecipe: QuickRecipe): Promise<boolean> {
        const response = await this._httpClient.fetch("api/api/quickrecipe", {
            method: "put",
            body: json(quickRecipe)
        });
        var results = await response.json();

        return results;
    }

    async report(id: string): Promise<boolean> {
        const response = await this._httpClient.fetch("api/api/review/flag/" + id, {
            method: "put",
            body: json(quickRecipe)
        });
        var results = await response.json();

        return results;
    }
}
