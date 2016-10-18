import {autoinject, bindable} from "aurelia-framework";
import {QuickRecipePage} from "app/quick-recipe/follow-recipe/index";

@autoinject()
export class RecipeProgression {
    @bindable subrecipes: QuickRecipeSubrecipe[] = [];

    private _parentElement: QuickRecipePage;

    constructor(parentElement: QuickRecipePage){
        this._parentElement = parentElement;
    }

    get activeSubrecipeId(): number {
        return this._parentElement.activeSubrecipeId;
    }
}
