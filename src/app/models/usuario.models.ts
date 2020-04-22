 // Necesito exportarlo porque voy a usarlo fuera de este archivo
export class Usuario{

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: string,
        public _id?: string
    ){}
}
