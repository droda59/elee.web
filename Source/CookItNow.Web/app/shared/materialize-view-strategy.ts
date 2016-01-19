import {ValidationViewStrategy} from "aurelia-validation";

export class MaterializeViewStrategyBase extends ValidationViewStrategy {
    updateUi (validationProperty, element) {
        const label = element.parentNode.querySelector("label");
        if (label) {
            label.dataset.success = "√";
        }

        if (validationProperty) {
            if (!validationProperty.isDirty) {
                return;
            }
            if (validationProperty.isValid) {
                element.classList.remove("invalid");
                element.classList.add("valid");
            } else {
                element.classList.remove("valid");
                element.classList.add("invalid");

                if (label) {
                    label.dataset.error = validationProperty.message;
                }
            }
        }
    }

    prepareElement(validationProperty, element) {
        this.updateUi(null, element);
    }

    updateElement(validationProperty, element) {
        this.updateUi(validationProperty, element);
    }
}

export const MaterializeViewStrategy = new MaterializeViewStrategyBase();
