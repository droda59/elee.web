import { autoinject, customElement, bindable } from "aurelia-framework";
import { QuickRecipeSearchResult } from "app/quick-recipe/models/quick-recipe-search-result";

@customElement("recipe-preview")
@autoinject
export class RecipePreview {
	@bindable public recipe: QuickRecipeSearchResult;

	constructor(private _element: Element) {

	}

	public openPreview(result: QuickRecipeSearchResult): void {
		this.recipe = result;
		this._element.querySelector("#recipe-preview").classList.add("open");
	}

	public closePreview(): void {
		this._element.querySelector("#recipe-preview").classList.remove("open");
	}
}
