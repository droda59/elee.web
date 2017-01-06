import {autoinject} from "aurelia-framework";
import {QuickRecipeService} from "app/quick-recipe/quick-recipe-service";
import {QuickRecipeSearchResult} from "app/quick-recipe/models/quick-recipe-search-result";

@autoinject()
export class Administration {
    recipesToReview: Array<QuickRecipeSearchResult> = [];
    reviewedRecipes: Array<QuickRecipeSearchResult> = [];

    private _service: QuickRecipeService;

    constructor(service: QuickRecipeService) {
        this._service = service;
    }

    activate(): Promise<void> {
        this._getRecipesToReview();
        this._getReviewedRecipes();
    }

    private _getRecipesToReview(): Promise<void> {
        return this._service.getRecipesToReview()
            .then(response => {
                this.recipesToReview = this._mapRecipes(response);
            });
    }

    private _getReviewedRecipes(): Promise<void> {
        return this._service.getReviewedRecipes()
            .then(response => {
                this.reviewedRecipes = this._mapRecipes(response);
            });
    }

    private _mapRecipes(response: Array<any>): Array<QuickRecipeSearchResult> {
        return response.map(content => new QuickRecipeSearchResult(content));
    }
}
