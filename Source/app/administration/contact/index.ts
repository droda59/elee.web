import { autoinject } from "aurelia-framework";
import { AdminContactService } from "app/administration/contact/admin-contact-service";
import { ContactForm } from "app/website/contact/models/contact-form";

@autoinject()
export class AdminContactPage {
    forms: Array<ContactForm> = [];

    private _contactService: AdminContactService

    constructor(contactService: AdminContactService) {
        this._contactService = contactService;
    }

    activate(): Promise<Array<ContactForm>> {
        return this._contactService.get()
            .then(response => {
                this.forms = response
                    .map(form => new ContactForm(form));
            });
    }
}
