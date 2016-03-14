import {Ingredient, IngredientDto} from "shared/models/ingredient";

class IngredientUnicityOverseer {
    private static ingredients: { [id: number] : Ingredient; } = {};

    static getIngredient(dto: IngredientDto): Ingredient {
        if (!this.ingredients[dto.id]) {
            this.ingredients[dto.id] = new Ingredient(dto);
        }

        return this.ingredients[dto.id];
    }
}

class PartFactory {
    static createPart(dto: PartDto): Part {
        switch(dto.type) {
            case "ingredient": return new IngredientPart(<IngredientPartDto>dto);
            case "text": return new TextPart(<TextPartDto>dto);
            case "action": return new ActionPart(<ActionPartDto>dto);
            case "timer": return new TimerPart(<TimerPartDto>dto);
            case "enumeration": return new IngredientEnumerationPart(<IngredientEnumerationPartDto>dto);
        }
    }
}

export class QuickRecipe implements QuickRecipeDto {
    id: number;
    language: string;
    title: string;
    originalUrl: string;
    note: string;
    imageUrl: string;
    summary: string;
    originalServings: string;
    durations: Duration[];
    subrecipes: SubRecipe[];
    ingredients: Ingredient[];
    steps: Step[];

    constructor(dto: QuickRecipeDto) {
        Object.assign(this, dto);

        this.durations = dto.durations.map(durationDto => new Duration(durationDto));
        this.subrecipes = dto.subrecipes.map(subrecipeDto => new SubRecipe(subrecipeDto));
        this.ingredients = dto.ingredients.map(ingredientDto => IngredientUnicityOverseer.getIngredient(ingredientDto));
        this.steps = dto.steps.map(stepDto => new Step(stepDto));
    }
}
interface QuickRecipeDto {
    id: number;
    language: string;
    title: string;
    originalUrl: string;
    note: string;
    imageUrl: string;
    summary: string;
    originalServings: string;
    durations: DurationDto[];
    subrecipes: SubRecipeDto[];
    ingredients: IngredientDto[];
    steps: StepDto[];
}

export class Duration implements DurationDto {
    title: string;
    time: string;

    constructor(dto: DurationDto) {
        Object.assign(this, dto);
    }
}
interface DurationDto {
    title: string;
    time: string;
}

export class SubRecipe implements SubRecipeDto {
    id: number;
    title: string;

    constructor(dto: SubRecipeDto) {
        Object.assign(this, dto);
    }
}
interface SubRecipeDto {
    id: number;
    title: string;
}

export class Step implements StepDto {
    id: number;
    subrecipeId: number;
    parts: Part[];
    postStep: Step;
    isCompleted: boolean;

    constructor(dto: StepDto) {
        Object.assign(this, dto);

        this.parts = dto.parts.map(partDto => PartFactory.createPart(partDto));
        this.isCompleted = false;

        if (dto.postStep != undefined) {
            this.postStep = new Step(dto.postStep);
        }
    }
}
interface StepDto {
    id: number;
    subrecipeId: number;
    parts: PartDto[];
    postStep: StepDto;
}

export class Part implements PartDto {
    type: string;

    constructor(dto: PartDto) {
        Object.assign(this, dto);
    }
}
interface PartDto {
    type: string;
}

export class IngredientPart extends Part implements IngredientPartDto {
    ingredient: Ingredient;

    constructor(dto: IngredientPartDto) {
        super(dto);

        this.ingredient = IngredientUnicityOverseer.getIngredient(dto.ingredient);
    }
}
interface IngredientPartDto extends PartDto {
    ingredient: IngredientDto;
}

export class TextPart extends Part implements TextPartDto {
    value: string;

    constructor(dto: TextPartDto) {
        super(dto);
    }
}
interface TextPartDto extends PartDto {
    value: string;
}

export class ActionPart extends Part implements ActionPartDto {
    value: string;

    constructor(dto: ActionPartDto) {
        super(dto);
    }
}
interface ActionPartDto extends PartDto {
    value: string;
}

export class TimerPart extends Part implements TimerPartDto {
    value: string;
    action: string;
    text: string;

    constructor(dto: TimerPartDto) {
        super(dto);
    }
}
interface TimerPartDto extends PartDto {
    value: string;
    action: string;
    text: string;
}

export class IngredientEnumerationPart extends Part implements IngredientEnumerationPartDto {
    ingredients: Ingredient[];

    constructor(dto: IngredientEnumerationPartDto) {
        super(dto);

        this.ingredients = dto.ingredients.map(ingredient => IngredientUnicityOverseer.getIngredient(ingredient));
    }
}
interface IngredientEnumerationPartDto extends PartDto {
    ingredients: IngredientDto[];
}
