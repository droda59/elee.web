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
		this.settings = settings;
	}
	
	isVolumeMeasureUnitActive(measureUnit: string) {
		return this.settings.volumeMeasureUnits.indexOf(measureUnit) > -1;
	}
	
	isWeightMeasureUnitActive(measureUnit: string) {
		return this.settings.weightMeasureUnits.indexOf(measureUnit) > -1;
	}
}
