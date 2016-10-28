import { Router } from "aurelia-router";
import { autoinject } from "aurelia-framework";
import { QuickRecipeService } from "app/quick-recipe/shared/quick-recipe-service";
import { QuickRecipeSearchResult } from "app/quick-recipe/shared/models/quick-recipe-search-result";

@autoinject()
export class Welcome {
	results: Array<QuickRecipeSearchResult> = undefined;
	ingredients: Array<SearchIngredient> = [];
	searchTerms: string;
	maximumTime: number = 0;

	constructor(private _router: Router,
		private _service: QuickRecipeService) {
	}

	searchRecipes(): void {
		if (this.searchTerms && this.searchTerms.length >= 3) {
			let searchContainer = $("#search-container")[0];
			// console.log(`${JSON.stringify(this.ingredients)}`);

			// let ingredientsConcat: string = "";
			// if (this.ingredients.length > 0) {
			// 	for (let i = 0; i < this.ingredients.length; i++) {
			// 		ingredientsConcat += this.ingredients[i].tag;

			// 		if (i < this.ingredients.length - 1) {
			// 			ingredientsConcat += ",";
			// 		}
			// 		console.log(`Include Ingredient : ${this.ingredients[i].tag}`);
			// 	}
			// }

			// this._service.findRecipesAdvanced(this.searchTerms, ingredientsConcat, this.maximumTime)
			this._service.findRecipes(this.searchTerms)
				.then(response => {
					this.results = response.slice(0, 8) as Array<QuickRecipeSearchResult>;
					$("html, body").animate({ scrollTop: searchContainer.offsetTop + searchContainer.offsetHeight }, 500);
				});
		} else {
			this.results = undefined;
		}
	}

	loadRecipe(id: string): void {
		this._router.navigateToRoute("quick-recipe", { "id": id }, undefined);
	}
}

interface SearchIngredient {
	tag: string;
}
