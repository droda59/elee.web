import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

@inject (HttpClient)
export class CommentsForm {
	comments: string;
	isSent: boolean;
	contactEmail: string;
	
    private _http: HttpClient;
	
	constructor(http: HttpClient) {
		this._http = http.configure(x => {
			x.withHeader("Content-Type", "application/json");
		});
	}
	
	send() {
		var data = {
			email: this.contactEmail, 
			comments: this.comments
		};
		
		this._http
			.post("api/comments", data)
			.then(response => {
            	this.isSent = true;
			});
	}
}
