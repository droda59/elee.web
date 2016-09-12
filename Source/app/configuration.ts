import * as Backend from "i18next-xhr-backend";
import "materialize-css"; // ONLY when using the "npm" option above

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .globalResources("app/shared/aurelia-materialize")
    .plugin("aurelia-animator-css")
    .plugin("aurelia-dialog")
    .plugin("aurelia-i18n", (instance) => {
      instance.i18next.use(Backend);
      return instance.setup({
        backend: {
          loadPath: "/dist/app/shared/assets/locale/{{lng}}/{{ns}}.json"
        },
        lng: "fr",
        attributes: ["t", "i18n"],
        getAsync: true,
        sendMissing: false,
        fallbackLng: "fr",
        debug: false
      });
    })
    .plugin("aurelia-google-analytics", config => {
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
        .useFab()
        .usePushpin()
        .useSelect()
        .useScrollSpy()
        .useTooltip()
    });;

  aurelia.start().then(a => a.setRoot("app/main", document.body));

  moment.relativeTimeThreshold("s", 60);
  moment.relativeTimeThreshold("m", 60);
  moment.relativeTimeThreshold("h", 24);
  moment.relativeTimeThreshold("d", 28);
  moment.relativeTimeThreshold("M", 12);

  if (!String.format) {
    String.format = function (format) {
      var args = Array.prototype.slice.call(arguments, 1);
      return format.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] !== "undefined" ? args[number] : match;
      });
    };
  }

    Array.prototype.selectMany = function (fn) {
        return this.map(fn).reduce(function (x, y) { return x.concat(y); }, []);
    };
}
