export class ImageModel {
    public _id?: number;
    public _base64?: string;
    public _tripId?: number;

    constructor(id?: number, base64?: string, tripId?: number) {
        this._id = id;
        this._base64 = base64;
        this._tripId = tripId;
    }
}