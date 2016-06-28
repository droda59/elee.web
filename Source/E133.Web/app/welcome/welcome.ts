import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";
import {I18N} from "aurelia-i18n";
import {HttpClient} from "aurelia-http-client";

@inject (HttpClient, Router, I18N, Element)
export class Welcome {
	private _router: Router;
	private _i18n: I18N;
	private _element: Element;
	private _httpClient: HttpClient;

	selectedRecipeId: string;
	recipeGroups: {}[] = [];
	popularCategories: {}[] = [];

	constructor(httpClient: HttpClient, router: Router, i18n: I18N, element: Element) {
		this._httpClient = httpClient;
		this._router = router;
		this._i18n = i18n;
		this._element = element;
	}

	activate(route, routeConfig) {
		Promise.all([
				this._loadRecipe("56ae7adb44fd4675fc7ed181"),
				this._loadRecipe("56ae7aa744fd4675fc7ed180"),
				this._loadRecipe("56b822f544fd461dcd8437dc")
			]).then((values) => this.recipeGroups.push({ label: "Collations", recipes: values.map(x => x.content) }));

		Promise.all([
				this._loadRecipe("56a6c32144fd4666d1194b77"),
				this._loadRecipe("56a6c11444fd4666d1194b73"),
				this._loadRecipe("56c128c644fd463ab8e3e2ff"),
				this._loadRecipe("57099aad44fd46200ef99030"),
				this._loadRecipe("56b826f544fd461dcd8437dd"),
				this._loadRecipe("56a6c13744fd4666d1194b74"),
				this._loadRecipe("56ab7acf44fd466ff20f9f97"),
				this._loadRecipe("56a6c36644fd4666d1194b78")
			]).then((values) => this.recipeGroups.push({ label: "Desserts", recipes: values.map(x => x.content) }));

		Promise.all([
				this._loadRecipe("56ae7a2a44fd4675fc7ed17e"),
				this._loadRecipe("56ae79da44fd4675fc7ed17d"),
				this._loadRecipe("56aee92244fd467fb1b8b6d6"),
				this._loadRecipe("56ae7a6844fd4675fc7ed17f")
			]).then((values) => this.recipeGroups.push({ label: "Mijoteuse", recipes: values.map(x => x.content) }));

		Promise.all([
				this._loadRecipe("56ae7a2a44fd4675fc7ed17e"),
				this._loadRecipe("56b81f2344fd461dcd8437db"),
				this._loadRecipe("56b8174f44fd461dcd8437d9"),
				this._loadRecipe("56b81a7344fd461dcd8437da"),
				this._loadRecipe("56ae79da44fd4675fc7ed17d"),
				this._loadRecipe("56b8280d44fd461dcd8437de"),
				this._loadRecipe("56aee92244fd467fb1b8b6d6"),
				this._loadRecipe("56ae7a6844fd4675fc7ed17f"),
				this._loadRecipe("56c9ee8d44fd464bc2fb95a3"),
				this._loadRecipe("56a6c30844fd4666d1194b76"),
				this._loadRecipe("56a6c2e644fd4666d1194b75"),
				this._loadRecipe("56c9f02944fd464bc2fb95a4"),
				this._loadRecipe("56a6c09d44fd4666d1194b72")
			]).then((values) => this.recipeGroups.push({ label: "Repas", recipes: values.map(x => x.content) }));
	}

	attached() {
		this._i18n.updateTranslations(this._element);
	}

	loadRecipe(): void {
		if (this.canNavigateToRecipe) {
			this._router.navigateToRoute("quick-recipe", { "id": this.selectedRecipeId }, undefined);
		}
	}

	changeLocale(): void {
		var newLocale;
		var currentLocale = this._i18n.getLocale();
		if (currentLocale === "fr") {
			newLocale = "en";
		} else if (currentLocale === "en") {
			newLocale = "fr";
		}

        this._i18n
            .setLocale(newLocale)
            .then(() => {
				this._i18n.updateTranslations(this._element);
        	});
	}

	get canNavigateToRecipe(): boolean {
		return this.selectedRecipeId !== this._i18n.tr("home.search");
	}

	private _loadRecipe(id: string): void {
        var url = "https://api.mlab.com/api/1/databases/e133/collections/quickrecipe/" + id + "?apiKey=tEW3mV3EqhPQo-IVY2je7cL5Zo0ztYQy"

        return this._httpClient.get(url);
	}
}
