
export interface IMoments {
    author: {
        id: string;
        name: string;
        logo: string;
        size: {
            width: number;
            height: number;
        };
    };
    id: string;
    moment_preview: string;
    title: string;
}