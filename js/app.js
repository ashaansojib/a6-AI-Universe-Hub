// load all data by api link
const loadAllData = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res => res.json())
    .then(data => displayCard(data.data))
}
// display api data with content card
const displayCard = data => {
    // console.log(data.tools)
    const container = document.getElementById("card-container");
    data.tools.forEach(singleTool => {
        console.log(singleTool)
        const features = singleTool.features;
        // console.log(features)
        const newContainer = document.createElement("div");
        newContainer.classList.add('col-lg-4', 'col-sm-12', 'col-md-6');
        newContainer.innerHTML = `
            <div class="card p-4">
                <img src="${singleTool.image}" width="full" height="200" class="card-img-top" alt="Image or banner not found!">
                <div class="card-body">
                    <h5 class="card-title">Features</h5>
                <ol>
                    <li>${features[0]}</li>
                    <li>${features[1]}</li>
                    <li>${features[2]}</li>
                </ol>
                </div>
                <hr>
                <div class="card-body d-flex align-items-center justify-content-between">
                    <div>
                        <h4>${singleTool.name}</h4>
                        <p><i class="fa-solid fa-calendar-days"></i> ${singleTool.published_in}</p>
                    </div>
                    <div>
                        <a href="#" class="card-link bg-primary text-white py-2 px-3 rounded" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(newContainer);
        
    })
}
loadAllData()