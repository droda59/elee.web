import {autoinject, bindable} from "aurelia-framework";
import {QuickRecipePage} from "app/quick-recipe/follow-recipe/index";
import {QuickRecipeSubrecipe} from "app/quick-recipe/follow-recipe/models/quick-recipe-subrecipe";

@autoinject()
export class RecipeProgression {
    @bindable subrecipes: QuickRecipeSubrecipe[] = [];

    private _parentElement: QuickRecipePage;

    constructor(parentElement: QuickRecipePage){
        this._parentElement = parentElement;
    }

    goToSubrecipe(subrecipeId: number): void {
        this._parentElement.goToSubrecipe(subrecipeId);
    }

    get activeSubrecipeId(): number {
        return this._parentElement.activeSubrecipeId;
    }

    get currentStepId(): number {
        return this._parentElement.currentStep.id;
    }
}
