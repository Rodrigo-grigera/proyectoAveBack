export interface ResponseLoginDto{
    code: number;
    message: string;
    token: string;
    user : payload;
}

export interface payload{
    sub: number,
    email: string
}