import { DestinationModel } from "./DestinationModel";
import { ImageModel } from "./ImageModel";

export class TripModel {
    public _id?: number;
    public _destinations?: DestinationModel[];
    public _title?: string;
    public _description?: string;
    public _startDate?: string;
    public _endDate?: string;
    public _images?: ImageModel[];
    public _budget?: number;

    constructor(destinations?: DestinationModel[], title?: string, description?: string, startDate?: string, endDate?: string, images?: ImageModel[], budget?: number) {
        this._destinations = destinations;
        this._title = title;
        this._description = description;
        this._startDate = startDate;
        this._endDate = endDate;
        this._images = images;
        this._budget = budget;
    }
}
