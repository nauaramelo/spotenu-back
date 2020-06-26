import { Band } from "./Band";
import { Genre } from "./Genre";

export class Album {
    constructor(
        private id: string,
        private name?: string,
        private genres?: Genre[], 
        private band?: Band
    ) {}

    public getId(): string | undefined {
        return this.id
    }

    public getName(): string | undefined {
        return this.name
    }

    public getGenres(): Genre[] | undefined {
        return this.genres
    }

    public getBand(): Band | undefined {
        return this.band
    }
} 