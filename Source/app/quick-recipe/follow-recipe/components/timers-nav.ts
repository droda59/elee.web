import {bindable} from "aurelia-framework";
import {QuickRecipeSubrecipe} from "app/quick-recipe/follow-recipe/models/quick-recipe-subrecipe";

export class TimersNav {
    @bindable subrecipes: QuickRecipeSubrecipe[] = [];
    @bindable click;

    goToStep(stepId: number): void {
        this.click({stepId: stepId});
    }
}
