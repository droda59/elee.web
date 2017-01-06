export class ContactForm implements ContactFormDto {
    name: string;
    email: string;
    message: string;
    date: Date;

    constructor(dto: ContactFormDto) {
        (<any>Object).assign(this, dto);

        this.date = new Date(dto.date);
    }
}
interface ContactFormDto {
    name: string;
    email: string;
    message: string;
    date: string;
}
