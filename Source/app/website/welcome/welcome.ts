import {Router} from "aurelia-router";
import {inject, bindable} from "aurelia-framework";
import {I18N, BaseI18N} from "aurelia-i18n";
import {EventAggregator} from "aurelia-event-aggregator";
import {QuickRecipeService} from "app/quick-recipe/shared/quick-recipe-service";
import {QuickRecipeSearchResult} from "app/quick-recipe/shared/models/quick-recipe-search-result";

@inject(Element, Router, I18N, EventAggregator, QuickRecipeService)
export class Welcome extends BaseI18N {
	private _router: Router;
	private _service: QuickRecipeService;
	private _fullResults: Array<QuickRecipeSearchResult> = [];

	@bindable selectedRecipe: string;
	results: any = undefined;
	ingredients: Array<Object> = [];

	constructor(element: Element, router: Router, i18n: I18N, ea: EventAggregator, service: QuickRecipeService) {
		super(i18n, element, ea);

		this._service = service;
		this._router = router;

		let defaultIngredients = [{ tag: "patate"}, {tag: "oignon"}, { tag: "vin" }];

		this.ingredients.push(...defaultIngredients);
	}

	searchRecipes(value: string): void {
		if (value && value.length >= 3) {
			this._service.findRecipes(value)
				.then(response => {
					this._fullResults = response.slice(0, 8);
					this.results = this._toObject(this._fullResults, x => x.title, x => x.smallImageUrl);
				});
		} else {
			this.results = undefined;
			this._fullResults = [];
		}
	}

	loadRecipe(id: string): void {
		this._router.navigateToRoute("quick-recipe", { "id": id }, undefined);
	}

	selectedRecipeChanged(newValue: string) {
		if (this._fullResults.length) {
			var selected = this._fullResults.filter(x => x.title === newValue)[0];
			if (selected) {
				this.loadRecipe(selected.id);
			}
		}
	}

	private _toObject(arr, titleCallback, sourceCallback) {
		var rv = {};
		arr.forEach(x =>
			rv[titleCallback(x)] = sourceCallback(x)
		);

		return rv;
	}
}
