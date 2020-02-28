import { Observable} from 'rxjs';
export class Deber {
    idDeber:String;
    nombreDeber:String;
    downloadURL: Observable <String>;
    path:string;
    descripcionDeber:String;
    detalleDeber: File[];
    calificacionDeber: number;
    constructor(deber){
      this.idDeber = deber.idDeber;
      this.nombreDeber = deber.nombreDeber;
      this.descripcionDeber = deber.descripcionDeber;
      this.detalleDeber = deber.detalleDeber;
      this.downloadURL = deber.downloadURL;
      this.path = deber.path;
      this.calificacionDeber = deber.calificacionDeber;
    }

}
