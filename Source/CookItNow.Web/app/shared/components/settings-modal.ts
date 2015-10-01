import {inject} from "aurelia-framework";
import {DialogController} from "aurelia-dialog";
import {Settings} from "shared/models/settings";

@inject (DialogController)
export class SettingsModal {
	settings: Settings;
	controller: DialogController;
	
    volumeOptions: string[] = [ "metric", "imperial" ];
    weightOptions: string[] = [ "metric", "imperial" ];
    metricVolumeOptions: string[] = [ "metricOnly", "imperialWhenPossible", "showBoth" ];
	
	constructor(controller: DialogController) {
		this.controller = controller;
	}
	
	activate(settings: Settings) {
		this.settings = new Settings();
		
		this.settings.selectedVolumeOption = settings.selectedVolumeOption;
		this.settings.selectedWeightOption = settings.selectedWeightOption;
		this.settings.metricVolumeOption = settings.metricVolumeOption;
		this.settings.useMetricAdditionalUnits = settings.useMetricAdditionalUnits;
	}
}
