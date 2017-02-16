import {autoinject} from "aurelia-framework";
import {IngredientPart} from "app/quick-recipe/models/quick-recipe";
import {Ingredient} from "app/shared/models/ingredient";
import {EditRecipePage} from "app/administration/edit-recipe/index";
import {QuantityHumanFormatValueConverter} from "app/resources/value-converters/quantity-human-format";

@autoinject()
export class StepIngredient {
    part: IngredientPart;
    possibleIngredients: Array<Ingredient> = [];

    private _parentElement: EditRecipePage;
    private _converter: QuantityHumanFormatValueConverter;

    constructor(parentElement: EditRecipePage, converter: QuantityHumanFormatValueConverter){
        this._parentElement = parentElement;
        this._converter = converter;
    }

    activate(model: IngredientPart) {
        this.part = model;

        var step = this._parentElement.findStep(this.part.stepId);
        this.possibleIngredients = this._parentElement.ingredients.filter(ingredient => ingredient.subrecipeId < 0 || step.subrecipeId < 0 ? true : ingredient.subrecipeId === step.subrecipeId);
    }

    getDisplayName(ingredient: Ingredient) {
        // TODO Check if we can use this in view
        return `${this._converter.toView(ingredient.quantity)} ${ingredient.name}`;
    }
}
