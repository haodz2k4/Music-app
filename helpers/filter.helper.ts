import { Request } from "express";
export const btnStatus = (req: Request): any =>{
    interface Status {
        status: string,
        content: string,
        isActive?: string
    }
    const btnStatus: Status[] = [
        {
            status: "",
            content: "Tất cả",
        },
        {
            status: "active",
            content: "Hoạt động"
        },
        {
            status: "inactive",
            content: "Không hoạt động"
        }
    ]
    const status = req.query.status;
    const validStatus = ["active","inactive"];
    if(typeof status === 'string' && validStatus.includes(status)){
        const index = btnStatus.findIndex(item => item.status === status);
        btnStatus[index].isActive = "active"
    }else{
        btnStatus[0].isActive = "active"
    }
    return btnStatus;
}

