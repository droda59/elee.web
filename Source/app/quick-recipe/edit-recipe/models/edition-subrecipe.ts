import {Subrecipe, Step} from "app/quick-recipe/shared/models/quick-recipe";
import {Ingredient} from "app/shared/models/ingredient";

export class EditionSubrecipe extends Subrecipe {
    steps: Array<Step> = [];
    ingredients: Array<Ingredient> = [];
}
