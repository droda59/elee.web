import { autoinject } from "aurelia-framework";
import { ContactService } from "app/quick-recipe/shared/contact-service";
import { ContactForm } from "app/quick-recipe/shared/models/contact-form";

@autoinject()
export class ContactPage {
    email: string;
    name: string;
    message: string;

    constructor(private contactService: ContactService) {
    }

    send() {
        let contactForm: ContactForm = { email: this.email, name: this.name, message: this.message};

        // this._contactService.send(contactForm);
    }
}
