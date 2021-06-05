type Dictionary<T> = { [key: string]: T }

export type Route = {
    name: string;
    params?: Dictionary<string>;
}

export type Pagination = {
    page: number;
    allPage: number;
    hasPrev: boolean;
    prev: Route;
    hasNext: boolean;
    next: Route;
};
