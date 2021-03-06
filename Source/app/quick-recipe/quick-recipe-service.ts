import { inject, NewInstance } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { Configure } from "aurelia-configuration";
import { EventAggregator } from "aurelia-event-aggregator";
import { QuickRecipe } from "app/quick-recipe/models/quick-recipe";
import { QuickRecipeSearchResult } from "app/quick-recipe/models/quick-recipe-search-result";
import "fetch";

@inject(NewInstance.of(HttpClient), Configure, EventAggregator)
export class QuickRecipeService {
	private _httpClient: HttpClient;
	private _isAdmin: boolean;

	constructor(httpClient: HttpClient, configure: Configure, eventAggregator: EventAggregator) {
		this._isAdmin = configure.is("development");
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
		return this._httpClient.fetch(`api/quickrecipe/search?query=${searchTerms}`)
			.then(response => response.json());
	}

	findRecipesAdvanced(searchTerms: string, ingredients: string, maximumTime: number): Promise<Array<QuickRecipeSearchResult>> {
		return this._httpClient.fetch(`api/quickrecipe/search?query=${searchTerms}&includedIngredients=${ingredients}&maximumTime=PT${maximumTime}M`)
			.then(response => response.json());
	}

	getRecipesToReview(): Promise<Array<QuickRecipeSearchResult>> {
		return this._getReviewedRecipes(false);
	}

	getReviewedRecipes(): Promise<Array<QuickRecipeSearchResult>> {
		return this._getReviewedRecipes(true);
	}

	getPaged(skip: number, take: number): Promise<Array<QuickRecipeSearchResult>> {
		return this._httpClient.fetch(`api/quickrecipe/search/paged?skip=${skip}&take=${take}`)
			.then(response => response.json());
	}

	getRecipe(uniqueName: string): Promise<QuickRecipe> {
		return this._httpClient.fetch(`api/quickrecipe/${uniqueName}`)
			.then(response => response.json());
	}

	saveRecipe(uniqueName: string, quickRecipe: QuickRecipe): Promise<boolean> {
		return this._httpClient.fetch(`api/quickrecipe/${uniqueName}`, {
			method: "put",
			body: json(quickRecipe),
			headers: {
				"X-Admin": this._isAdmin
			}
		}).then(response => response.json());
	}

	report(uniqueName: string): Promise<boolean> {
		return this._httpClient.fetch(`api/review/flag/${uniqueName}`, {
			method: "put"
		}).then(response => response.json());
	}

	private _getReviewedRecipes(reviewed: boolean): Promise<Array<QuickRecipeSearchResult>> {
		return this._httpClient.fetch(`api/quickrecipe/search/review?reviewed=${reviewed}`, {
				headers: {
					"X-Admin": this._isAdmin
				}
			})
			.then(response => response.json());
	}
}
