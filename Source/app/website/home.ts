import {inject} from "aurelia-framework";
import {Router, RouterConfiguration} from "aurelia-router";
import {I18N} from "aurelia-i18n";

@inject(I18N)
export class Home {
  router: Router;

  constructor(private i18n: I18N) { }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ["", "welcome"],
        name: "welcome",
        moduleId: "app/website/welcome/welcome",
        nav: true,
        title: this.i18n.tr("home.pageTitle")
      },
      {
        route: "about",
        name: "about",
        moduleId: "app/website/about/about",
        nav: true,
        href: "#/home/about/",
        title: this.i18n.tr("about.pageTitle")
      },
      {
        route: "contact",
        name: "contact",
        moduleId: "app/website/contact/contact",
        nav: true,
        href: "#/home/contact/",
        title: this.i18n.tr("contact.pageTitle")
      }
    ]);

    this.router = router;
  }
}
