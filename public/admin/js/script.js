const url = new URL(window.location.href);
const prefixAdmin = "admin";
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
const table = document.querySelector("table");
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
            const url = `/${prefixAdmin}/songs/deleted/${id}`;
            const response = await fetch(url, option);
            const data = await response.json();
            if(data.success){
                alert("Xóa sản phẩm thành công");
                const tr = item.closest("tr");
                tr.classList.add("d-none")
            }

        })
    })
    
}