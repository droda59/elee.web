import {ActionPart} from "app/quick-recipe/models/quick-recipe";

export class StepAction {
  action: string;

  activate(model: ActionPart) {
    this.action = model.value;
  }
}
