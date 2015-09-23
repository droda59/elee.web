import {inject} from "aurelia-framework";
import {DialogController} from "aurelia-dialog";
import {Settings} from "shared/models/settings";

@inject (DialogController)
export class SettingsModal {
	settings: Settings;
	controller: DialogController;
	
	constructor(controller: DialogController) {
		this.controller = controller;
	}
	
	activate(settings: Settings) {
		this.settings = new Settings();
		
		this.settings.volumeMeasureUnits = settings.volumeMeasureUnits;
		this.settings.weightMeasureUnits = settings.weightMeasureUnits;
	}
}
