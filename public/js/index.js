const listePhotographes = document.getElementById("listePhotographes");

// liste de filtre
const portrait = document.getElementById("filtrePortrait");
const art = document.getElementById("filtreArt");
const fashion = document.getElementById("filtreFashion");
const architecture = document.getElementById("filtreArchitecture");
const travel = document.getElementById("filtreTravel");
const sport = document.getElementById("filtreSport");
const animals = document.getElementById("filtreAnimals");
const events = document.getElementById("filtreEvents");

let filtreTag = "art";

function main() {
    fetch('FishEyeData.json')
        .then(res => res.json())
        .then(data => {
            data.photographers.forEach(photographe => {
                insertionDonnees(photographe);
            });
        })
}

function insertionDonnees(data) {
    let article = document.createElement('article');

    //test filtre
    let listeTags = data.tags;
    dataFilter = listeTags.filter(a => a == filtreTag)
    console.log(dataFilter);
    //

    let photographeInfo =
        `
                <a class="photographe lienCard" href="photographe.html?id=${data.id}" aria-label="Aller sur la page de ${data.name}
                 basé à ${data.city}, ${data.country} sont tarif journalier est de ${data.price} euro par jour.
                  Ses spécialité sont ${data.tags} et sa devise ${data.tagline}">
                    <figure class="photographe__figure">
                        <img class="photographe__img" src="public/img/Photographers ID Photos/${data.portrait}"
                            alt="Photographie de profil de ${data.alt}">
                        <figcaption class="photographe__figcaption">${data.name}</figcaption>
                    </figure>
                <p class="photographe__localisation">${data.city}, ${data.country}</p>
                <p class="photographe__catchLine">${data.tagline}</p>
                <p class="photographe__tarif">${data.price}€/jour</p>
                <ul class="photographe__tagList">`;
    data.tags.forEach(tag => {
        photographeInfo += `<li class="photographe__tag"><span aria-label="${tag}">${tag}</span></li>`;
    });
    photographeInfo += `</ul></a>`;
    article.innerHTML = photographeInfo;
    listePhotographes.appendChild(article);
}

main();

// détection et activation de l'élément lienContenu au scroll de la page
const skipScroll = document.querySelector(".lienContenu")
window.addEventListener('scroll', ()=>{
    if(window.scrollY > 10){
        skipScroll.classList.add('lienContenu--scroll');
    } else {
        skipScroll.classList.remove('lienContenu--scroll');
    }
});