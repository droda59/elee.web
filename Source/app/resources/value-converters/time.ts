export class TimeFormatValueConverter {
    toView(value: number) {
        var hours = Math.floor(value / 3600);
        var minutes = Math.floor((value - (hours * 3600)) / 60);
        var seconds = value - (hours * 3600) - (minutes * 60);

        return (hours ? (hours < 10 ? "0" + hours : hours) + ":" : "")
            + (minutes < 10 ? "0" + minutes : minutes) + ":"
            + (seconds < 10 ? "0" + seconds : seconds);
    }
}
