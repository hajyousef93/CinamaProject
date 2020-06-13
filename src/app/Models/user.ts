export class User {
    userName:string;
    normalizedUserName:string;
    email:string;
    normalizedEmail:string;
    emailConfirmed:boolean;
    passwordHashL:string;
    securityStamp:string;
    concurrencyStamp:string;
    phoneNumber:string;
    phoneNumberConfirmed:boolean;
    twoFactorEnabled:boolean;
    lockoutEnd:Date;
    lockoutEnabled:boolean;
    accessFailedCount:number;
    country:string;
}
