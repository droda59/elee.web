import { inject, NewInstance } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { Configure } from "aurelia-configuration";
import { ServiceEventInterceptor } from "app/shared/service-event-interceptor";
import { QuickRecipe } from "app/quick-recipe/models/quick-recipe";
import { QuickRecipeSearchResult } from "app/quick-recipe/models/quick-recipe-search-result";
import "fetch";

@inject(NewInstance.of(HttpClient), Configure, ServiceEventInterceptor)
export class AdminQuickRecipeService {
	private _httpClient: HttpClient;

	constructor(httpClient: HttpClient, configure: Configure) {
		this._httpClient = httpClient.configure(config => {
			config
				.useStandardConfiguration()
				.withDefaults({
					headers: {
						"Accept": "application/json",
						"X-Requested-With": "Fetch",
                        "X-Admin": configure.is("development")
					}
				})
				.withBaseUrl(configure.get("api"));
		});
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
