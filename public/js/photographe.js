let url = new URL(window.location.href);
let photographeId = url.searchParams.get("id");
let likesTotal = 0;

const photographeInfo = document.querySelector(".photographeInfo");
const photographiesListe = document.querySelector(".photographies__liste");
const photographeLikes = document.getElementById("likes");
const photographePrix = document.getElementById("prix");


////Information sur le photographe
function mainInfo() {
    fetch('FishEyeData.json')
        .then(res => res.json())
        .then(data => {
            data.photographers.forEach(photographe => {
                if (photographe.id == photographeId) {
                    insertionInfo(photographe);
                }
            });
        })
}

mainInfo();

function insertionInfo(data) {
    let presentationPhotographe = `
            <div class="photographeInfo__div">
            <div class="photographeInfo__divContact">
                <h1 class="photographeInfo__nom">${data.name} </h1>
                <button class="photographeInfo__button" aria-label="Contact Me"
                    id="contactButton">Contactez-moi</button>
            </div>
            <div>
                <p class="photographeInfo__localisation">${data.city}, ${data.country}</p>
                <p class="photographeInfo__catchLine">${data.tagline}</p>
                <ul class="photographeInfo__tagList">`
    data.tags.forEach(tag => {
        presentationPhotographe += `<li tabindex="0"><span aria-label="Trier les photographies via le tag ${tag}">#${tag}</span>
                    </li>`;
    });
    presentationPhotographe += `
                </ul>
                </div>
            </div>
            <figure class="photographeInfo__figure">
                <img class="photographeInfo__img" src="public/img/Photographers ID Photos/${data.portrait}" alt="">
            </figure>`;
    photographeInfo.innerHTML = presentationPhotographe;
    photographePrix.innerHTML = `<p>${data.price}€ / jour</p>`
}

////Photographies et vidéo du photographe

function mainPhotographies() {
    fetch('FishEyeData.json')
        .then(res => res.json())
        .then(data => {
            data.media.forEach(photographie => {
                if (photographie.photographerId == photographeId) {
                    insertionPhotographies(photographie);
                }
            });
        })
}

function insertionPhotographies(data) {
    let figure = document.createElement('figure');
    let media = `
                        <div class="photographies__card">`;
    if (typeof data.image !== "undefined") {
        media += `<img class="photographies__img" src="public/img/${data.photographerId}/${data.image}"
                                        alt="Lilac breasted roller, closeup view">`
    } else {
        media += `<video controls class="photographies__img">
                                            <source src="public/img/${data.photographerId}/${data.video}" type="video/mp4">
                                        </video>`
    };
    media += `<div class="photographies__legende">
                                <figcaption>${data.title}</figcaption>
                                <div class="photographies__likes">
                                    <p>${data.likes}</p>
                                    <i aria-label="likes" class="fas fa-heart photographies__likes--inactive"></i>
                                    <i aria-label="likes" class="far fa-heart"></i>
                                </div>
                            </div>
                        </div>
                    `
    figure.innerHTML = media;
    photographiesListe.appendChild(figure).className = "photographies__figure";
    likesTotal += data.likes;
    photographeLikes.innerHTML = `<p>${likesTotal}</p>`
}

mainPhotographies();


//// Modal Contact 

// Elements du DOM
const modalButton = document.getElementById("contactButton");
const modalButtonMobile = document.querySelector(".asideButton");
const modalBackground = document.querySelector(".backgroundModal");
const modalCroix = document.querySelector(".modalContact__croix");
const submitButton = document.querySelector(".modalContact__buttonSubmit");
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");

//evenement ouverture modal
modalButton.addEventListener('click', ouvertureModal);
modalButtonMobile.addEventListener('click', ouvertureModal);

//evenement fermeture modal via click sur la croix
modalCroix.addEventListener('click', fermetureModal);

//evenement fermeture modal via bouton échap
document.addEventListener('keydown', echapKey);

//evenement validation 
submitButton.addEventListener('click', validation);

//ouverture de la modal
function ouvertureModal() {
    modalBackground.style.display = "block";
}

//fermeture de la modal 
function fermetureModal() {
    modalBackground.style.display = "none"
}

function echapKey(e) {
    if (e.code == "Escape") {
        modalBackground.style.display = "none";
    }
}

//validation du formulaire
function validation(e) {
    modalBackground.style.display = "none";
    e.preventDefault();
    const valeurPrenom = prenom.value;
    const valeurNom = nom.value;
    const valeurEmail = email.value;
    const valeurMessage = message.value;
    console.log("Prénom:" + valeurPrenom + "  Nom:" + valeurNom + "  Email:" + valeurEmail + "  Message:" + valeurMessage);
}