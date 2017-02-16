export class DurationValueConverter {
    toView(value: string) {
        if (!/PT[\d]+/.test(value)) {
            return value;
        }

        return moment.duration(value).humanize();
    }
}
