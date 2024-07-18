const url = new URL(window.location.href);

//handle keyword
const formSearch = document.querySelector("[form-search]");
if(formSearch){ 
    formSearch.addEventListener("keydown",async () =>{ 
        const value = formSearch.querySelector("input").value;
        const response = await fetch(`${url.href}/suggestion?keyword=${value}`);
        const data = await response.json();
        const suggestion = document.querySelector(".suggestions-container ul");
        let songs = "";
        for(const item of data.songs){ 
            const li = document.createElement("li");
            li.classList.add("list-group-item");
            li.setAttribute("id",item._id)
            li.innerHTML = `
                <img src=${item.avatar} alt="Avatar" class="avatar img-suggestion">
                <span class="product-name">${item.title}</span>
            `
            songs += li.outerHTML
        }
        suggestion.innerHTML = songs;

        //enter suggestion 
        const listSuggestion = document.querySelectorAll(".list-group-item");
        if(listSuggestion.length > 0){
            for(const item of listSuggestion){
                item.addEventListener("click",() =>{
                   const id = item.getAttribute("id");
                   window.location.href = `${url.href}/detail/${id}`
                })
            }
        }

        //end enter suggestion
        
    })
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
//enter suggestion 
const listSuggestion = document.querySelectorAll(".list-group-item");
if(listSuggestion.length > 0){
    listSuggestion.forEach((item),() =>{
        item.addEventListener("click",() =>{
            const inp = formSearch.querySelector("input"); 
            const title = item.querySelector("span").innerHTML;
            inp.value = title;

            formSearch.submit();
        })
    })
}

//end enter suggestion
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
const changeMulti = document.querySelector("select[name='change-multi']");
if (changeMulti) {
    changeMulti.addEventListener("change", async () => {
        const type = changeMulti.value;
        const checkMulti = document.querySelectorAll("input[name='ids']:checked"); 
        const ids = []; 
        if(checkMulti.length < 1){
            alert("Vui lòng chọn 1 bản ghi");
            return;
        }

        for (const item of checkMulti) {
            const id = item.value; 
            item.checked = false 
            ids.push(id);
        }

        const action = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ids: ids })
        };

        const link = `${url.href}/change-multi/${type}`;
        
        try {
            const response = await fetch(link, action);
            
            const data = await response.json();
            if(response.status === 404){
                alert(data.message);
            }
            if(data.success || response.status === 404){
                alert("Thay đổi trạng thái thành công");
                changeMulti.querySelectorAll("option")[0].selected = true;
                for(const item of data.songs){
                    if(item.deleted){
                        const tr = document.querySelector(`[item-id="${item._id}"]`);
                        tr.classList.add("d-none")
                    }
                    const btnChangeStatus = document.querySelector(`[btn-change-status="${item._id}"]`);
                    btnChangeStatus.innerHTML = item.status;
                    if(item.status === "active"){ 
                        btnChangeStatus.classList.remove("text-bg-danger")
                        btnChangeStatus.classList.add("text-bg-success");
                    }else{
                        btnChangeStatus.classList.remove("text-bg-success")
                        btnChangeStatus.classList.add("text-bg-danger");
                    }

                }
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });
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
                alert("Cập nhật trạng thái thất bại: " + data.message)
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


// Area Chart Example
var ctx = document.getElementById('areaChart')?.getContext('2d');
if(ctx){
        var areaChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mar 1', 'Mar 3', 'Mar 5', 'Mar 7', 'Mar 9', 'Mar 11', 'Mar 13'],
            datasets: [{
                label: 'Example Dataset',
                data: [10000, 20000, 15000, 30000, 25000, 35000, 40000],
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                fill: true
            }]
        }
    });
}


// Bar Chart Example
var ctx2 = document.getElementById('barChart')?.getContext('2d');
if(ctx2){
    var barChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Example Dataset',
                data: [5000, 10000, 7500, 12000, 9000, 15000],
                backgroundColor: 'rgba(0, 123, 255, 1)',
                borderColor: 'rgba(0, 123, 255, 1)',
                fill: true
            }]
        }
    });
}

//statistis 
const selectStatistis = document.querySelector("[select-statistis]");
if(selectStatistis){
    selectStatistis.addEventListener("change",() =>{
        const value = selectStatistis.value;
        if(!value){
            return; 
        }
        const [statistis,date] = value.split("-");
        url.searchParams.set(statistis,date);

        window.location.href = url.href;
    })
}

//end statistis 

//pagination 
const btnPagination = document.querySelectorAll("[btn-pagination]");
if(btnPagination.length > 0){
    btnPagination.forEach((item) =>{
        item.addEventListener("click",() =>{
            const index = item.getAttribute("btn-pagination");
            url.searchParams.set("pages", index);

            window.location.href = url.href;
        })
    })
}

//end pagination 
//limit 
const selectLimit = document.querySelector("select[name='limit']");
if(selectLimit){
    selectLimit.addEventListener("change",() =>{
        const value = selectLimit.value;
        if(value){
            url.searchParams.set("limit",value);
        }else{
            url.searchParams.delete("limit");
        }
        window.location.href = url.href
    })
}

//end limit 
//btn restore 
const btnRestore = document.querySelectorAll("[btn-restore]");
console.log(btnRestore)
if(btnRestore.length > 0){
    btnRestore.forEach( (item) =>{
        item.addEventListener("click", async () =>{ 
            const isConfrim = confirm("Bạn có muốn khôi phục sản phẩm này không");
            if(!isConfrim){
                return;
            }
            const id = item.getAttribute("btn-restore"); 
            const path = `${url.href}/restores/${id}`;
            console.log(path)
            const action = {
                method: "PATCH"
            }

            const response = await fetch(path, action);
            const data = await response.json();
            if(response.status === 404){
                alert(data.message);
                return;
            }
            if(data.success){
                item.closest("tr").classList.add("d-none");
            }

        })
    })
}
//end btn restore 