import { Request } from "express"
export const listSort = (req: Request,validKeysort: string[]) =>{
    type validSortvalue = "desc" | "asc";
    interface Sort {
        [key: string]: validSortvalue;
    }
    const Sort: Sort = {};

    const sortKey = req.query.sortKey;
    const sortValue = req.query.sortValue;
    
    if (typeof sortKey === 'string' && typeof sortValue === 'string') {
        if (validKeysort.includes(sortKey)) {
            Sort[sortKey] = sortValue as validSortvalue;
        }
    }
    return Sort;
}