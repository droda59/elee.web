import {autoinject} from "aurelia-framework";
import {Quantity} from "app/shared/models/quantity";
import {Ingredient} from "app/shared/models/ingredient";
import {EditRecipePage} from "app/quick-recipe/edit-recipe/index";
import {IngredientPart, EnumerationPart, QuantityOfIngredientPart, TextPart} from "app/quick-recipe/shared/models/quick-recipe";
import {PartFactory} from "app/quick-recipe/shared/part-factory";

@autoinject()
export class StepEnumeration {
    part: EnumerationPart;
    possibleIngredients: Array<Ingredient> = [];

    private _parentElement: EditRecipePage;

    constructor(parentElement: EditRecipePage){
        this._parentElement = parentElement;
    }

    activate(model: EnumerationPart) {
        this.part = model;

        var step = this._parentElement.findStep(this.part.stepId);
        this.possibleIngredients = this._parentElement.ingredients.filter(ingredient => ingredient.subrecipeId < 0 || step.subrecipeId < 0 ? true : ingredient.subrecipeId === step.subrecipeId);
    }

    addIngredient(): void {
        var part = PartFactory.createPart(this.part.stepId, IngredientPart.type);
        part.ingredient = this.possibleIngredients[0];

        this.part.parts.push(part);
    }

    addText(): void {
        var part = PartFactory.createPart(this.part.stepId, TextPart.type);

        this.part.parts.push(part);
    }

    addQuantityOfIngredient(): void {
        var part = PartFactory.createPart(this.part.stepId, QuantityOfIngredientPart.type);
        part.ingredient = this.possibleIngredients[0];
        part.quantity = new Quantity(this.possibleIngredients[0].quantity);

        this.part.parts.push(part);
    }

    removePart(part: Part): void {
        this.part.parts.removeFromArray(part);
    }
}
