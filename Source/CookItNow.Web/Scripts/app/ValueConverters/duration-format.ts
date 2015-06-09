/// <reference path="../../typings/moment.d.ts"/>

import * as moment from "moment";

export class DurationFormatValueConverter {
	toView(value) {
		var regex = /PT\d\dH\d\dM/;
		
		if (!regex.test(value)){
			return value;
		}
		
		var match = regex.exec(value);
		var hours = match[0].slice(2, 4);
		var minutes = match[0].slice(5, 7);
		
		var duration = moment.duration({ hours: hours, minutes: minutes }).humanize();
		
		return duration;
	}
}