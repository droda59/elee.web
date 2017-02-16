import { inject, NewInstance } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { Configure } from "aurelia-configuration";
import { ServiceEventInterceptor } from "app/shared/service-event-interceptor";
import { QuickRecipe } from "app/quick-recipe/models/quick-recipe";
import { QuickRecipeSearchResult } from "app/quick-recipe/models/quick-recipe-search-result";
import "fetch";

@inject(NewInstance.of(HttpClient), Configure, ServiceEventInterceptor)
export class QuickRecipeService {
	private _httpClient: HttpClient;

	constructor(httpClient: HttpClient, configure: Configure, interceptor: ServiceEventInterceptor) {
		this._httpClient = httpClient.configure(config => {
			config
				.useStandardConfiguration()
				.withDefaults({
					headers: {
						"Accept": "application/json",
						"X-Requested-With": "Fetch"
					}
				})
				.withInterceptor(interceptor)
				.withBaseUrl(configure.get("api"));
		});
	}

	findRecipes(searchTerms: string): Promise<Array<QuickRecipeSearchResult>> {
		return this._httpClient.fetch(`api/quickrecipe/search?query=${searchTerms}`)
			.then(response => response.json());
	}

	// findRecipesAdvanced(searchTerms: string, ingredients: string, maximumTime: number): Promise<Array<QuickRecipeSearchResult>> {
	// 	return this._httpClient.fetch(`api/quickrecipe/search?query=${searchTerms}&includedIngredients=${ingredients}&maximumTime=PT${maximumTime}M`)
	// 		.then(response => response.json());
	// }

	getPaged(skip: number, take: number): Promise<Array<QuickRecipeSearchResult>> {
		return this._httpClient.fetch(`api/quickrecipe/search/paged?skip=${skip}&take=${take}`)
			.then(response => response.json());
	}

	getRecipe(uniqueName: string): Promise<QuickRecipe> {
		return this._httpClient.fetch(`api/quickrecipe/${uniqueName}`)
			.then(response => response.json());
	}

	report(uniqueName: string): Promise<boolean> {
		return this._httpClient.fetch(`api/review/flag/${uniqueName}`, {
			method: "put"
		}).then(response => response.json());
	}
}
