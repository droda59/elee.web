export class ContactForm implements ContactFormDto {
    name: string;
    email: string;
    message: string;
    date: Date;

    constructor();
    constructor(dto: ContactFormDto);
    constructor(dto?: ContactFormDto) {
        if (dto) {
            (<any>Object).assign(this, dto);

            this.date = new Date(dto.date);
        }
    }
}
interface ContactFormDto {
    name: string;
    email: string;
    message: string;
    date: Date;
}
