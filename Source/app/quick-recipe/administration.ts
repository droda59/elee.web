import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {I18N} from "aurelia-i18n";
import {QuickRecipeService} from "app/shared/quick-recipe-service";
import {QuickRecipe, QuickRecipeSearchResult} from "app/quick-recipe/models/quick-recipe";

@autoinject()
export class Administration {
    recipes: Array<QuickRecipeSearchResult> = [];

    private _service: QuickRecipeService;
    private _i18n: I18N;
    private _router: Router;

    constructor(service: QuickRecipeService, i18n: I18N, router: Router) {
        this._service = service;
        this._i18n = i18n;
		this._router = router;
    }

    activate(route, routeConfig) {
        return this._service.getRecipesToReview()
            .then(response => {
                this.recipes = response.content.map(content => new QuickRecipeSearchResult(content));
            );
    }

    editRecipe(recipeId: string) {
        this._router.navigateToRoute("edit", { "id": recipeId }, undefined);
    }
}
