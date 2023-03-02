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
        // console.log(singleTool)
        const features = singleTool.features;
        // console.log(features)
        const newContainer = document.createElement("div");
        newContainer.classList.add('col-lg-4', 'col-sm-12', 'col-md-6');
        newContainer.innerHTML = `
            <div class="card p-4">
                <img src="${singleTool.image}" width="full" height="200" class="card-img-top" alt="Image or banner not found!">
                <div class="card-body p-0 pt-2">
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
                        <a href="#" onclick="loadDetails('${singleTool.id}')" class="card-link bg-primary text-white py-2 px-3 rounded" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(newContainer);
        
    });
}

// create modal details url
const loadDetails = id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}

// display details on modal
const displayDetails = details =>{
    console.log(details.input_output_examples)
    // declare pricing
    const price = details.pricing;

    // access features property from objects
    const features = details.features;
    // acces integrations property from array
    const integrations = details.integrations;

    const {description, image_link, accuracy, input_output_examples} = details;
    const modalContainer = document.getElementById('load-modal')
    modalContainer.innerHTML = `
    <div class="modal-body row">
        <div class="col-lg-6">
            <h4>${description}</h4>
            <div class="row text-center">
                <div class="col-4 text-success">
                    <p class="fw-bolder">${price[0].price} ${price[0].plan}</p>
                </div>
                <div class="col-4 text-warning">
                    <p class="fw-bolder">${price[1].price} ${price[1].plan}</p>
                </div>
                <div class="col-4 text-danger">
                    <p class="fw-bolder">${price[2].price} ${price[2].plan}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <h3>Features</h3>
                    <li>${features["1"].feature_name}</li>
                    <li>${features["2"].feature_name}</li>
                    <li>${features["3"].feature_name}</li>
                </div>
                <div class="col-6">
                    <h3>Integrations</h3>
                    <li>${integrations[0]}</li>
                    <li>${integrations[1]}</li>
                    <li>${integrations[2]}</li>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="card p-2">
                <img src="${image_link[0]}" class="card-img-top position-relative" alt="Images not found!!">
                <h3 class="position-absolute start-50 end-0 p-2 badge rounded-pill bg-danger">${accuracy.score}% accuracy</h3>
                <hr>
                <div class="card-body text-center">
                    <h2>${input_output_examples[0].input}</h2>
                    <p class="card-text">${input_output_examples[0].output}</p>
                </div>
            </div>
        </div>
    </div>
    `;
}
loadAllData()