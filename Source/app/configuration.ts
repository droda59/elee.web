import * as Backend from "i18next-xhr-backend";
import { HttpClient } from "aurelia-fetch-client";
import { MaterializeFormValidationRenderer } from "app/shared/materialize-form-validation-renderer";
import environment from "app/environment";
import "materialize-css"; // ONLY when using the "npm" option above
import * as AOS from "aos";

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .globalResources("app/shared/components/loading-overlay")
    .globalResources("app/shared/components/loading.html")
    .plugin("aurelia-animator-css")
    .plugin("aurelia-infinite-scroll")
    .plugin("aurelia-configuration", config => {
        config.setDirectory("app/shared/config");
        config.setEnvironments({
            development: ["localhost", "eleemenudev.azurewebsites.net"],
            production: ["elee.menu"]
        });
    })
    // .plugin("aurelia-dialog")
    .plugin("aurelia-validation")
    .plugin("aurelia-i18n", (instance) => {
      instance.i18next.use(Backend);
      return instance.setup({
        backend: {
          loadPath: "/dist/app/shared/assets/locales/{{lng}}.json"
        },
        lng: "fr",
        attributes: ["t", "i18n"],
        getAsync: true,
        sendMissing: false,
        fallbackLng: "fr",
        debug: false
      });
    }).plugin("aurelia-google-analytics", config => {
      config.init("UA-73519104-1");
      config.attach({
        logging: {
          enabled: false
        },
        pageTracking: {
          enabled: true
        },
        clickTracking: {
          enabled: true,
          filter: config._options.clickTracking.filter
        }
      });
    }).plugin("aurelia-materialize-bridge", bridge => {
      bridge
        .useRange()
        .useChip()
        .useCollapsible()
        .useDropdown()
        .useDropdownFix()
        .useFab()
        .usePushpin()
        .useSelect()
        .useScrollSpy()
        .useSidenav()
        .useSlider()
        .useTooltip()
        .useInput()
        .useAutoComplete()
        .useTabs()
        .useWaves()
    });

    if (environment.debug) {
        aurelia.use
            .developmentLogging()
            .plugin("aurelia-ui-virtualization")
            .plugin("aurelia-dragula");
    }

	aurelia.container.registerHandler(
		"materialize-form",
		container => container.get(MaterializeFormValidationRenderer));

	aurelia.start().then(a => a.setRoot("app/main", document.body));

	moment.relativeTimeThreshold("s", 60);
	moment.relativeTimeThreshold("m", 60);
	moment.relativeTimeThreshold("h", 24);
	moment.relativeTimeThreshold("d", 28);
	moment.relativeTimeThreshold("M", 12);

    AOS.init();

	String.prototype.format = function () {
		var args = arguments;
		return this.replace(/{(\d+)}/g, (match, number) => {
			return typeof args[number] !== "undefined" ? args[number] : match;
		});
	};

	String.prototype.replaceAll = function (search, replacement) {
		var target = this;
		return target.split(search).join(replacement);
	};

	Array.prototype.selectMany = function (fn): Array<any> {
		return this.map(fn).reduce((x, y) => {
			return x.concat(y);
		}, []);
	};

    Array.prototype.removeFromArray = function(object: any): void {
        var index = this.indexOf(object);
        if (index > -1) {
            this.splice(index, 1);
        }
    }

    Array.prototype.unique = function(param): Array<any> {
        return this.filter((item, pos, array) => {
            return array.map(x => {
                return x[param];
            }).indexOf(item[param]) === pos;
        });
    };
}

declare global {
	interface String {
		format(): string;
		replaceAll(search, replacement): string;
	}

	interface Array<T> {
		selectMany(fn): Array<any>;
		unique(param): Array<any>;
		removeFromArray(object): void;
	}

    interface Math {
        trunc(x: number): number;
    }
}
