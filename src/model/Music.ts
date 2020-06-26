import { Album } from "./Album"

export class Music {
    constructor(
        private id: string,
        private name: string,
        private album: Album,
    ) {}

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getAlbum(): Album {
        return this.album
    }
}