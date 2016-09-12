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
    static createPart(step: Step, type: string, dto: PartDto): Part {
        switch (type) {
            case IngredientPart.type: return new IngredientPart(step, <IngredientPartDto>dto);
            case TextPart.type: return new TextPart(step, <TextPartDto>dto);
            case ActionPart.type: return new ActionPart(step, <ActionPartDto>dto);
            case TimerPart.type: return new TimerPart(step, <TimerPartDto>dto);
            case IngredientEnumerationPart.type: return new IngredientEnumerationPart(step, <IngredientEnumerationPartDto>dto);
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
            this.parts = dto.parts.map(partDto => PartFactory.createPart(this, partDto.type, partDto));
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
  private _type: string;
  stepId: number;

  constructor(step: Step, dto: PartDto) {
    Object.assign(this, dto);

    this.stepId = step.id;
  }

  get type() {
      return this._type;
  }
  protected set type(value: string) {
      this._type = value;
  }
}
interface PartDto {
  type: string;
}

export class TextPart extends Part implements TextPartDto {
    value: string;

    constructor(step: Step)
    constructor(step: Step, dto: TextPartDto)
    constructor(step: Step, dto?: TextPartDto) {
        super(step, dto);

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

    constructor(step: Step)
    constructor(step: Step, dto: ActionPartDto)
    constructor(step: Step, dto?: ActionPartDto) {
        super(step, dto);

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

    constructor(step: Step)
    constructor(step: Step, dto: TimerPartDto)
    constructor(step: Step, dto?: TimerPartDto) {
        super(step, dto);

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

    constructor(step: Step)
    constructor(step: Step, dto: IngredientPartDto)
    constructor(step: Step, dto?: IngredientPartDto) {
        super(step, dto);

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
    ingredients: Ingredient[];

    constructor(step: Step)
    constructor(step: Step, dto: IngredientEnumerationPartDto)
    constructor(step: Step, dto?: IngredientEnumerationPartDto) {
        super(step, dto);

        this.type = IngredientEnumerationPart.type;

        if (dto) {
            this.ingredients = dto.ingredients.map(ingredient => IngredientUnicityOverseer.getIngredient(ingredient));
        }
    }

    static get type() {
        return "enumeration";
    }
}
interface IngredientEnumerationPartDto extends PartDto {
    ingredients: IngredientDto[];
}
