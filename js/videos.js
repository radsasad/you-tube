const getTime = (time) =>{
    const hour = parseInt(time / 3600)
    let remainingSecond = time % 3600 ;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} h ${minute} m ${remainingSecond} s ago`
    
}

const loadCategory = async () => {
    const url = "https://openapi.programming-hero.com/api/phero-tube/categories";
    const res = await fetch(url);
    const data = await res.json()
    displayCategories(data.categories)
}
const loadVideos = async () => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/videos`;
    const res = await fetch(url)
    const data = await res.json()
    displayVideos(data.videos)
}

const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container');
    videos.forEach((video) => {
        console.log(video)
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
                ${
                    video.authors[0].verified == true?  `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=63262&format=png" alt="" srcset="" />`: ""
                }
                
               </div>
               <p class="text-gray-500 font-semibold text-sm text-left"> ${video.others.views} views ${video.others.posted_date?.length == 0? '': `<span>${getTime(video.others.posted_date)}</span>`} </p>
               <button class="bg-zinc-100 px-3 mt-1 font-semibold rounded-lg hover:bg-zinc-300  text-lime-600 ">play Now</button>
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
        <button class="btn" type="button">${item.category}</button>
       `
        categoryItems.append(div)
    });
}
loadCategory()
loadVideos()