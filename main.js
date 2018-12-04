let cityName = document.querySelector(`#city-name`),
    day = document.querySelector(`#day`),
        drink = document.querySelector(`#drink`),
            high = document.querySelector(`#high`),
                low = document.querySelector(`#low`),
                    form = document.querySelector(`#city-selector`),
                        description = document.querySelector(`#description`),
                            moreInfoBtn = document.querySelector(`#more-info-btn`),
                                btn = document.querySelector(`#next-day-btn`),
                                    home = document.querySelector(`#home`),
                                        landingPage = document.querySelector(`#landing-page`),
                                            multipleResults = document.querySelector(`#multiple-results`),
                                                data = ``;
                                                    i = 0,
                                                        city = '';

form.addEventListener(`submit`, function(event) {
    event.preventDefault();
    i = 0;
    landingPage.style.display = `none`;
    city = document.querySelector(`input[type=text]`).value.toLowerCase();
    let url = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(5) where text='${city}')and u='c'&format=json`;
    axios.get(url)
    .then(function (response) {
        data = response.data.query.results.channel;
        if (response.data.query.count > 1) {
            selectFromMultiple(data);
        } else {
            loadWeather();
        };
    })
    .catch(function (error) {
      console.log(`Whoops`);
      console.log(error);
      alert(`No match found - check spelling`);
      landingPage.style.display = `flex`;
      document.querySelector(`input[type=text]`).value = ``;
    })
});

btn.addEventListener(`click`, function(event) {
    if (i < data.length-1) {
        i += 1;
    } else {
        i = 0;
    };
    changeBackground();
    setData();
});

moreInfoBtn.addEventListener(`click`, function() {
    moreInfoDisplay();
}); 

document.querySelector(`#reenter`).addEventListener(`click`, function() {
    home.style.display = `none`;
    landingPage.style.display = `flex`;
    document.querySelector(`input[type=text]`).value = ``;
    moreInfoDisplay();
    document.querySelector(`#possible-selections`).innerHTML = ``;
});


function selectFromMultiple() {
    document.querySelector(`#multiple-results`).style.display = `flex`;
    document.querySelector(`#multiple-results`).className = `justify-content-center`;
    
    // .style.display = `justify-content-center`;
    let j = 0;
    for (let result of data) {
        document.querySelector(`#possible-selections`).innerHTML += `      
        <tr class="table-body" onclick="loadWeather(${j})">
        <td>${result.location.city}</td>
        <td>${result.location.region}</td>
        <td>${result.location.country}</td>
        </tr>`;
        j += 1;
    };
}

function loadWeather(j) {
    data = data[j].item.forecast;
    document.querySelector(`#multiple-results`).style.display = `none`;
    setData();
    changeBackground();
    home.style.display = `flex`;
    cityName.textContent = city[0].toUpperCase() + city.slice(1);
};

function moreInfoDisplay() {
    if (moreInfoBtn.style.display === `none`) {
        moreInfoBtn.style.display = `inline`;
        document.querySelector(`#more-info`).style.display = `none`;
    } else {
        moreInfoBtn.style.display = `none`;
        document.querySelector(`#more-info`).style.display = `inline`;
    }
};

function setData() {
    day.textContent = `${data[i].day}, ${data[i].date}`;
    high.textContent = data[i].high;
    low.textContent = data[i].low;
    description.textContent = data[i].text;
};

function changeBackground() {
    let average = (Number(data[i].high) + Number(data[i].low))/2;
    // Depending on the average temp, will depend on what to drink!
    if (average > 35) {
        home.style.backgroundImage = 'url("./static/images/cider.jpg")';
        drink.textContent = 'Cider!';
    } else if (average > 30) {
        home.style.backgroundImage = 'url("./static/images/rose.jpg")';
        drink.textContent = 'Rose!';
    } else if (average > 25) {
        home.style.backgroundImage = 'url("./static/images/beer.jpg")';
        drink.textContent = 'Beer!';
    } else if (average > 20) {
        home.style.backgroundImage = 'url("./static/images/white-wine.jpg")';
        drink.textContent = 'White Wine!';
    } else {
        home.style.backgroundImage = 'url("./static/images/red-wine.jpg")';
        drink.textContent = 'Red Wine!';
    };
};