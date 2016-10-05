import {IngredientPart, IngredientEnumerationPart} from "app/quick-recipe/shared/models/quick-recipe";

export class StepEnumeration {
  ingredients: IngredientPart[];

  activate(model: IngredientEnumerationPart) {
    this.ingredients = model.ingredients;
  }
}
