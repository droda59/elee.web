export class UppercaseFirstLetterFormatValueConverter {
    toView(value: string) {
		return value[0].toUpperCase() + value.slice(1, value.length);
    }
}