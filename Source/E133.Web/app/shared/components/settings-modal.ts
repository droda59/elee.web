import {inject} from "aurelia-framework";
import {DialogController} from "aurelia-dialog";
import {Ingredient} from "shared/models/ingredient";
import {Quantity} from "shared/models/quantity";
import {Settings} from "shared/models/settings";
import {QuantityConverter} from "shared/quantity-converter";

@inject (DialogController, QuantityConverter)
export class SettingsModal {
	settings: Settings;
	controller: DialogController;
	quantityConverter: QuantityConverter;
	
	volumeDisplays: {}[] = [];
	weightDisplays: {}[] = [];
	
	constructor(controller: DialogController, quantityConverter: QuantityConverter) {
		this.controller = controller;
		this.quantityConverter = quantityConverter;
	}
	
	activate(settings: Settings) {
		this.settings = new Settings();
		
		this.settings.selectedVolumeDisplay = settings.selectedVolumeDisplay;
		this.settings.selectedWeightDisplay = settings.selectedWeightDisplay;
		
		var ingredient1 = new Ingredient();
		ingredient1.name = "eau";
		ingredient1.quantity = new Quantity();
		ingredient1.quantity.value = 1000;
		ingredient1.quantity.unit = "ml";
		
		var ingredient2 = new Ingredient();
		ingredient2.name = "cassonade";
		ingredient2.quantity = new Quantity();
		ingredient2.quantity.value = 750;
		ingredient2.quantity.unit = "ml";
		
		var ingredient3 = new Ingredient();
		ingredient3.name = "lait";
		ingredient3.quantity = new Quantity();
		ingredient3.quantity.value = 30;
		ingredient3.quantity.unit = "ml";
		
		var ingredient4 = new Ingredient();
		ingredient4.name = "sel";
		ingredient4.quantity = new Quantity();
		ingredient4.quantity.value = 2.5;
		ingredient4.quantity.unit = "ml";
		
		this.volumeDisplays.push({
			name: "metricShort",
			examples: [ ingredient1, ingredient2, ingredient3, ingredient4 ]
		});
		
		this.volumeDisplays.push({
			name: "metricComplete",
			examples: [ ingredient1, ingredient2, ingredient3, ingredient4 ]
		});
		
		this.volumeDisplays.push({
			name: "imperialShort",
			examples: [ ingredient1, ingredient2, ingredient3, ingredient4 ]
		});
		
		this.volumeDisplays.push({
			name: "imperialComplete",
			examples: [ ingredient1, ingredient2, ingredient3, ingredient4 ]
		});
		
		this.volumeDisplays.push({
			name: "both",
			examples: [ ingredient1, ingredient2, ingredient3, ingredient4 ]
		});
		
		var ingredient5 = new Ingredient();
		ingredient5.name = "poulet";
		ingredient5.quantity = new Quantity();
		ingredient5.quantity.value = 1360;
		ingredient5.quantity.unit = "g";
		
		var ingredient6 = new Ingredient();
		ingredient6.name = "farine";
		ingredient6.quantity = new Quantity();
		ingredient6.quantity.value = 680;
		ingredient6.quantity.unit = "g";
		
		this.weightDisplays.push({
			name: "metricShort",
			examples: [ ingredient5, ingredient6 ]
		});
		
		this.weightDisplays.push({
			name: "metricComplete",
			examples: [ ingredient5, ingredient6 ]
		});
		
		this.weightDisplays.push({
			name: "imperialShort",
			examples: [ ingredient5, ingredient6 ]
		});
		
		this.weightDisplays.push({
			name: "imperialComplete",
			examples: [ ingredient5, ingredient6 ]
		});
		
		this.weightDisplays.push({
			name: "both",
			examples: [ ingredient5, ingredient6 ]
		});
	}
}
