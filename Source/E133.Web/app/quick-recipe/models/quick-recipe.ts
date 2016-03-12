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

    constructor(quickRecipe: QuickRecipeDto) {
        this.id = quickRecipe.id;
        this.language = quickRecipe.language;
        this.title = quickRecipe.title;
        this.originalUrl = quickRecipe.originalUrl;
        this.note = quickRecipe.note;
        this.imageUrl = quickRecipe.imageUrl;
        this.summary = quickRecipe.summary;
        this.originalServings = quickRecipe.originalServings;
        this.durations = quickRecipe.durations.map(dto => new Duration(dto));
        this.subrecipes = quickRecipe.subrecipes.map(dto => new SubRecipe(dto));
        this.ingredients = quickRecipe.ingredients.map(dto => IngredientUnicityOverseer.getIngredient(dto));
        this.steps = quickRecipe.steps.map(dto => new Step(dto));
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

    constructor(duration: DurationDto) {
        this.title = duration.title;
        this.time = duration.time;
    }
}
interface DurationDto {
    title: string;
    time: string;
}

export class SubRecipe implements SubRecipeDto {
    id: number;
    title: string;

    constructor(subrecipe: SubRecipeDto) {
        this.id = subrecipe.id;
        this.title = subrecipe.title;
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

    constructor(step: StepDto) {
        this.id = step.id;
        this.subrecipeId = step.subrecipeId;
        this.parts = step.parts.map(dto => PartFactory.createPart(dto));
        this.isCompleted = false;

        if (step.postStep != undefined) {
            this.postStep = new Step(step.postStep);
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

    constructor(part: PartDto) {
        this.type = part.type;
    }
}
interface PartDto {
    type: string;
}

export class IngredientPart extends Part implements IngredientPartDto {
    ingredient: Ingredient;

    constructor(part: IngredientPartDto) {
        super(part);

        this.ingredient = IngredientUnicityOverseer.getIngredient(part.ingredient);
    }
}
interface IngredientPartDto extends PartDto {
    ingredient: IngredientDto;
}

export class TextPart extends Part implements TextPartDto {
    value: string;

    constructor(part: TextPartDto) {
        super(part);

        this.value = part.value;
    }
}
interface TextPartDto extends PartDto {
    value: string;
}

export class ActionPart extends Part implements ActionPartDto {
    value: string;

    constructor(part: ActionPartDto) {
        super(part);

        this.value = part.value;
    }
}
interface ActionPartDto extends PartDto {
    value: string;
}

export class TimerPart extends Part implements TimerPartDto {
    value: string;
    action: string;
    text: string;

    constructor(part: TimerPartDto) {
        super(part);

        this.value = part.value;
        this.action = part.action;
        this.text = part.text;
    }
}
interface TimerPartDto extends PartDto {
    value: string;
    action: string;
    text: string;
}

export class IngredientEnumerationPart extends Part implements IngredientEnumerationPartDto {
    ingredients: Ingredient[];

    constructor(part: IngredientEnumerationPartDto) {
        super(part);

        this.ingredients = part.ingredients.map(dto => IngredientUnicityOverseer.getIngredient(dto));
    }
}
interface IngredientEnumerationPartDto extends PartDto {
    ingredients: IngredientDto[];
}
