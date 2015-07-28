declare module "aurelia-compiler" {
    import {ViewFactory} from "aurelia-templating/view-factory";
    import {ViewSlot} from "aurelia-templating/view-slot";
    import {BehaviorInstance} from "aurelia-templating/behavior-instance";
    
    export class Compiler {
        constructor(viewCompiler, compositionEngine, viewEngine, resources, container, loader);
        swapView(container,view,transformer): string;
        createFragment(element): DocumentFragment;
        processBehavior(container, ctx): BehaviorInstance;
        compile(element, ctx, viewSlot, templateOrFragment): ViewSlot;
        composeElementInstruction(element, instruction, ctx): any;
        composeBehaviorInstruction(container, instruction, ctx): any;
        loadText(url): string;
        loadViewFactory(view): ViewFactory;
        loadTemplate(urlOrRegistryEntry, associatedModuleId): any;
        loadVM(moduleId): Promise<any>;
        processInstruction(ctx, instruction): any;
    }
}