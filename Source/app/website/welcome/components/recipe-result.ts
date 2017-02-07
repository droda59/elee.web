import { bindable, autoinject } from "aurelia-framework";
import { QuickRecipeSearchResult } from "app/quick-recipe/models/quick-recipe-search-result";
import { RecipePreview } from "./recipe-preview/recipe-preview";

@autoinject
export class RecipeResult {
	@bindable public index: number;
	@bindable public result: QuickRecipeSearchResult;
	@bindable public click;

	constructor(private _preview: RecipePreview) {

	}

	public goToRecipe() {
		this.click({ result: this.result });
	}

	public openPreview() {
		this._preview.openPreview(this.result);
	}
}
