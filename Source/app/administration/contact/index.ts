import { autoinject } from "aurelia-framework";
import { ContactService } from "app/shared/contact-service";
import { ContactForm } from "app/website/models/contact-form";

@autoinject()
export class AdminContactPage {
    forms: Array<ContactForm> = [];

    constructor(private _contactService: ContactService) { }

    activate(): Promise<Array<ContactForm>> {
        return this._contactService.get()
            .then(response => {
                this.forms = response
                    .map(form => new ContactForm(form))
                    .sort((o1, o2) => o2.date - o1.date);
            });
    }
}
