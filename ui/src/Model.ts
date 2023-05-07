export type Model = {
    Files: Array<File>;
}

export type File = {
    Services: Array<Service>;
}

export type Service = {
    Name: string;
    Methods: Array<Method>;
}

export type Method = {
    Name: string;
}