import {autoinject, bindable} from "aurelia-framework";
import {I18N} from "aurelia-i18n";
import {SettingsManager} from "app/shared/settings-manager";
import {Ingredient} from "app/shared/models/ingredient";
import {Quantity} from "app/shared/models/quantity";
import {Settings} from "app/shared/models/settings";
import {Millilitre} from "app/shared/models/measure-units/millilitre";
import {Gram} from "app/shared/models/measure-units/gram";

@autoinject()
export class SettingsPanel {
    private _i18n: I18N;
    private _settingsManager: SettingsManager;

    @bindable selectedVolumeDisplay: string = "";
    @bindable selectedWeightDisplay: string = "";

    volumeDisplays: {}[] = [];
    weightDisplays: {}[] = [];

    constructor(i18n: I18N, settingsManager: SettingsManager) {
        this._i18n = i18n;
        this._settingsManager = settingsManager;

        this.selectedVolumeDisplay = this._settingsManager.settings.selectedVolumeDisplay;
        this.selectedWeightDisplay = this._settingsManager.settings.selectedWeightDisplay;
    }

    selectedVolumeDisplayChanged() {
        var settings = new Settings();

        settings.selectedVolumeDisplay = this.selectedVolumeDisplay;
        settings.selectedWeightDisplay = this._settingsManager.settings.selectedWeightDisplay;

        this._settingsManager.save(settings);
    }

    selectedWeightDisplayChanged() {
        var settings = new Settings();

        settings.selectedVolumeDisplay = this._settingsManager.settings.selectedVolumeDisplay;
        settings.selectedWeightDisplay = this.selectedWeightDisplay;

        this._settingsManager.save(settings);
    }

    bind() {
        this.selectedVolumeDisplay = this._settingsManager.settings.selectedVolumeDisplay;
        this.selectedWeightDisplay = this._settingsManager.settings.selectedWeightDisplay;

        var ingredient1 = new Ingredient();
        ingredient1.name = this._i18n.tr("settings.examples.water");
        ingredient1.quantity = new Quantity();
        ingredient1.quantity.value = 1000;
        ingredient1.quantity.unit = Millilitre.instance;

        var ingredient2 = new Ingredient();
        ingredient2.name = this._i18n.tr("settings.examples.brownSugar");
        ingredient2.quantity = new Quantity();
        ingredient2.quantity.value = 750;
        ingredient2.quantity.unit = Millilitre.instance;

        var ingredient3 = new Ingredient();
        ingredient3.name = this._i18n.tr("settings.examples.milk");
        ingredient3.quantity = new Quantity();
        ingredient3.quantity.value = 30;
        ingredient3.quantity.unit = Millilitre.instance;

        var ingredient4 = new Ingredient();
        ingredient4.name = this._i18n.tr("settings.examples.salt");
        ingredient4.quantity = new Quantity();
        ingredient4.quantity.value = 2.5;
        ingredient4.quantity.unit = Millilitre.instance;

        this.volumeDisplays.push({
            name: "metricShort",
            examples: [ingredient1, ingredient2, ingredient3, ingredient4]
        });

        this.volumeDisplays.push({
            name: "metricComplete",
            examples: [ingredient1, ingredient2, ingredient3, ingredient4]
        });

        this.volumeDisplays.push({
            name: "imperialShort",
            examples: [ingredient1, ingredient2, ingredient3, ingredient4]
        });

        this.volumeDisplays.push({
            name: "imperialComplete",
            examples: [ingredient1, ingredient2, ingredient3, ingredient4]
        });

        this.volumeDisplays.push({
            name: "both",
            examples: [ingredient1, ingredient2, ingredient3, ingredient4]
        });

        var ingredient5 = new Ingredient();
        ingredient5.name = this._i18n.tr("settings.examples.chicken");
        ingredient5.quantity = new Quantity();
        ingredient5.quantity.value = 1360;
        ingredient5.quantity.unit = Gram.instance;

        var ingredient6 = new Ingredient();
        ingredient6.name = this._i18n.tr("settings.examples.flour");
        ingredient6.quantity = new Quantity();
        ingredient6.quantity.value = 680;
        ingredient6.quantity.unit = Gram.instance;

        this.weightDisplays.push({
            name: "metricShort",
            examples: [ingredient5, ingredient6]
        });

        this.weightDisplays.push({
            name: "metricComplete",
            examples: [ingredient5, ingredient6]
        });

        this.weightDisplays.push({
            name: "imperialShort",
            examples: [ingredient5, ingredient6]
        });

        this.weightDisplays.push({
            name: "imperialComplete",
            examples: [ingredient5, ingredient6]
        });

        this.weightDisplays.push({
            name: "both",
            examples: [ingredient5, ingredient6]
        });
    }
}
