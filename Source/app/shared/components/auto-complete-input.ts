import {bindable} from "aurelia-framework";
import {inject} from "aurelia-dependency-injection";
import {customAttribute} from "aurelia-templating";
import {BindingEngine} from "aurelia-binding";

@inject(Element, BindingEngine)
@customAttribute("auto-complete")
export class AutoCompleteInput {
    @bindable callback: (value: string|undefined) => void;
    @bindable minLength: number = 3;
    @bindable value: string = "";

    private _element: Element;

    constructor(element: Element, bindingEngine: BindingEngine) {
        this._element = element;

        if (this._element.tagName.toLowerCase() === "md-input") {
            this._element = this._element.querySelector(".input-field");
            bindingEngine.propertyObserver(this._element.parentElement.au["md-input"].viewModel, "mdValue")
                .subscribe(this.valueChanged.bind(this));
        } else {
            bindingEngine.propertyObserver(this._element, "value").subscribe(this.valueChanged.bind(this));
        }
    }

    attached() {
        if (this._element.tagName.toLowerCase() === "input") {
            this.value = this._element.value;
        }
    }

    valueChanged(newValue: string) {
        this.value = newValue;

        if (this.callback && this.value) {
            if (this.value.length >= this.minLength) {
                this.callback({ value: this.value });
            } else {
                this.callback({ value: undefined });
            }
        }
    }
}
