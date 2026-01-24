export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    birthdate: Date
    phoneNumber?: number;
    isActive: boolean;
    livesIn: string;
    occupation?: string;
    about?: string;
    slogan?: string;
    createdAt: Date;
    updatedAt: string;
}