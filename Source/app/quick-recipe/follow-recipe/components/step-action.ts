import {ActionPart} from "app/quick-recipe/shared/models/quick-recipe";

export class StepAction {
  action: string;

  activate(model: ActionPart) {
    this.action = model.value;
  }
}
