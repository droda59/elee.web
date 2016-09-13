import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {QuickRecipeService} from "app/shared/quick-recipe-service";
import {QuickRecipe, QuickRecipeSearchResult} from "app/quick-recipe/models/quick-recipe";

@autoinject()
export class Administration {
    recipes: Array<QuickRecipeSearchResult> = [];

    private _service: QuickRecipeService;
    private _router: Router;

    constructor(service: QuickRecipeService, router: Router) {
        this._service = service;
		this._router = router;
    }

    activate(route, routeConfig): Promise<void> {
        return this._service.getRecipesToReview()
            .then(response => {
                this.recipes = response.map(content => new QuickRecipeSearchResult(content));
            });
    }

    editRecipe(recipeId: string) {
        this._router.navigateToRoute("edit", { "id": recipeId }, undefined);
    }
}