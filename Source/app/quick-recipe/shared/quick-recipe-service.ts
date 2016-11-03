import { inject, NewInstance } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { Configure } from "aurelia-configuration";
import { EventAggregator } from "aurelia-event-aggregator";
import { QuickRecipe } from "app/quick-recipe/shared/models/quick-recipe";
import { QuickRecipeSearchResult } from "app/quick-recipe/shared/models/quick-recipe-search-result";
import "fetch";

@inject(NewInstance.of(HttpClient), Configure, EventAggregator)
export class QuickRecipeService {
	private _httpClient: HttpClient;

	constructor(httpClient: HttpClient, configure: Configure, eventAggregator: EventAggregator) {
		this._httpClient = httpClient.configure(config => {
			config
				.useStandardConfiguration()
				.withDefaults({
					headers: {
						"Accept": "application/json",
						"X-Requested-With": "Fetch"
					}
				})
				.withInterceptor({
		            request(request) {
						eventAggregator.publish("service.request");
		                return request;
		            },
		            response(response) {
						eventAggregator.publish("service.response");
		                return response;
		            }
		        })
				.withBaseUrl(configure.get("api"));
		});
	}

	findRecipes(searchTerms: string): Promise<Array<QuickRecipeSearchResult>> {
		return this._httpClient.fetch("api/quickrecipe/search?query=" + searchTerms)
			.then(response => response.json());
	}

	findRecipesAdvanced(searchTerms: string, ingredients: string, maximumTime: number): Promise<Array<QuickRecipeSearchResult>> {
		return this._httpClient.fetch(`api/quickrecipe/search?query=${searchTerms}&includedIngredients=${ingredients}&maximumTime=PT${maximumTime}M`)
			.then(response => response.json());
	}

	getRecipesToReview(): Promise<Array<QuickRecipeSearchResult>> {
		return this._httpClient.fetch("api/quickrecipe/search/review?reviewed=false")
			.then(response => response.json());
	}

	getReviewedRecipes(): Promise<Array<QuickRecipeSearchResult>> {
		return this._httpClient.fetch("api/quickrecipe/search/review?reviewed=true")
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
