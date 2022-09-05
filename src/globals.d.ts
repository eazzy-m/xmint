export {};
declare global {
    interface Window {
        ENV?: string;
        API_HOST?: string;
        SENTRY_DSN?: string;
    }
    interface ObjectConstructor {
        keys<T>(o: T): ObjectKeys<T>;
    }
    type ObjectKeys<T> = T extends object
        ? (keyof T)[]
        : T extends number
            ? []
            : T extends Array<any> | string
                ? string[]
                : never;
    type ValueOfObject<T> = T extends T ? T[keyof T] : never;
}