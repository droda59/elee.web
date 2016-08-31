import {Welcome} from "app/website/welcome/welcome";

class I18NStub {
    tr(key: any, options?: any): any {
        return key;
    }
}

class RouterStub {
    routes;
    navigateToRoute(route: string, params?: any, options?: any): boolean {
        return true;
    }
}

class HttpClientStub {
    get(url: string): Promise<HttpResponseMessage> {
        return new Promise<HttpResponseMessage>;
    }
}

class EventAggregatorStub {
    subscribe(event: string | Function, callback: Function) {
        return true;
    }
}

describe("the Welcome module", () => {
    var component: Welcome;
    var container: Container;
    var routerMock: RouterStub;
    var httpClientMock: HttpClientStub;
    var eaMock: EventAggregatorStub;

    beforeEach(() => {
        routerMock = new RouterStub();
        httpClientMock = new HttpClientStub();
        eaMock = new EventAggregatorStub();

        component = new Welcome(httpClientMock, routerMock, new I18NStub(), "<div>", eaMock);
    });

    it("constructs with an empty selectedRecipeId property", () => {
        expect(component.selectedRecipeId).toBeUndefined();
    });

    it("cannot navigate to quick recipe page when no recipe selected", () => {
        spyOn(routerMock, "navigateToRoute");

        expect(routerMock.navigateToRoute).not.toHaveBeenCalledWith("quick-recipe", { "id": "someId" }, undefined);
    });

    it("navigates to quick recipe page when recipe selected", () => {
        spyOn(routerMock, "navigateToRoute");

        component.loadRecipe("someId");

        expect(routerMock.navigateToRoute).toHaveBeenCalledWith("quick-recipe", { "id": "someId" }, undefined);
    });
});
