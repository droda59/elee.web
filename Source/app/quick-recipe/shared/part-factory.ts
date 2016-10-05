import {Part, TextPart, ActionPart, TimerPart, IngredientPart, IngredientEnumerationPart} from "app/quick-recipe/shared/models/quick-recipe";
import {PartDto, TextPartDto, ActionPartDto, TimerPartDto, IngredientPartDto, IngredientEnumerationPartDto} from "app/quick-recipe/shared/models/quick-recipe";

export class PartFactory {
    static createPart(stepId: number, type: string);
    static createPart(stepId: number, type: string, dto: PartDto);
    static createPart(stepId: number, type: string, dto?: PartDto): Part {
        switch (type) {
            case IngredientPart.type: return new IngredientPart(stepId, <IngredientPartDto>dto);
            case TextPart.type: return new TextPart(stepId, <TextPartDto>dto);
            case ActionPart.type: return new ActionPart(stepId, <ActionPartDto>dto);
            case TimerPart.type: return new TimerPart(stepId, <TimerPartDto>dto);
            case IngredientEnumerationPart.type: return new IngredientEnumerationPart(stepId, <IngredientEnumerationPartDto>dto);
        }
    }
}
