export class Genre {
    constructor(
        private id: string,
        private name?: string
    ) {}

    public getId(): string {
        return this.id
    }

    public getName(): string | undefined {
        return this.name
    }
}