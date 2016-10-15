import {autoinject} from "aurelia-framework";
import {MeasureUnitProvider} from "app/shared/measure-unit-provider";
import {Ingredient} from "app/shared/models/ingredient";
import {Quantity} from "app/shared/models/quantity";
import {QuantityHumanFormatValueConverter} from "app/shared/value-converters/quantity-human-format";
import {QuantityOfIngredientPart} from "app/quick-recipe/shared/models/quick-recipe";
import {EditRecipePage} from "app/quick-recipe/edit-recipe/index";

@autoinject()
export class StepQuantityOfIngredient {
    part: QuantityOfIngredientPart;
    possibleIngredients: Array<Ingredient> = [];
    measureUnits: Array<MeasureUnit> = [];
    parentelement: EditRecipePage;

    private _converter: QuantityHumanFormatValueConverter;

    constructor(parentelement: EditRecipePage, converter: QuantityHumanFormatValueConverter, measureUnitProvider: MeasureUnitProvider){
        this._converter = converter;
        this.parentelement = parentelement;
        this.measureUnits = measureUnitProvider.measureUnits;
    }

    activate(model: QuantityOfIngredientPart) {
        this.part = model;

        var step = this.parentelement.findStep(this.part.stepId);
        this.possibleIngredients = this.parentelement.ingredients.filter(ingredient => step.subrecipeId < 0 ? true : ingredient.subrecipeId === step.subrecipeId);
    }

    getDisplayName(ingredient: Ingredient) {
        return `${this._converter.toView(ingredient.quantity)} ${ingredient.name}`;
    }
}
