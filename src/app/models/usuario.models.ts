 // Necesito exportarlo porque voy a usarlo fuera de este archivo
export class Usuario{

    // El orden si importa porque como esten aqui, asi deben de ser inicializadas
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ){}
}
