import {autoinject} from "aurelia-framework";
import {IngredientPart} from "app/quick-recipe/models/quick-recipe";
import {Ingredient} from "app/shared/models/ingredient";
import {EditRecipePage} from "app/quick-recipe/edit-recipe-page";
import {QuantityHumanFormatValueConverter} from "app/shared/value-converters/quantity-human-format";

@autoinject()
export class StepIngredient {
    part: IngredientPart;
    possibleIngredients: Array<Ingredient> = [];
    parentelement: EditRecipePage;

    private _converter: QuantityHumanFormatValueConverter;

    constructor(parentelement: EditRecipePage, converter: QuantityHumanFormatValueConverter){
        this.parentelement = parentelement;
        this._converter = converter;
    }

    activate(model: IngredientPart) {
        this.part = model;

        var step = this.parentelement.findStep(model.stepId);
        this.possibleIngredients = this.parentelement.ingredients.filter(ingredient => step.subrecipeId < 0 ? true : ingredient.subrecipeId === step.subrecipeId);
    }

    getDisplayName(ingredient: Ingredient) {
        return `${this._converter.toView(ingredient.quantity)} ${ingredient.name}`;
    }
}
