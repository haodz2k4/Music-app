const btnLike = document.querySelector("[btn-like]");

const getToken = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}
const Domain = 'http://localhost:3000'
if (btnLike) {
    btnLike.addEventListener("click", async () => {
        const status = btnLike.getAttribute("like-status");
        if(status === "notLogin"){
            alert("Vui lòng đăng nhập để Like bài viết");
            return;
        }
        const id = btnLike.getAttribute("btn-like");
        const url = `${Domain}/songs/like/${status}/${id}`;       
        const token = getToken('userToken'); 

        if (!token) {
            console.error('Token not found');
            return;
        }

        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        
        if (response.status === 200) {
            console.log('Successfully liked the song');
        } else {
            console.error('Failed to like the song');
        }
        const data = await response.json();
        if(data.status === "unLiked"){
            btnLike.setAttribute("like-status","liked");
            btnLike.classList.add("active");    
        }else{
            btnLike.setAttribute("like-status","unLiked");
            btnLike.classList.remove("active");
        }
        btnLike.innerHTML = " " + data.like;
        
    });
}
const alertError = document.querySelector(".alert");
const alertSucess = document.querySelector(".alert-success");
if(alertError){
    setTimeout(() =>{
        alertError.classList.add("d-none")
    }, 3000)
}
if(alertSucess){
    setTimeout(() =>{
        alertSucess.classList.add("d-none")
    }, 3000)
}
// favorite
const btnFavorite = document.querySelector("[btn-favorite]");
if(btnFavorite){
    btnFavorite.addEventListener("click", async () => {
        try {
            const id = btnFavorite.getAttribute("btn-favorite");
            const status = btnFavorite.getAttribute("favorite-status");
            if(status === "notLogin"){
                alert("Vui lòng đăng nhập để thêm vào danh sách yêu thích");
                return;
            }
            const url = `${Domain}/songs/favorite/${status}/${id}`;
            const option = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${getToken('userToken')}`,
                    'Content-Type': 'application/json' 
                }
            };
            const response = await fetch(url, option);
            const data = await response.json();

            
            if (response.ok) { 
                alert(data.message);
                btnFavorite.classList.toggle("favorite-active")
            } else {
                alert(`Error: ${data.message}`);
                
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing your request.');
        }
    });
    
}
//end favorite  
//comment 
const formComment = document.querySelector("[form-comment]");
if(formComment){
    formComment.addEventListener("submit",async (e) =>{
        e.preventDefault();
        const textArea = formComment.querySelector("textarea");
        const id = formComment.getAttribute("form-comment");
        const updateUrl = `${Domain}/songs/comments/add/${id}`;
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken('userToken')}` 
            },
            body: JSON.stringify({
                content: textArea.value 
            })
        };
        try {
            const response = await fetch(updateUrl, option);
            const data = await response.json();
            console.log(data);
            if(response.status === 200){
                alert(data.message);
                
                const infoComment = document.querySelector("[info-user]").getAttribute("info-user");
                let [fullName,createdAt] = infoComment.split("-");
                const commentList = document.querySelector(".comment-list");
                const div = document.createElement("div");
                div.classList.add("comment", "d-flex");
                div.innerHTML = `   
                        <div class="avatar mr-3">
                        <img src="https://via.placeholder.com/50" alt="User Avatar">
                        </div>
                        <div class="comment-body">
                        <h5 class="mb-1">${fullName}</h5>
                        <p class="mb-1">${textArea.value}</p>
                        <div class="comment-info">${createdAt}</div>
                        <div class="comment-actions mt-2" style='margin-right: 5px'>
                            <button class="btn btn-sm btn-primary btn-edit mr-2">Edit</button>
                            <button class="btn btn-sm btn-danger btn-delete">Delete</button>
                        </div>
                        </div>
                `
                commentList.prepend(div);
                textArea.value= "";

            }else{
                alert(data.message)
            }
        } catch (error) {
            console.log(error);
            alert("Lỗi không xác định") 
        }
    })
}

//end comment  
//suggestion
const inpSearch = document.querySelector("[inp-search]");
if (inpSearch) {
    inpSearch.addEventListener("keyup", async () => {
        const suggestions = document.querySelector("#suggestions");
        const value = inpSearch.value;
        const updateUrl = `${Domain}/search/suggestion?keyword=${value}`;
        if (value === "") {
            suggestions.innerHTML = "";
            return;
        }
        const response = await fetch(updateUrl);
        const data = await response.json();
        if (response.status !== 200) {
            alert("Lỗi " + data.message);
            return;
        }

        if (data.songs.length > 0) {
            const newList = data.songs.map(item => `
                <div class="suggestion-item">
                    <img src="${item.avatar}" alt="Artist 1">
                    <span>${item.title}</span>
                </div>
            `).join("");
            suggestions.innerHTML = newList;
        }
    });

    // Event Delegation cho phần tử cha
    document.querySelector("#suggestions").addEventListener("click", (event) => {
        const item = event.target.closest(".suggestion-item");
        if (item) {
            const content = item.querySelector("span").innerHTML;
            inpSearch.value = content;
            const form = inpSearch.closest("form");
            form.submit();
        }
    });
}


//listening statistics
const audioSong = document.querySelector("[audio-song]");
if(audioSong){
    const id = audioSong.getAttribute("audio-song")
    const updateUrl = `${Domain}/songs/listens/${id}`;
    audioSong.addEventListener("ended", async () =>{
        const option = {
            method: "PATCH"
        }
        const response = await fetch(updateUrl,option);
        if(response.ok){
            const listeningStaitics = document.querySelector("[listening-statistics]");
            const data = await response.json(); 
            listeningStaitics.innerHTML = ` ${data.listens}`
            
        }
    })

}

//end listening statistics
//limit
////song 
const limitSong = document.querySelector("[limit-songs]");
if(limitSong){
    const url = new URL(window.location.href);
    const isExists = url.searchParams.get("limit-songs");
    let songLimit = 8;
    if(isExists){
       songLimit = parseInt(isExists) + 4
    }
    limitSong.addEventListener("click",() =>{
        url.searchParams.set("limit-songs",songLimit);

        window.location.href = url.href;
    })
}
////end song 
////topics
const limitTopics = document.querySelector("[limit-topics]");
if(limitTopics){
    const url = new URL(window.location.href);
    const isExists = url.searchParams.get("limit-topics");
    let limitTopic = 8;
    if(isExists){
        limitTopic = parseInt(isExists) + 4
    }
    limitTopics.addEventListener("click",() =>{
        url.searchParams.set("limit-topics",limitTopic);

        window.location.href = url.href;
    })
}
////end topics
////singers
const limitSinger = document.querySelector("[limit-singers]")
if(limitSinger){
    const url = new URL(window.location.href);
    let limit = 8;
    const isExists = url.searchParams.get("limit-singers");
    if(isExists){
        limit = parseInt(isExists) + 4;
    }
    limitSinger.addEventListener("click",() =>{
        url.searchParams.set("limit-singers",limit);
        window.location.href = url.href
    })
}

////end singers
//end limit     