export class Docente {
    idDocente:String;
    nombreDocente:String;
    apellidoDocente:String;
    telefonoDocente: String;
    correoDocente: String;
    constructor(docente){
        this.idDocente = docente.idDocente;
        this.nombreDocente = docente.nombreDocente;
        this.apellidoDocente = docente.apellidoDocente
        this.telefonoDocente = docente.telefonoDocente;
        this.correoDocente = docente.correoDocente;
        
    }
}
