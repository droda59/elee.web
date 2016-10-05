import {IngredientPart} from "app/quick-recipe/shared/models/quick-recipe";
import {Ingredient} from "app/shared/models/ingredient";

export class StepIngredient {
  ingredient: Ingredient;

  activate(model: IngredientPart) {
    this.ingredient = model.ingredient;
  }
}
