export interface Character {
    _id?: string,
    title: string,
    body: string,
    image: string,
    category?:string,
    idAuthor?: number,
    createdAt?: Date,
    updatedAt?: Date
}


