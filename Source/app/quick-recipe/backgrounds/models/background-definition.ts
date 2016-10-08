export class BackgroundDefinition implements BackgroundDefinitionDto {
    fileName: string;
    tagQualifiers: Array<any> = [];
    qualifiers: Array<string> = [];

    constructor()
    constructor(dto: BackgroundDefinitionDto)
    constructor(dto?: BackgroundDefinitionDto) {
        (<any>Object).assign(this, dto);

        this.qualifiers.map(qualifier => this.tagQualifiers.push({tag: qualifier}));
    }
}

export interface BackgroundDefinitionDto {
    fileName: string;
    qualifiers: Array<string>;
}
