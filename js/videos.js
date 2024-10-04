const getTime = (time) => {
    const hour = parseInt(time / 3600)
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} h ${minute} m ${remainingSecond} s ago`

}
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn')
    for (let btn of buttons) {
        btn.classList.remove('active')
    }
}
const loadDetails = async (videoId) => {
    console.log(videoId)
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    const data = await res.json()
    displayDetails (data.video) 
}
const loadCategory = async () => {
    const url = "https://openapi.programming-hero.com/api/phero-tube/categories";
    const res = await fetch(url);
    const data = await res.json()
    displayCategories(data.categories)
}
const loadVideos = async (searchText = "") => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`;
    const res = await fetch(url)
    const data = await res.json()
    displayVideos(data.videos)
}

const loadCategoriesVideos = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add('active')
            displayVideos(data.category)
        })
        .catch(error => console.log(error))


}

const displayDetails = (video) =>{
    const detailsContainer = document.getElementById('modal-container')
    detailsContainer.innerHTML =`
        <img class="w-full" src=${video.thumbnail} alt="" srcset="" />
        <p>${video.description}</p>
    
    `
    document.getElementById('customModal').showModal() 
}
const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container');
    videosContainer.innerHTML = "";
    if (videos.length == 0) {
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML = `
     <div class="h-98 mt-10 flex flex-col gap-10 justify-center items-center">
      <img src="assets/icon.png" alt="" srcset="" />
      <h1 class="text-xl">no video is available now!!!!!!!</h1>
     </div>
    `;
        return;
    } else {
        videosContainer.classList.add('grid')
    }

    videos.forEach((video) => {

        const card = document.createElement('div');
        card.innerHTML = `
            
         <figure class="">
           <img class="h-[160px] w-full rounded-md object-cover" src=${video.thumbnail}  alt="Shoes" class="rounded-xl" />
          </figure>
          <div class="flex justify-start gap-2 py-3">
             <div>
              <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} alt="" srcset="" />
             </div>
             <div>
               <h2 class="text-base font-semibold text-gray-600">${video.title}</h2>
               <div class="flex  items-center gap-2">
                <p class="text-gray-500 font-bold text-xs text-left">${video.authors[0].profile_name}</p>
                ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=63262&format=png" alt="" srcset="" />` : ""
            }
                
               </div>
               <p class="text-gray-500 font-semibold text-sm text-left"> ${video.others.views} views ${video.others.posted_date?.length == 0 ? '' : `<span>${getTime(video.others.posted_date)}</span>`} </p>
               <button  onclick="loadDetails('${video.video_id}')" class="bg-zinc-100 px-3 mt-1 font-semibold rounded-lg hover:bg-zinc-300  text-amber-950 ">play Now</button>
             </div>             
         </div>
        </div>

        `
        videosContainer.append(card)
    })
}


const displayCategories = (categories) => {
    const categoryItems = document.getElementById('category-items');
    categories.forEach((item) => {
        // console.log(item)
        const div = document.createElement('div')
        div.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class="btn category-btn" type="button">${item.category}</button>
       `
        categoryItems.append(div)
    });
}
document.getElementById('search-input').addEventListener('keyup', (event) => {
    loadVideos(event.target.value) 
})
loadCategory()
loadVideos()