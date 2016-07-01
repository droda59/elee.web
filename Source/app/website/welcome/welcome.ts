import {Router} from "aurelia-router";
import {autoinject} from "aurelia-framework";
import {I18N, BaseI18N} from "aurelia-i18n";
import {HttpClient} from "aurelia-http-client";
import {EventAggregator} from "aurelia-event-aggregator";

@autoinject
export class Welcome extends BaseI18N {
	private _router: Router;
	private _element: Element;
	private _httpClient: HttpClient;

	selectedRecipeId: string = undefined;
	recipeGroups: {}[] = [];
	popularCategories: {}[] = [];

	constructor(httpClient: HttpClient, router: Router, i18n: I18N, element: Element, ea: EventAggregator) {
        super(i18n, element, ea);

		this._httpClient = httpClient;
		this._router = router;
		this._element = element;
	}

	activate(route, routeConfig) {
		this._httpClient.createRequest(null)
			.withUrl("http://eleeapi.azurewebsites.net/api/quickrecipesearch?query=")
			.withHeader("Accept", "application/json")
			.asGet()
			.send()
			.then(data => {
				this.recipeGroups.push({ label: "Collations", recipes: data.content.filter(recipe =>
					recipe["_id"] == "56ae7adb44fd4675fc7ed181"
					|| recipe["_id"] == "56ae7aa744fd4675fc7ed180"
					|| recipe["_id"] == "56b822f544fd461dcd8437dc") });

				this.recipeGroups.push({ label: "Desserts", recipes: data.content.filter(recipe =>
					recipe["_id"] == "56a6c32144fd4666d1194b77"
					|| recipe["_id"] == "56a6c11444fd4666d1194b73"
					|| recipe["_id"] == "56c128c644fd463ab8e3e2ff"
					|| recipe["_id"] == "57099aad44fd46200ef99030"
					|| recipe["_id"] == "56b826f544fd461dcd8437dd"
					|| recipe["_id"] == "56a6c13744fd4666d1194b74"
					|| recipe["_id"] == "56ab7acf44fd466ff20f9f97"
					|| recipe["_id"] == "56a6c36644fd4666d1194b78") });

				this.recipeGroups.push({ label: "Mijoteuse", recipes: data.content.filter(recipe =>
					recipe["_id"] == "56ae7a2a44fd4675fc7ed17e"
					|| recipe["_id"] == "56ae79da44fd4675fc7ed17d"
					|| recipe["_id"] == "56aee92244fd467fb1b8b6d6"
					|| recipe["_id"] == "56ae7a6844fd4675fc7ed17f") });

				this.recipeGroups.push({ label: "Repas", recipes: data.content.filter(recipe =>
					recipe["_id"] == "56ae7a2a44fd4675fc7ed17e"
					|| recipe["_id"] == "56b81f2344fd461dcd8437db"
					|| recipe["_id"] == "56b8174f44fd461dcd8437d9"
					|| recipe["_id"] == "56b81a7344fd461dcd8437da"
					|| recipe["_id"] == "56ae79da44fd4675fc7ed17d"
					|| recipe["_id"] == "56b8280d44fd461dcd8437de"
					|| recipe["_id"] == "56aee92244fd467fb1b8b6d6"
					|| recipe["_id"] == "56ae7a6844fd4675fc7ed17f"
					|| recipe["_id"] == "56c9ee8d44fd464bc2fb95a3"
					|| recipe["_id"] == "56a6c30844fd4666d1194b76"
					|| recipe["_id"] == "56a6c2e644fd4666d1194b75"
					|| recipe["_id"] == "56c9f02944fd464bc2fb95a4"
					|| recipe["_id"] == "56a6c09d44fd4666d1194b72") });
			});
	}

	loadRecipe(): void {
		if (this.canNavigateToRecipe) {
			this._router.navigateToRoute("quick-recipe", { "id": this.selectedRecipeId }, undefined);
		}
	}

	get canNavigateToRecipe(): boolean {
		return !!this.selectedRecipeId;
	}
}
