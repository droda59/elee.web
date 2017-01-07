import { inject } from "aurelia-dependency-injection";
import { validationRenderer } from "aurelia-validation";

@validationRenderer
@inject(Element)
export class MaterializeFormValidationRenderer {
    render(instruction) {
        for (let {result, elements} of instruction.unrender) {
            if (result.valid) {
                elements.forEach(target => {
                    if (target.labels.length) {
                        const label = target.labels[0];
                        label.dataset.error = "";
                    }

                    const field = target;
                    field.classList.remove("invalid");
                    field.classList.add("valid");
                });
            }
        }

        for (let {result, elements} of instruction.render) {
            // TODO Create an error div instead of filtering type
            if (!result.valid && result.rule.messageKey !== "required") {
                const message = result.message;
                elements.forEach(target => {
                    if (message && target.labels.length) {
                        const label = target.labels[0];
                        label.dataset.error = message;
                    }

                    const field = target;
                    field.classList.add("invalid");
                    field.classList.remove("valid");
                });
            }
        }
    }
}
