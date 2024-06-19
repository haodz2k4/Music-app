import {Request} from 'express';
export const helperFind = (req: Request) =>{
    interface Find {
        title: any,
        deleted: boolean,
        status: ("active" | "inactive")

    }
    const objectFind: Find = {
        title: null,
        deleted: false,
        status: "active"
    }

    if (typeof req.query.keyword === 'string' && req.query.keyword.trim() !== ''){
        //const str = normalizeString(req.query.keyword);
        //i can't query with normalizeString
        const regex = new RegExp(req.query.keyword, 'i');
        objectFind.title = regex;
    }
    return objectFind;
}