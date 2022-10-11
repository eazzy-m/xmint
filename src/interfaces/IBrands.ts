
import { IAthlete } from "./IAthletes";

export interface IBrands {
    athletes?: null | IAthlete[];
    creator_logo: string;
    id: string;
    logo: string;
    full_name?: string;
    name?: string,
}