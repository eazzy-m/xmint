import { IAthlete } from "./IAthletes";
import { IBrands } from "./IBrands";
import { IPlaces } from "./IPlaces";
export interface IFilters {
    athletes: IAthlete[],
    brands: IBrands[],
    places: IPlaces[],
}