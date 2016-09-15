import {bindable} from "aurelia-framework";
import {inject} from "aurelia-dependency-injection";
import {customAttribute} from "aurelia-templating";
import {BindingEngine} from "aurelia-binding";

@inject(Element, BindingEngine)
@customAttribute("auto-complete")
export class AutoCompleteInput {
    @bindable callback: (value: string) => void;
    @bindable minLength: number = 3;
    @bindable value: string = "";

    private _element: Element;

    constructor(element: Element, bindingEngine: BindingEngine) {
        this._element = element;

        bindingEngine.propertyObserver(this._element, "value").subscribe(this.valueChanged.bind(this));
    }

    attached() {
        if (this._element.localName === "input") {
            this.value = this._element.value;
        }
    }

    valueChanged(newValue: string) {
        if (this.callback && newValue.length >= this.minLength) {
            this.callback({ value: newValue });
        }
    }
}
