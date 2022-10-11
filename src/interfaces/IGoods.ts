import { IPic } from "./IPic"

export interface IGoods {
        cover_image: IPic,
        enhanced_pic: IPic,
        id: string,
        is_liked_by_user: boolean,
        is_saved_by_user: boolean,
        likes: number,
        max_price: null,
        min_price: null,
        moment_preview: string,
        original_pic: IPic,
        short_id: string,
        title: string
    }
    