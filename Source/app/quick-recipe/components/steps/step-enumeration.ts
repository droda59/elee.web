import {Part, EnumerationPart} from "app/quick-recipe/models/quick-recipe";

export class StepEnumeration {
  parts: Part[];

  activate(model: EnumerationPart) {
    this.parts = model.parts;
  }
}
