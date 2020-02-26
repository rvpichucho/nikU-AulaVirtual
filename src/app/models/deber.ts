export class Deber {
    idDeber:String;
    nombreDeber:String;
    descripcionDeber:String;
    detalleDeber: File;
    calificaionDeber: number;
    constructor(deber){
        this.idDeber = deber.idDeber;
        this.nombreDeber = deber.nombreDeber;
        this.descripcionDeber = deber.descripcionDeber;
        this.detalleDeber = deber.detalleDeber;
        this.calificaionDeber = deber.calificaionDeber;
    }

}
