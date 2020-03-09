export class Video {
    idVideo:String;
    nombreVideo:String;
    descripcionVideo:String;
    urlVideo: String;
    estadoVideo: boolean;
    constructor(video){
        this.idVideo = video.idVideo;
        this.nombreVideo = video.nombreVideo;
        this.descripcionVideo = video.descripcionVideo
        this.urlVideo = video.urlVideo;
        this.estadoVideo = video.estadoVideo;
    }
}
