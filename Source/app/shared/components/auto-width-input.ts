import {bindable, customAttribute, inject} from "aurelia-framework";

@customAttribute("autowidth")
@inject(Element)
export class AutoWidthInput {
    @bindable() calculateWidth = "";

    private _element: Element;

    constructor(element: Element) {
        this._element = element;
    }

    calculateWidthChanged(newValue) {
        var width = (((newValue || "").length + 1) * 9) + "px";
        this._element.style.width = width;
    }
}
