const url = new URL(window.location.href);

//handle keyword
const formSearch = document.querySelector("[form-search]");
if(formSearch){
    formSearch.addEventListener("submit",(e) =>{
        e.preventDefault();
        const inp = formSearch.querySelector("input");
        
        if(!inp.value){
            url.searchParams.delete("keyword");
            window.location.href = url;
            return;
        }
        formSearch.submit();
        
    })
}
//end handle keyword
//handle filter here
const btnFilterStatus = document.querySelectorAll("[btn-filter-status]");
if(btnFilterStatus.length > 0){
    btnFilterStatus.forEach((item) =>{
        item.addEventListener("click",() =>{
            const status = item.getAttribute("btn-filter-status");
            if(status){
                url.searchParams.set("status",status)
            }else{
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        })
    })
}
//end filter 
//handle checked
const table = document.querySelector("[table-manage]");
if(table){
    const checkAll = table.querySelector("thead tr th input[name='check-all']");
    const checkMulti = table.querySelectorAll("tbody tr td input[name='ids']");
    checkAll.addEventListener("click",() =>{
        if(checkAll.checked === true){
            for(const item of checkMulti){
                item.checked = true
            }
        }else{
            for(const item of checkMulti){
                item.checked = false
            }
        }
    })
    checkMulti.forEach((item) => {
        item.addEventListener("click",() =>{
            const countChecked = table.querySelectorAll("tbody tr td input[name='ids']:checked").length;
            const lengthChecked = checkMulti.length;
            if(countChecked === lengthChecked){
                checkAll.checked = true
            }
        })
    })
}

//end checked
//change multi 
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(e) =>{
        e.preventDefault();
        const inpIds = formChangeMulti.querySelector("input[name='ids']");

        const checkMulti = table.querySelectorAll("tbody tr td input[name='ids']:checked");
        const listId = [];
        for(const item of checkMulti){
            listId.push(item.value);
        }
        inpIds.value = listId.join("-");
        formChangeMulti.submit();

    })
}
//end change multi 

//sorted 
const selectSorted = document.querySelector("select[name='sorted']");
if(selectSorted){
    selectSorted.addEventListener("change",() =>{
        const value = selectSorted.value;
        const [sortKey, sortValue] = value.split("-");
        if(sortKey && sortValue){
            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);

        }else{
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue")
        }
        window.location.href = url.href;
    })
}

//end sorted 

//show garbage 
const btnGarbage = document.querySelector("btn-garbage");
if(btnGarbage){
    btnGarbage.addEventListener("click",() =>{
        url.searchParams.set("garbage","show");
    })
}
//end show garbage
//btn delete
const btnDeleted = document.querySelectorAll("[btn-deleted]");
if(btnDeleted.length > 0){
    btnDeleted.forEach((item) =>{
        item.addEventListener("click",async () =>{
            const isConfim = confirm("bạn có muốn xóa sản phẩm này không");
            if(!isConfim){
                return;
            }
            const id = item.getAttribute("btn-deleted");
            const option = {
                method: "PATCH"
            }
            //validate prefix admin
            const pathDeleted = document.querySelector("[path-deleted]");
            const valuePathDeleted = pathDeleted.getAttribute("path-deleted");
            const path = `${valuePathDeleted}/${id}`
            const response = await fetch(path, option);
            if(response.status === 403){
                window.location.href = '/admin/auth/access/deny';
                return;
            }
            const data = await response.json();
            if(data.success){
                alert("Xóa sản phẩm thành công");
                const tr = item.closest("tr");
                tr.classList.add("d-none")
            }

        })
    })
    
}
//end deleted 

//change status
const btnChangeStatus = document.querySelectorAll("[btn-change-status]");
if(btnChangeStatus.length > 0){
    btnChangeStatus.forEach((item) =>{
        item.addEventListener("click",async () =>{
            const id = item.getAttribute("btn-change-status");
            let status = item.getAttribute("status");
            if(status === "active"){
                status = "inactive"
            }else{
                status = "active"
            }
            const path = document.querySelector("[path-change-status]").getAttribute("path-change-status");

            const updatePath = `${path}/${status}/${id}`;
            const action = {
                method: "PATCH"
            }
            const response = await fetch(updatePath,action);
            if (response.status === 403) {
                    window.location.href = '/admin/auth/access/deny';
                    return;
                }
            const data = await response.json();
            if(data.success){
                item.innerHTML = data.status;
                if(data.status === "active"){
                    item.classList.remove("badge","rounded-pill","text-bg-danger");
                    item.classList.add("badge","rounded-pill","text-bg-success");
                    item.setAttribute("status",data.status)

                }else{
                    item.classList.remove("badge","rounded-pill","text-bg-success");
                    item.classList.add("badge","rounded-pill", "text-bg-danger");
                    item.setAttribute("status",data.status)
                }
            }else{
                alert("Cập nhật trạng thái thất bại")
            }



        })
    })
}

//change status 
//permissions 
const tablePermission = document.querySelector("[table-permission]");
if(tablePermission){ 
    //push data to view 
    const dataRoles = document.querySelector("[data-roles]");
    const roles = JSON.parse(dataRoles.getAttribute("data-roles"));
    roles.forEach((role, index) =>{
        for(const permission of role.permissions){
            const dataName = tablePermission.querySelector(`tr[data-name=${permission}]`);
            const inp = dataName.querySelectorAll("input")[index];
            inp.checked = true;
            
        }
    })
    //end push data to view 
    

}
//end permission 
//update permission 
const btnUpdatePermission = document.querySelector("[btn-updated-permission]");
if(btnUpdatePermission){
    btnUpdatePermission.addEventListener("click",() =>{
        const roles = [];
        const rows = document.querySelectorAll("table tbody tr[data-name]");
        rows.forEach((row, index) =>{
            const dataName = row.getAttribute("data-name");
            const inp = row.querySelectorAll("input");
            if(dataName === "id"){
                for(const item of inp){
                    roles.push({
                        id: item.value,
                        permissions: []
                    })
                }
            }else{
                inp.forEach((item, i) => {
                    const inpChecked = item.checked;
                    if(inpChecked){
                        roles[i].permissions.push(dataName);
                    }
                });
                
            }
        });

        //handle update here 
        const url = window.location.href;
        const option = {
            method: "PATCH",
            body: JSON.stringify({roles}),
            headers: {
                'Content-Type': 'application/json' 
            }
        };
        (async () => {
            try {
                const response = await fetch(url, option);
                const data = await response.json();
                if (data.success) {
                    alert("Cập nhật thành công");
                } else {
                    alert("Cập nhật thất bại");
                }
            } catch (error) {
                console.error("Lỗi khi cập nhật roles:", error);
                alert("Đã xảy ra lỗi trong quá trình cập nhật");
            }
        })();
        //end update

        

    })
}
//end updatePermsison
//preview img 
const inpPreview = document.querySelector("[inp-preview]");
if(inpPreview){
    const imgPreview = document.querySelector("[img-preview]");
    inpPreview.addEventListener("change",() =>{
        const [file] = inpPreview.files;
        if(file){
            imgPreview.src = URL.createObjectURL(file);
            imgPreview.classList.remove("d-none")
        }
    })
}
//preview img 
const btnLogout = document.querySelector("[btn-logout]");
if(btnLogout){
    btnLogout.addEventListener("click",() =>{
        const isConfirm = confirm("Bạn có muốn đăng xuất tài khoản này không");
        if(!isConfirm){
            return;
        }
    })
}

