import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { ContactForm } from "app/website/contact/models/contact-form";
import "fetch";

@inject("admin-api-service")
export class AdminContactService {
	private _httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this._httpClient = httpClient;
	}

	get(): Promise<Array<ContactForm>> {
		return this._httpClient.fetch("api/contactform", {
			method: "get"
		}).then(response => response.json());
	}
}
