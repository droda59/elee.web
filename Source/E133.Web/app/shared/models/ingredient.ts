import {Quantity, QuantityDto} from "shared/models/quantity";

export class Ingredient implements IngredientDto {
    id: number;
    subrecipeId: number;
    name: string;
    quantity: Quantity;
    requirements: string;
    replacements: Ingredient[];
    state: string;

    constructor();
    constructor(dto: IngredientDto);
    constructor(dto?: IngredientDto) {
        Object.assign(this, dto);

        if (dto) {
            this.quantity = new Quantity(dto.quantity);
            this.replacements = (dto.replacements || []).map(replacementDto => new Ingredient(replacementDto));
        }

        this.state = "";
    }
}
export interface IngredientDto {
    id: number;
    subrecipeId: number;
    name: string;
    quantity: QuantityDto;
    requirements: string;
    replacements: IngredientDto[];
}
