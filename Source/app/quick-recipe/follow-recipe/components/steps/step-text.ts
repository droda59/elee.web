import {TextPart} from "app/quick-recipe/shared/models/quick-recipe";

export class StepText {
  value: string;

  activate(model: TextPart) {
    this.value = model.value;
  }
}
