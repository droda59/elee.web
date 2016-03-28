import {Welcome} from "app/welcome/welcome";

class I18NStub {
    tr(resource: string) {
        return resource;
    }
}

class RouterStub {
    navigateToRoute(route: string, params?: any, options?: any): boolean {
        return true;
    }
}

describe("the Welcome module", () => {
    var component: Welcome;
    var container: Container;
    var routerMock: RouterStub;

    beforeEach(() => {
        routerMock = new RouterStub();

        component = new Welcome(routerMock, new I18NStub(), "<div>");
    });

    it("constructs with an empty selectedRecipeId property", () => {
        expect(component.selectedRecipeId).toBeUndefined();
    });

    it("cannot navigate to recipe if no recipe selected", () => {
        component.selectedRecipeId = "home.search";

        expect(component.canNavigateToRecipe).toBe(false);
    });

    it("cannot navigate to recipe if no recipe selected", () => {
        component.selectedRecipeId = "someId";

        expect(component.canNavigateToRecipe).toBe(true);
    });

    it("cannot navigate to quick recipe page when no recipe selected", () => {
        component.selectedRecipeId = "home.search";
        spyOn(routerMock, "navigateToRoute");

        component.loadRecipe();

        expect(routerMock.navigateToRoute).not.toHaveBeenCalledWith("quick-recipe", { "id": "someId" }, undefined);
    });

    it("navigates to quick recipe page when recipe selected", () => {
        component.selectedRecipeId = "someId";
        spyOn(routerMock, "navigateToRoute");

        component.loadRecipe();

        expect(routerMock.navigateToRoute).toHaveBeenCalledWith("quick-recipe", { "id": "someId" }, undefined);
    });
});
