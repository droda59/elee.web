import { FrameworkConfiguration, NewInstance } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { Configure } from "aurelia-configuration";
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

    const configure = config.container.get(Configure);
    const httpClient = config.container.get(NewInstance.of(HttpClient));
    httpClient.configure(config => {
        config
            .useStandardConfiguration()
            .withDefaults({
                headers: {
                    "Accept": "application/json",
                    "X-Requested-With": "Fetch",
                    "X-Admin": configure.is("development")
                }
            })
            .withBaseUrl(configure.get("api"));
        });

    config.container.registerInstance("admin-api-service", httpClient));
}
