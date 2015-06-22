export class ComposeValueConverter {
	toView(value, view: string) {
		var composeElement = document.createElement("compose");
		composeElement.setAttribute("model.bind", value);
		composeElement.setAttribute("view-model", view);
		
		var spanElement = document.createElement("span");
		spanElement.className = "compose";
		spanElement.appendChild(composeElement);
		
		return spanElement.outerHTML;
	}
}