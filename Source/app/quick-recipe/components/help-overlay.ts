import {inject} from "aurelia-framework";
import {DialogController} from "aurelia-dialog";
// import * as $ from "jquery";

@inject (DialogController)
export class HelpOverlay {
	controller: DialogController;

	constructor(controller: DialogController) {
		this.controller = controller;
	}

	previous(): void {
		$(".slider").slider("prev");
	}

	next(): void {
		$(".slider").slider("next");
	}
}
