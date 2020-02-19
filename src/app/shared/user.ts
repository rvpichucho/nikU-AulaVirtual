export interface Roles {
    admin?: boolean;
    docente?: boolean;
    estudiante?: boolean;

}

export interface User {
    uid: string;
    email: string;
    roles: Roles;
}
