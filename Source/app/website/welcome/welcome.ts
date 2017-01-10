import { Router } from "aurelia-router";
import { autoinject } from "aurelia-framework";
import { QuickRecipeService } from "app/quick-recipe/quick-recipe-service";
import { QuickRecipeSearchResult } from "app/quick-recipe/models/quick-recipe-search-result";

@autoinject()
export class Welcome {
	private _skip: number = 0;
	private _take: number = 10;

	router: Router;
	results: Array<QuickRecipeSearchResult> = undefined;
	otherRecipes: Array<QuickRecipeSearchResult> = [];
	featuredRecipes: Array<QuickRecipeSearchResult> = [];
	searchTerms: string;
	maximumTime: number = 0;

	constructor(private _service: QuickRecipeService, router: Router) {
		this.router = router;
	}

	activate(): Promise<Array<QuickRecipeSearchResult>> {
		var featuredPromises = [];
		// Recettes Noel
		// featuredPromises.push(this._service.getRecipe("ricardocuisine-parfaite-pate-brisee"));
		// featuredPromises.push(this._service.getRecipe("ricardocuisine-sucre-creme-(le-meilleur)"));
		// featuredPromises.push(this._service.getRecipe("ricardocuisine-dinde-farcie-porc-aux-champignons"));

		// Recettes santé
		featuredPromises.push(this._service.getRecipe("ricardocuisine-soupe-lorge-aux-legumineuses"));
		featuredPromises.push(this._service.getRecipe("ricardocuisine-pain-aux-bananes-son"));
		featuredPromises.push(this._service.getRecipe("ricardocuisine-pates-aux-legumes-aux-crevettes"));

		// Recettes hiver
		// featuredPromises.push(this._service.getRecipe("ricardocuisine-chili-con-carne"));
		// featuredPromises.push(this._service.getRecipe("ricardocuisine-chocolat-chaud-orange-cannelle"));
		// featuredPromises.push(this._service.getRecipe("ricardocuisine-soupe-loignon-(la-meilleure)"));

		Promise.all(featuredPromises).then(values => {
			this.featuredRecipes = values.map(x => new QuickRecipeSearchResult(x));
		});
	}

	searchRecipes(): void {
		if (this.searchTerms && this.searchTerms.length >= 3) {
			let searchContainer = $("#search-container")[0];

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

	getPagedRecipes(): void {
		this._service.getPaged(this._skip, this._take)
			.then(response => {
				this.otherRecipes = this.otherRecipes.contat(response);
				this._skip += 10;
			});
	}

	goToFeatured(uniqueName: string): void {
		ga('send', 'event', 'Recipe', 'click', 'vedette');
		this.loadRecipe(uniqueName);
	}

	loadRecipe(uniqueName: string): void {
		this.router.navigateToRoute("quick-recipe", { "uniqueName": uniqueName }, undefined);
	}

	getCurrentPageName(): string {
		return this.router.currentInstruction.config.name;
	}
}
