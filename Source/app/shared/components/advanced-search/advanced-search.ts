import {bindable} from "aurelia-framework";

export class AdvancedSearch {
  @bindable time: string|null;
  @bindable ingredients: string[] = [];
}
