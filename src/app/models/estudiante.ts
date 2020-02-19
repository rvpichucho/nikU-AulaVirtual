export class Estudiante {
    idEstudiante:String;
    nombreEstudiante:String;
    apellidoEstudiante:String;
    cedulaEstudiante:String;
    matriculaEstudiante:boolean;
    regionEstudiante:String;
    aprobadoExamen: boolean;
    fechaCurso: String;
    telefonoEstudiante: String;
    correoEstudiante: String;
    activoEstudiante: boolean;

    constructor(estudiante){
        this.idEstudiante = estudiante.idEstudiante;
        this.nombreEstudiante = estudiante.nombreEstudiante;
        this.apellidoEstudiante = estudiante.apellidoEstudiante;
        this.cedulaEstudiante = estudiante.cedulaEstudiante;
        this.matriculaEstudiante = false;
        this.regionEstudiante = estudiante.regionEstudiante;
        this.aprobadoExamen = estudiante.aprobadoExamen;
        this.fechaCurso = estudiante.fechaCurso;
        this.telefonoEstudiante = estudiante.telefonoEstudiante;
        this.correoEstudiante = estudiante.correoEstudiante;
        this.activoEstudiante = false;
    }

}
