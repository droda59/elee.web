import { FrameworkConfiguration } from "aurelia-framework";

export function configure(config: FrameworkConfiguration) {
    var elements = [
        "app/resources/elements/loading-overlay",
        "app/resources/elements/loading.html"
    ];

    var valueConverters = [
        "app/resources/value-converters/duration",
        "app/resources/value-converters/lowercase",
        "app/resources/value-converters/quantity-human-format",
        "app/resources/value-converters/time",
        "app/resources/value-converters/uppercase-first-letter"
    ];

    var attributes = [
        "app/resources/attributes/auto-width-input"
    ];

    config.globalResources(
        elements.concat(valueConverters).concat(attributes)
    );
}
