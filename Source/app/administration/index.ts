import { FrameworkConfiguration } from "aurelia-framework";
import { Router } from "aurelia-router";
import { I18N } from "aurelia-i18n";

export function configure(config: FrameworkConfiguration) {
    config
        .plugin("aurelia-ui-virtualization")
        .plugin("aurelia-dragula");

    const i18n = config.container.get(I18N);
    const router = config.container.get(Router);

	router.addRoute({
		route: "administration/contact",
		name: "admin-contact",
		moduleId: "app/administration/contact/index",
		title: i18n.tr("administration.contact.pageTitle")
	});

	router.addRoute({
		route: "administration/backgrounds",
		name: "admin-backgrounds",
		moduleId: "app/administration/backgrounds/index",
		title: i18n.tr("administration.backgrounds.pageTitle")
	});

	router.addRoute({
		route: "administration/recipes",
		name: "administration",
		moduleId: "app/administration/recipes/index",
		title: i18n.tr("administration.recipes.pageTitle")
	});

	router.addRoute({
		route: "recipe/:uniqueName/edit",
		name: "edit",
		moduleId: "app/administration/edit-recipe/index"
	});
}
