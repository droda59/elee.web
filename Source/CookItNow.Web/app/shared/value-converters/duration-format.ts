import * as moment from 'moment';

export class DurationFormatValueConverter {
	toView(value: string) {
		if (!/PT[\d]+/.test(value)){
			return value;
		}

		return moment.duration(value).humanize();
	}
}
