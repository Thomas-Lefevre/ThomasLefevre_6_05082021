// liste de filtre
const portrait = document.getElementById("filtrePortrait");
const art = document.getElementById("filtreArt");
const fashion = document.getElementById("filtreFashion");
const architecture = document.getElementById("filtreArchitecture");
const travel = document.getElementById("filtreTravel");
const sport = document.getElementById("filtreSport");
const animals = document.getElementById("filtreAnimals");
const events = document.getElementById("filtreEvents");
let filtreTag = 'all';
//évenement filtre clique et Enter
portrait.addEventListener('click', () => {
    tagPortrait();
});
portrait.addEventListener('keydown', (e) => {
    if (e.code == "Enter") {
        tagPortrait();
    }
});

art.addEventListener('click', () => {
    tagArt();
});
art.addEventListener('keydown', (e) => {
    if (e.code == "Enter") {
        tagArt();
    }
});

fashion.addEventListener('click', () => {
    tagFashion();
});
fashion.addEventListener('keydown', (e) => {
    if (e.code == "Enter") {
        tagFashion();
    }
});

travel.addEventListener('click', () => {
    tagTravel();
});
travel.addEventListener('keydown', (e) => {
    if (e.code == "Enter") {
        tagTravel();
    }
});

sport.addEventListener('click', () => {
    tagSport();
});
sport.addEventListener('keydown', (e) => {
    if (e.code == "Enter") {
        tagSport();
    }
});

animals.addEventListener('click', () => {
    tagAnimals();
});
animals.addEventListener('keydown', (e) => {
    if (e.code == "Enter") {
        tagAnimals();
    }
});

events.addEventListener('click', () => {
    tagEvents();
});
events.addEventListener('keydown', (e) => {
    if (e.code == "Enter") {
        tagEvents();
    }
});

architecture.addEventListener('click', () => {
    tagArchitecture();
});
architecture.addEventListener('keydown', (e) => {
    if (e.code == "Enter") {
        tagArchitecture();
    }
});


function tagPortrait(){
    if(filtreTag === 'all'){
        triPhotographe("portrait");
    } else if(filtreTag==='portrait') {
        triPhotographe("all");
    } else {
        triPhotographe("portrait");
    }
}

function tagArt(){
    if(filtreTag === 'all'){
        triPhotographe("art");
    } else  if(filtreTag==='art'){
        triPhotographe("all");
    } else {
        triPhotographe("art");
    }
}

function tagFashion(){
    if(filtreTag === 'all'){
        triPhotographe("fashion");
    } else  if(filtreTag==='fashion'){
        triPhotographe("all");
    } else {
        triPhotographe("fashion");
    }
}

function tagTravel(){
    if(filtreTag === 'all'){
        triPhotographe("travel");
    } else  if(filtreTag==='travel'){
        triPhotographe("all");
    } else {
        triPhotographe("travel");
    }
}

function tagSport(){
    if(filtreTag === 'all'){
        triPhotographe("sport");
    } else  if(filtreTag==='sport'){
        triPhotographe("all");
    } else {
        triPhotographe("sport");
    }
}

function tagAnimals(){
    if(filtreTag === 'all'){
        triPhotographe("animals");
    } else  if(filtreTag==='animals'){
        triPhotographe("all");
    } else {
        triPhotographe("animals");
    }
}

function tagEvents(){
    if(filtreTag === 'all'){
        triPhotographe("events");
    } else  if(filtreTag==='events'){
        triPhotographe("all");
    } else {
        triPhotographe("events");
    }
}

function tagArchitecture(){
    if(filtreTag === 'all'){
        triPhotographe("architecture");
    } else  if(filtreTag==='architecture'){
        triPhotographe("all");
    } else {
        triPhotographe("architecture");
    }
}

function triPhotographe(e) {
    filtreTag = e;
    listePhotographes.innerHTML = "";
    getPhotographers();
}

//recuperation des photographes
async function getPhotographers() {
    fetch('FishEyeData.json')
        .then(res => res.json())
        .then(data => {
            data.photographers.forEach(photographe => {
                if (filtreTag !== 'all') {
                    let listeTags = photographe.tags;
                    dataFilter = listeTags.filter(filtre => filtre == filtreTag)
                    if (dataFilter.length !== 0) {
                        displayData(photographe);
                    }
                } else {
                    displayData(photographe);
                }
            });
        });
}

//affichage des photographes
async function displayData(photographe) {
    const photographerModel = photographerFactory(photographe);
    const userCardDOM = photographerModel.getUserCardDOM();
    listePhotographes.appendChild(userCardDOM);
}

getPhotographers();

// détection et activation de l'élément lienContenu au scroll de la page
const skipScroll = document.querySelector(".lienContenu")
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        skipScroll.classList.add('lienContenu--scroll');
    } else {
        skipScroll.classList.remove('lienContenu--scroll');
    }
});