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
          <div class="">
             <h2 class="card-title">Shoes!</h2>
             <p>If a dog chews shoes whose shoes does he choose?</p>
             <div class="card-actions">
              <button class="btn btn-primary">Buy Now</button>
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