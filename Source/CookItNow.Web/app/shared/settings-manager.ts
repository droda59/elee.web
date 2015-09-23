import {Settings} from "shared/models/settings";

export class SettingsManager {
	settings: Settings;
	
	constructor() {
		this.settings = new Settings();
	}
	
	activate() {
		// TODO Load settings from localstorage
	}
	
	save() {
		// TODO Save settings into local storage
	}
}
