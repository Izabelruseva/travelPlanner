export class DestinationModel {
    public _id?: number;
    public _name?: string;
    public _coordinates?: string;
    public _description?: string;
    public _tripId?: number;

    constructor(id?: number, name?: string, coordinates?: string, description?: string, tripId?: number) {
        this._id = id;
        this._name = name;
        this._coordinates = coordinates;
        this._description = description;
        this._tripId = tripId;
    }
}