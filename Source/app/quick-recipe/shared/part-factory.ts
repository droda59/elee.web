import {Part, TextPart, ActionPart, TimerPart, IngredientPart, QuantityOfIngredientPart, IngredientEnumerationPart} from "app/quick-recipe/shared/models/quick-recipe";
import {PartDto, TextPartDto, ActionPartDto, TimerPartDto, IngredientPartDto, QuantityOfIngredientPartDto, IngredientEnumerationPartDto} from "app/quick-recipe/shared/models/quick-recipe";

export class PartFactory {
    static createPart(stepId: number, type: string);
    static createPart(stepId: number, type: string, dto: PartDto);
    static createPart(stepId: number, type: string, dto?: PartDto): Part {
        switch (type) {
            case IngredientPart.type: return new IngredientPart(stepId, <IngredientPartDto>dto);
            case TextPart.type: return new TextPart(stepId, <TextPartDto>dto);
            case ActionPart.type: return new ActionPart(stepId, <ActionPartDto>dto);
            case TimerPart.type: return new TimerPart(stepId, <TimerPartDto>dto);
            case QuantityOfIngredientPart.type: return new QuantityOfIngredientPart(stepId, <QuantityOfIngredientPartDto>dto);
            case IngredientEnumerationPart.type: return new IngredientEnumerationPart(stepId, <IngredientEnumerationPartDto>dto);
        }
    }
}
