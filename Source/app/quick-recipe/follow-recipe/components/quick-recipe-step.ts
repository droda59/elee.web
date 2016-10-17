import {bindable} from "aurelia-framework";
import {Step, IngredientPart, QuantityOfIngredientPart, EnumerationPart} from "app/quick-recipe/shared/models/quick-recipe";

export class QuickRecipeStep {
    @bindable step: Step = null;

    isTechnicalStep: boolean = false;

    stepChanged(): void {
        if (!this.step) {
            return;
        }

        var ingredientParts = this.step.parts.filter(
            part => part.type === IngredientPart.type || part.type === QuantityOfIngredientPart.type || part.type === EnumerationPart.type
        );

        this.isTechnicalStep = ingredientParts.length === 0;
    }
}
