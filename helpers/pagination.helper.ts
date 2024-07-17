interface Pagination {
    limit: number,
    currentPage: number,
    skip: number,
    countPage: number,
}
const pagination: Pagination = {
    limit: 0,
    currentPage: 1,
    skip: 0,
    countPage: 0
}
export const getPagination = async (limit: number,model: any): Promise<Pagination> =>{
    pagination.limit = limit;
    const count = await model.countDocuments({deleted: false});
    pagination.countPage = Math.ceil(count / pagination.limit);
    return pagination;
}
export const skipPagination = (currentPage: number): number =>{
    pagination.skip = (currentPage - 1) * pagination.limit;
    return pagination.skip;
}