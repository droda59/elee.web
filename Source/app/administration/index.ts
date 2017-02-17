import { FrameworkConfiguration } from "aurelia-framework";
import { Router } from "aurelia-router";

export function configure(config: FrameworkConfiguration) {
    config
        .plugin("aurelia-ui-virtualization")
        .plugin("aurelia-dragula");

    const router = config.container.get(Router);

    router.addRoute({
        route: "administration",
        name: "administration",
        moduleId: "app/administration/main",
        nav: true });
}
