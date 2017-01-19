import { bindable } from "aurelia-framework";
import { QuickRecipeSearchResult } from "app/quick-recipe/models/quick-recipe-search-result";

export class RecipeResult {
    @bindable index: number;
    @bindable result: QuickRecipeSearchResult;
    @bindable click;

    goToRecipe() {
        this.click({result: this.result});
    }
}
