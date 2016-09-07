import {customAttribute, inject} from "aurelia-framework";

@customAttribute("autowidth")
@inject(Element)
export class AutoWidthInput {
    private _keypressCallback: (e: KeyboardEvent) => void;
    private _element: Element;

    constructor(element: Element) {
        this._element = element;
        this._keypressCallback = this._keypressInput;
    }

    attached() {
        this._element.addEventListener("keyup", this._keypressCallback);
        this._element.style.width = this._keypressCallback.call(this._element);
    }

    detached() {
        this._element.removeEventListener("keyup", this._keypressCallback);
    }

    private _keypressInput(e) {
        e.target.style.width = ((e.target.value.length + 1) * 9) + "px";
    }
}
