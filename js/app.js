// load all data by api link
const loadAllData = dataLimit => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCard(data.data, dataLimit))
}
// display api data with content card
const displayCard = (data, dataLimit) => {
    //get features data by loop

    const container = document.getElementById("card-container");
    container.textContent = '';
    let tool = data.tools;
    // ----------------------------------------------------------
    const sortData = data => {
        const sortContainer = document.getElementById("sort-area");

        // Create a unique date
        const dates = new Set(data.map(item => item.published_in));

        // button for all separate date
        dates.forEach(date => {
            const button = document.createElement("button");
            button.classList.add("dropdown-item");
            button.textContent = date;

            button.addEventListener("click", () => {
                // find item by date with filtering
                const filteredData = data.filter(item => item.published_in === date);

                const cardContainer = document.getElementById("card-container");
                cardContainer.textContent = "";

                filteredData.forEach(item => {
                    const features = item.features;
                    const singleCard = document.createElement('div');
                    singleCard.classList.add('col-lg-4', 'col-sm-12', 'col-md-6');
                    singleCard.innerHTML = `
                <div class="card p-4">
                        <img src="${item.image}" width="full" height="200" class="card-img-top" alt="Image or banner not found!">
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
                                <h4>${item.name}</h4>
                                <p><i class="fa-solid fa-calendar-days"></i>${item.published_in}</p>
                            </div>
                            <div>
                                <a href="#" class="card-link bg-primary text-white py-2 px-3 rounded" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
              `;
                    //   append here child card
                    cardContainer.appendChild(singleCard)
                });
            });
            //   all card add to container
            sortContainer.appendChild(button);
        });
    };

    document.getElementById("sort-button").addEventListener("click", () => {
        const cardContainer = document.getElementById("card-container");
        cardContainer.innerHTML = "";
    });

    sortData(tool);

    // --------------------------------------------------------------------------------------
    // by default 6 card
    if (dataLimit && tool.length > 6) {
        tool = tool.slice(0, 6);
    }
    else {
        document.getElementById("show-btn").classList.add('d-none')
    }
    // all card
    tool.forEach(singleTool => {
        // console.log(features)
        const features = singleTool.features;
        const featureList = features.map(feature => `<li>${feature}</li>`).join('');

        const newContainer = document.createElement("div");
        newContainer.classList.add('col-lg-4', 'col-sm-12', 'col-md-6');
        newContainer.innerHTML = `
            <div class="card p-4">
                <img src="${singleTool.image}" width="full" height="200" class="card-img-top" alt="Image or banner not found!">
                <div class="card-body p-0 pt-2">
                    <h5 class="card-title">Features</h5>
                <ol id="feature-ol">
                    ${featureList}
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
        loadSpinner(false);
    });
}

// create modal details url
const loadDetails = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}

// display details on modal
const displayDetails = details => {
    console.log(details)
    // acces features
    const features = details.features;
    const featureList = Object.keys(features).map(key => `<li>${features[key].feature_name}</li>`).join('');
    // acces integrations
    const integrations = details.integrations?.map(integration => `<li>${integration}</li>`);
    // access accuracy
    const accuracy = details.accuracy.score;
    // access input output
    const package = details.pricing?.map(basic => `<p>${basic.plan}</p>`);
    const price = details.pricing?.map(price => `<p>${price.price}</p>`);
    // console.log(pricing)
    // modal details below
    const { description, image_link } = details;
    const modalContainer = document.getElementById('load-modal')
    modalContainer.innerHTML = `
    <div class="modal-body row">
        <div class="col-lg-6">
            <h4>${description}</h4>
            <div class="row text-center">
                <div class="col text-success">
                    <div class="d-flex justify-content-around">${package ? package : 'Free Of Cost'}</div>
                    <div class="d-flex justify-content-around">${price ? price : ''}</div>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <h3>Features</h3>
                    <ol>${featureList}</ol>
                </div>
                <div class="col-6">
                    <h3>Integrations</h3>
                    <ol>${integrations ? integrations : 'Empty Data'}</ol>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="card p-2">
                <img src="${image_link[0]}" class="card-img-top position-relative" alt="Images not found!!">
                <h3 class="position-absolute start-50 end-0 p-2 badge rounded-pill bg-danger">${accuracy ? `${accuracy}% accuracy` : ''}</h3>
                <hr>
                <div class="card-body text-center">
                    <h2>${details?.input_output_examples ? details?.input_output_examples[0]?.input : ''}</h2>
                    <div class="card-text">${details?.input_output_examples === null ? 'No! Not Yet! Take A Break' : details?.input_output_examples[0]?.output}</div>
                </div>
            </div>
        </div>
    </div>
    `;
}
// create spinner function
const loadSpinner = isLoading => {
    const spinnerContainer = document.getElementById("loader-area");
    if (isLoading) {
        spinnerContainer.classList.remove('d-none');
    }
    else {
        spinnerContainer.classList.add('d-none')
    }
}

document.getElementById('showBtn').addEventListener('click', function () {
    loadAllData();
});
loadAllData(6)