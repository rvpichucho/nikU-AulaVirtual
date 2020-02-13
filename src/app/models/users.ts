export interface Roles{
    admin : boolean;
    estudiante : boolean;
    docente : boolean 
}

export class Users {
    idUsuario : number;
    nombreUsuario : string;
    emailUsuario : string;
    passwordUsuario : string; 
    rolesUsuario : Roles;

}
