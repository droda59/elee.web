import { validationRenderer, RenderInstruction, ValidateResult } from "aurelia-validation";

@validationRenderer
export class MaterializeFormValidationRenderer {
    render(instruction: RenderInstruction) {
        for (let { result, elements } of instruction.unrender) {
            for (let target of elements) {
                this.remove(target, result);
            }
        }

        for (let { result, elements } of instruction.render) {
            for (let target of elements) {
                this.add(target, result);
            }
        }
    }

    add(target: Element, result: ValidateResult) {
        if (result.valid) {
            return;
        }

        const message = document.createElement("div");
        message.className = "validation-message";
        message.textContent = result.message;
        message.id = `validation-message-${result.id}`;

        target.parentNode.appendChild(message);
        target.classList.add("invalid");
    }

    remove(target: Element, result: ValidateResult) {
        if (result.valid) {
            return;
        }

        const message = target.parentNode.querySelector(`#validation-message-${result.id}`);
        if (message) {
            target.parentNode.removeChild(message);
            target.classList.remove("invalid");
        }
    }
}
