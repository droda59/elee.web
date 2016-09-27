import {Ingredient, IngredientDto} from "app/shared/models/ingredient";

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

export class PartFactory {
    static createPart(stepId: number, type: string, dto: PartDto): Part {
        switch (type) {
            case IngredientPart.type: return new IngredientPart(stepId, <IngredientPartDto>dto);
            case TextPart.type: return new TextPart(stepId, <TextPartDto>dto);
            case ActionPart.type: return new ActionPart(stepId, <ActionPartDto>dto);
            case TimerPart.type: return new TimerPart(stepId, <TimerPartDto>dto);
            case IngredientEnumerationPart.type: return new IngredientEnumerationPart(stepId, <IngredientEnumerationPartDto>dto);
        }
    }
}

export class QuickRecipe implements QuickRecipeDto {
    id: string;
    language: string;
    title: string;
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
        Object.assign(this, dto);

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

export class QuickRecipeSearchResult implements QuickRecipeSearchResultDto {
    id: string;
    title: string;
    smallImageUrl: string;
    durations: Duration[];
    ingredients: Ingredient[];

    constructor(dto: QuickRecipeSearchResultDto) {
        Object.assign(this, dto);

        // Ensure we don't have ingredients leftover when switching recipe.
        IngredientUnicityOverseer.initialize();

        this.id = dto._id;
        this.durations = dto.durations.map(durationDto => new Duration(durationDto));
        this.ingredients = dto.ingredients.map(ingredientDto => IngredientUnicityOverseer.getIngredient(ingredientDto));
    }
}
interface QuickRecipeSearchResultDto {
    _id: string;
    title: string;
    smallImageUrl: string;
    durations: DurationDto[];
    ingredients: IngredientDto[];
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

export class Subrecipe implements SubrecipeDto {
  id: number;
  title: string;

  constructor(dto: SubrecipeDto) {
    Object.assign(this, dto);
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
        Object.assign(this, dto);

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
    Object.assign(this, dto);

    this.stepId = stepId;
  }
}
interface PartDto {
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
interface TextPartDto extends PartDto {
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
interface ActionPartDto extends PartDto {
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
interface TimerPartDto extends PartDto {
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
interface IngredientPartDto extends PartDto {
    ingredient: IngredientDto;
}

export class IngredientEnumerationPart extends Part implements IngredientEnumerationPartDto {
    ingredients: IngredientPart[];

    constructor(stepId: number)
    constructor(stepId: number, dto: IngredientEnumerationPartDto)
    constructor(stepId: number, dto?: IngredientEnumerationPartDto) {
        super(stepId, dto);

        this.type = IngredientEnumerationPart.type;

        if (dto) {
            this.ingredients = dto.ingredients.map(ingredient => {
                var part = PartFactory.createPart(stepId, IngredientPart.type);
                part.ingredient = ingredient;

                return new IngredientPart(stepId, part);
            });
        }
    }

    static get type() {
        return "enumeration";
    }
}
interface IngredientEnumerationPartDto extends PartDto {
    ingredients: IngredientDto[];
}
