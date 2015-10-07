import {inject} from "aurelia-framework";
import {DialogController} from "aurelia-dialog";
import {Ingredient} from "shared/models/ingredient";
import {Quantity} from "shared/models/quantity";
import {Settings} from "shared/models/settings";
import {QuantityConverter} from "shared/quantity-converter";
import {QuantityConverter} from "shared/quantity-converter";

@inject (DialogController, QuantityConverter)
export class SettingsModal {
	settings: Settings;
	controller: DialogController;
	quantityConverter: QuantityConverter;
	
    volumeOptions: string[] = [ "metric", "imperial" ];
    weightOptions: string[] = [ "metric", "imperial" ];
    metricVolumeOptions: string[] = [ "metricOnly", "imperialWhenPossible", "showBoth" ];
	
    volumeDisplays: {}[] = [ 
		{
			name: "metricShort",
			examples: [
				"1 l d'eau", 
				"750 ml de cassonade", 
				"30 ml de lait",
				"2.5 ml de sel" 
			]
		}, 
		{
			name: "metricComplete",
			examples: [ 
				"1 l d'eau", 
				"7.5 dl de cassonade",  
				"3 cl de lait",
				"2.5 ml de sel"
			]
		}, 
		{
			name: "imperialShort",
			examples: [
				"4 tasses d'eau", 
				"3 tasses de cassonade", 
				"2 tbsp de lait",
				"1 tsp de sel" 
			]
		}, 
		{
			name: "imperialComplete",
			examples: [ 
				"4 tasses d'eau", 
				"3 tasses de cassonade", 
				"1 oz de lait",
				"1 tsp de sel" 
			]
		},
		{
			name: "both",
			examples: [ 
				"1 l (4 tasses) d'eau", 
				"750 ml (3 tasses) de cassonade", 
				"30 ml (2 tbsp) de lait",
				"2.5 ml (1 tsp) de sel" 
			]
		} ];
	
	constructor(controller: DialogController, quantityConverter: QuantityConverter) {
		this.controller = controller;
		this.quantityConverter = quantityConverter;
	}
	
	activate(settings: Settings) {
		this.settings = new Settings();
		
		this.settings.selectedVolumeDisplay = settings.selectedVolumeDisplay;
		this.settings.selectedWeightOption = settings.selectedWeightOption;
	}
}
