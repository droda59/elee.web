import { inject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { QuickRecipe } from "app/quick-recipe/models/quick-recipe";
import { QuickRecipeSearchResult } from "app/quick-recipe/models/quick-recipe-search-result";
import "fetch";

@inject("admin-api-service")
export class AdminQuickRecipeService {
	private _httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this._httpClient = httpClient;
	}

	saveRecipe(uniqueName: string, quickRecipe: QuickRecipe): Promise<boolean> {
		return this._httpClient.fetch(`api/quickrecipe/${uniqueName}`, {
			method: "put",
			body: json(quickRecipe)
		}).then(response => response.json());
	}

	getRecipesToReview(): Promise<Array<QuickRecipeSearchResult>> {
		return this._getReviewedRecipes(false);
	}

	getReviewedRecipes(): Promise<Array<QuickRecipeSearchResult>> {
		return this._getReviewedRecipes(true);
	}

	private _getReviewedRecipes(reviewed: boolean): Promise<Array<QuickRecipeSearchResult>> {
		return this._httpClient.fetch(`api/quickrecipe/search/review?reviewed=${reviewed}`)
			.then(response => response.json());
	}
}
