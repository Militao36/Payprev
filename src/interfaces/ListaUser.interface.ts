export interface ListaUser {
    idListaUser: number;
    idLista: number;
    idUser: number;
    tags: string[];
}

export interface ListaUserAll {
    idListaUser: number;
    idLista: number;
    idUser: number;
    tags: string[];
    idUserGit?: number;
    login: string;
    name: string;
    bio: string;
    location: string;
    html_url: string;
}
