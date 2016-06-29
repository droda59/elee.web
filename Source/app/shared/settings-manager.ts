import {Settings} from "app/shared/models/settings";

export class SettingsManager {
	settings: Settings;

	constructor() {
		this.settings = new Settings();

		var storageSettings = localStorage.getItem("settings");
		if (storageSettings) {
			this.settings = JSON.parse(storageSettings);
		}
	}

	save(settings: Settings) {
		this.settings = settings;
		localStorage.setItem("settings", JSON.stringify(this.settings));
	}
}
