import {autoinject, bindable} from "aurelia-framework";
import {Step} from "app/quick-recipe/models/quick-recipe";
import {QuickRecipePage} from "app/quick-recipe/follow-recipe/index";
import {QuickRecipeSubrecipe} from "app/quick-recipe/follow-recipe/models/quick-recipe-subrecipe";

@autoinject()
export class RecipeProgression {
    @bindable subrecipes: QuickRecipeSubrecipe[] = [];
    @bindable click;

    private _parentElement: QuickRecipePage;

    constructor(parentElement: QuickRecipePage){
        this._parentElement = parentElement;
    }

    goToSubrecipe(subrecipeId: number): void {
        this._parentElement.goToSubrecipe(subrecipeId);
    }

    goToStep(stepId: number): void {
        this.click({stepId: stepId});
    }

    get activeSubrecipeId(): number {
        return this._parentElement.activeSubrecipeId;
    }

    get currentStep(): Step {
        return this._parentElement.currentStep;
    }
}
