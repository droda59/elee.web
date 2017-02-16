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
        // TODO Make a value converter for the sort
        return this._contactService.get()
            .then(response => {
                this.forms = response
                    .map(form => new ContactForm(form))
                    .sort((o1, o2) => o2.date - o1.date);
            });
    }
}
