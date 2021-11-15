let filtreTag;
// liste de filtre
const portrait = document.getElementById("filtrePortrait");
const art = document.getElementById("filtreArt");
const fashion = document.getElementById("filtreFashion");
const architecture = document.getElementById("filtreArchitecture");
const travel = document.getElementById("filtreTravel");
const sport = document.getElementById("filtreSport");
const animals = document.getElementById("filtreAnimals");
const events = document.getElementById("filtreEvents");

//évenement filtre
portrait.addEventListener('click', () => {
    tri("portrait");
});
art.addEventListener('click', () => {
    tri("art");
});
fashion.addEventListener('click', () => {
    tri("fashion");
});
travel.addEventListener('click', () => {
    tri("travel");
});
sport.addEventListener('click', () => {
    tri("sport");
});
animals.addEventListener('click', () => {
    tri("animals");
});
events.addEventListener('click', () => {
    tri("events");
});
architecture.addEventListener('click', () => {
    tri("architecture");
});

function tri(e) {
    filtreTag = e;
    listePhotographes.innerHTML = "";
    getPhotographers();
}


// function main() {
//     fetch('FishEyeData.json')
//         .then(res => res.json())
//         .then(data => {
//             data.photographers.forEach(photographe => {
//                 if (typeof filtreTag !== 'undefined') {
//                     let listeTags = photographe.tags;
//                     dataFilter = listeTags.filter(a => a == filtreTag)
//                     if (dataFilter.length == 0) {

//                     } else {
//                         insertionDonnees(photographe);
//                     }
//                 } else {
//                     insertionDonnees(photographe);
//                 }
//             });
//         })
// }

// function insertionDonnees(data) {
//     let article = document.createElement('article');

//     let photographeInfo =
//         `
//                 <a class="photographe lienCard" href="photographe.html?id=${data.id}" aria-label="Aller sur la page de ${data.name}
//                  basé à ${data.city}, ${data.country} sont tarif journalier est de ${data.price} euro par jour.
//                   Ses spécialité sont ${data.tags} et sa devise ${data.tagline}">
//                     <figure class="photographe__figure">
//                         <img class="photographe__img" src="public/img/Photographers ID Photos/${data.portrait}"
//                             alt="Photographie de profil de ${data.alt}">
//                         <figcaption class="photographe__figcaption">${data.name}</figcaption>
//                     </figure>
//                 <p class="photographe__localisation">${data.city}, ${data.country}</p>
//                 <p class="photographe__catchLine">${data.tagline}</p>
//                 <p class="photographe__tarif">${data.price}€/jour</p>
//                 <ul class="photographe__tagList">`;
//     data.tags.forEach(tag => {
//         photographeInfo += `<li class="photographe__tag"><span aria-label="${tag}">#${tag}</span></li>`;
//     });
//     photographeInfo += `</ul></a>`;
//     article.innerHTML = photographeInfo;
//     listePhotographes.appendChild(article);
// }

// main();


////test base de code 

async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const photographers = [
        fetch('FishEyeData.json')
            .then(res => res.json())
            .then(data => {
                data.photographers.forEach(photographe => {
                    if (typeof filtreTag !== 'undefined') {
                        let listeTags = photographe.tags;
                        dataFilter = listeTags.filter(a => a == filtreTag)
                        if (dataFilter.length == 0) {

                        } else {
                            displayData(photographers)
                        }
                    } else {
                        displayData(photographers)
                    }
                });
            })];
    return ({
        photographers: [...photographers, ...photographers, ...photographers]
    })
    // et bien retourner le tableau photographers seulement une fois
}

async function displayData(photographers) {
    const listePhotographes = document.getElementById("listePhotographes");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        listePhotographes.appendChild(userCardDOM);
    });
};

// async function init() {
//     // Récupère les datas des photographes
//     const { photographers } = await getPhotographers();
//     displayData(photographers);
// };

getPhotographers();


////
// détection et activation de l'élément lienContenu au scroll de la page
const skipScroll = document.querySelector(".lienContenu")
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        skipScroll.classList.add('lienContenu--scroll');
    } else {
        skipScroll.classList.remove('lienContenu--scroll');
    }
});