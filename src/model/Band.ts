import { UserRole, User } from "./User";

export class Band extends User {
    constructor(
        id: string,
        email?: string,
        name?: string,
        nickname?: string,
        password?: string,
        role?: UserRole,
        private description?: string,
        private isActive?: boolean,
    ) {
        super(id, name, nickname, email, password, role);
    }


    public getDescription(): string | undefined {
        return this.description;
    }

    public getIsActive(): boolean | undefined {
        return this.isActive; 
    }
}