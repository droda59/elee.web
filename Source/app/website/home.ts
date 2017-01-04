import {inject} from "aurelia-framework";
import {Router, RouterConfiguration} from "aurelia-router";
import {I18N} from "aurelia-i18n";

@inject(I18N)
export class Home {
  router: Router;
  i18n: I18N;

  constructor(i18n: I18N) {
    this.i18n = i18n;
  }

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
        href: "#/home/about/"
        title: this.i18n.tr("about.pageTitle")
      },
      {
        route: "comments",
        name: "comments",
        moduleId: "app/website/comments/comments",
        nav: true,
        href: "#/home/comments/"
        title: this.i18n.tr("comments.pageTitle")
      }
    ]);

    this.router = router;
  }
}
