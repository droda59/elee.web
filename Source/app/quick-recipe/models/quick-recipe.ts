import {Ingredient, IngredientDto} from "app/shared/models/ingredient";
import {Quantity, QuantityDto} from "app/shared/models/quantity";
import {PartFactory} from "app/quick-recipe/part-factory";

export class QuickRecipe implements QuickRecipeDto {
    _id: string;
    id: string;
    language: string;
    title: string;
    uniqueName: string;
    originalUrl: string;
    note: string;
    smallImageUrl: string;
    normalImageUrl: string;
    largeImageUrl: string;
    summary: string;
    originalServings: string;
    durations: Duration[];
    subrecipes: Subrecipe[];
    ingredients: Ingredient[];
    steps: Step[];

    constructor(dto: QuickRecipeDto) {
        (<any>Object).assign(this, dto);

        // Ensure we don't have ingredients leftover when switching recipe.
        IngredientUnicityOverseer.initialize();

        this.id = dto._id;
        this.durations = dto.durations.map(durationDto => new Duration(durationDto));
        this.subrecipes = dto.subrecipes.map(subrecipeDto => new Subrecipe(subrecipeDto));
        this.ingredients = dto.ingredients.map(ingredientDto => IngredientUnicityOverseer.getIngredient(ingredientDto));
        this.steps = dto.steps.map(stepDto => new Step(stepDto));
    }
}
interface QuickRecipeDto {
    _id: string;
    language: string;
    title: string;
    uniqueName: string;
    originalUrl: string;
    note: string;
    smallImageUrl: string;
    normalImageUrl: string;
    largeImageUrl: string;
    summary: string;
    originalServings: string;
    durations: DurationDto[];
    subrecipes: SubrecipeDto[];
    ingredients: IngredientDto[];
    steps: StepDto[];
}

export class Duration implements DurationDto {
    title: string;
    time: string;

    constructor(dto: DurationDto) {
        (<any>Object).assign(this, dto);
    }
}
export interface DurationDto {
    title: string;
    time: string;
}

export class Subrecipe implements SubrecipeDto {
    id: number;
    title: string;

    constructor();
    constructor(dto: SubrecipeDto);
    constructor(dto?: SubrecipeDto) {
        (<any>Object).assign(this, dto);
    }
}
interface SubrecipeDto {
    id: number;
    title: string;
}

export class Step implements StepDto {
    id: number;
    subrecipeId: number;
    parts: Part[] = [];
    isCompleted: boolean;
    isOnHold: boolean;

    constructor();
    constructor(dto: StepDto);
    constructor(dto?: StepDto) {
        (<any>Object).assign(this, dto);

        if (dto) {
            this.parts = dto.parts.map(partDto => PartFactory.createPart(this.id, partDto.type, partDto));
        }

        this.isCompleted = false;
        this.isOnHold = false;
    }
}
interface StepDto {
    id: number;
    subrecipeId: number;
    parts: PartDto[];
}

export class Part implements PartDto {
    type: string;
    stepId: number;

    constructor(stepId: number, dto: PartDto) {
        (<any>Object).assign(this, dto);

        this.stepId = stepId;
    }
}
export interface PartDto {
    type: string;
}

export class TextPart extends Part implements TextPartDto {
    value: string;

    constructor(stepId: number)
    constructor(stepId: number, dto: TextPartDto)
    constructor(stepId: number, dto?: TextPartDto) {
        super(stepId, dto);

        this.type = TextPart.type;
    }

    static get type() {
        return "text";
    }
}
export interface TextPartDto extends PartDto {
    value: string;
}

export class ActionPart extends Part implements ActionPartDto {
    value: string;

    constructor(stepId: number)
    constructor(stepId: number, dto: ActionPartDto)
    constructor(stepId: number, dto?: ActionPartDto) {
        super(stepId, dto);

        this.type = ActionPart.type;
    }

    static get type() {
        return "action";
    }
}
export interface ActionPartDto extends PartDto {
    value: string;
}

export class TimerPart extends Part implements TimerPartDto {
    value: string;
    action: string;
    text: string;

    constructor(stepId: number)
    constructor(stepId: number, dto: TimerPartDto)
    constructor(stepId: number, dto?: TimerPartDto) {
        super(stepId, dto);

        this.type = TimerPart.type;
    }

    static get type() {
        return "timer";
    }
}
export interface TimerPartDto extends PartDto {
    value: string;
    action: string;
    text: string;
}

export class IngredientPart extends Part implements IngredientPartDto {
    ingredient: Ingredient;

    constructor(stepId: number)
    constructor(stepId: number, dto: IngredientPartDto)
    constructor(stepId: number, dto?: IngredientPartDto) {
        super(stepId, dto);

        this.type = IngredientPart.type;

        if (dto) {
            this.ingredient = IngredientUnicityOverseer.getIngredient(dto.ingredient);
        }
    }

    static get type() {
        return "ingredient";
    }
}
export interface IngredientPartDto extends PartDto {
    ingredient: IngredientDto;
}

export class QuantityOfIngredientPart extends Part implements QuantityOfIngredientPartDto {
    quantity: Quantity;
    ingredient: Ingredient;

    constructor(stepId: number)
    constructor(stepId: number, dto: QuantityOfIngredientPartDto)
    constructor(stepId: number, dto?: QuantityOfIngredientPartDto) {
        super(stepId, dto);

        this.type = QuantityOfIngredientPart.type;

        if (dto) {
            this.quantity = new Quantity(dto.quantity);
            this.ingredient = IngredientUnicityOverseer.getIngredient(dto.ingredient);
        }
    }

    static get type() {
        return "quantity";
    }
}
export interface QuantityOfIngredientPartDto extends PartDto {
    quantity: QuantityDto;
    ingredient: IngredientDto;
}

export class EnumerationPart extends Part implements EnumerationPartDto {
    parts: Part[];

    constructor(stepId: number)
    constructor(stepId: number, dto: EnumerationPartDto)
    constructor(stepId: number, dto?: EnumerationPartDto) {
        super(stepId, dto);

        this.type = EnumerationPart.type;

        if (dto) {
            this.parts = dto.parts.map(part => PartFactory.createPart(stepId, part.type, part));
        }
    }

    static get type() {
        return "enumeration";
    }
}
export interface EnumerationPartDto extends PartDto {
    parts: PartDto[];
}

class IngredientUnicityOverseer {
    private static ingredients: { [id: number]: Ingredient; } = {};

    static getIngredient(dto: IngredientDto): Ingredient {
        if (!this.ingredients[dto.id]) {
            this.ingredients[dto.id] = new Ingredient(dto);
        }

        return this.ingredients[dto.id];
    }

    static initialize(): void {
        this.ingredients = {};
    }
}
