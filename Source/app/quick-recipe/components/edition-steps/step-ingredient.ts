import {IngredientPart} from "app/quick-recipe/models/quick-recipe";
import {Ingredient} from "app/shared/models/ingredient";

export class StepIngredient {
    ingredient: Ingredient;
    possibleIngredients: Ingredient[] = [];

    activate(model: IngredientPart) {
        this.ingredient = model.ingredient;
        this.possibleIngredients.push(this.ingredient);
    }
}
