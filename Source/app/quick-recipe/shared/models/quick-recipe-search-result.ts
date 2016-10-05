import {Duration, DurationDto} from "app/quick-recipe/shared/models/quick-recipe";
import {Ingredient, IngredientDto} from "app/shared/models/ingredient";

export class QuickRecipeSearchResult implements QuickRecipeSearchResultDto {
    _id: string;
    id: string;
    title: string;
    smallImageUrl: string;
    durations: Duration[];
    ingredients: Ingredient[];

    constructor(dto: QuickRecipeSearchResultDto) {
        (<any>Object).assign(this, dto);

        this.id = dto._id;
        this.durations = dto.durations.map(durationDto => new Duration(durationDto));
        this.ingredients = dto.ingredients.map(ingredientDto => new Ingredient(ingredientDto));
    }
}
interface QuickRecipeSearchResultDto {
    _id: string;
    title: string;
    smallImageUrl: string;
    durations: DurationDto[];
    ingredients: IngredientDto[];
}
