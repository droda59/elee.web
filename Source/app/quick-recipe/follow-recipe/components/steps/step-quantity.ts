import {QuantityOfIngredientPart} from "app/quick-recipe/shared/models/quick-recipe";
import {Ingredient} from "app/shared/models/ingredient";
import {Quantity} from "app/shared/models/quantity";

export class StepQuantityOfIngredient {
    ingredient: Ingredient;
    quantity: Quantity

    activate(model: QuantityOfIngredientPart) {
        this.ingredient = model.ingredient;
        this.quantity = model.quantity;
    }
}
