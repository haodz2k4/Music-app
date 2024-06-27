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