import { IMoments } from "./IMoments";

export interface ICard {
    brands?: [];
    drop_banner: string;
    id: string;
    is_released: boolean;
    is_sold_out: boolean;
    marketplace_banner: string;
    number: number;
    pack_artwork: string;
    price: number;
    release_datetime: string;
    title: string;
    moments?: IMoments[];
}