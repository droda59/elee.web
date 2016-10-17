import {autoinject} from "aurelia-framework";
import {Ingredient} from "app/shared/models/ingredient";
import {EditRecipePage} from "app/quick-recipe/edit-recipe/index";
import {IngredientPart, EnumerationPart, QuantityOfIngredientPart, TextPart} from "app/quick-recipe/shared/models/quick-recipe";
import {PartFactory} from "app/quick-recipe/shared/part-factory";

@autoinject()
export class StepEnumeration {
    part: EnumerationPart;
    possibleIngredients: Array<Ingredient> = [];
    parentelement: EditRecipePage;

    constructor(parentelement: EditRecipePage){
        this.parentelement = parentelement;
    }

    activate(model: EnumerationPart) {
        this.part = model;

        var step = this.parentelement.findStep(this.part.stepId);
        this.possibleIngredients = this.parentelement.ingredients.filter(ingredient => step.subrecipeId < 0 ? true : ingredient.subrecipeId === step.subrecipeId);
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
        part.quantity = this.possibleIngredients[0].quantity;

        this.part.parts.push(part);
    }

    removePart(part: Part): void {
        this.part.parts.removeFromArray(part);
    }
}
