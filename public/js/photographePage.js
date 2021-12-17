let url = new URL(window.location.href);
let photographeId = url.searchParams.get("id");
let filtreTag = 'all';
let likesTotal = 0;
let valeurTrie = document.querySelector(".trier__select");
valeurTrie.onchange = function () { getInfoPhotographers() };

const photographeInfo = document.querySelector(".photographeInfo");
const photographiesListe = document.querySelector(".photographies__liste");
const photographeLikes = document.getElementById("likes");
const photographePrix = document.getElementById("prix");

function filtrePhotographie(e) {
    filtreTag = e;
    photographiesListe.innerHTML = "";
    getInfoPhotographers();
}

async function getInfoPhotographers() {
    photographiesListe.innerHTML = "";
    fetch('FishEyeData.json')
        .then(res => res.json())
        .then(data => {
            data.photographers.forEach(photographe => {
                if (photographe.id == photographeId) {
                    displayInfo(photographe);
                    const modalButton = document.getElementById("contactButton");
                    modalButton.addEventListener('click', ouvertureModal);
                }
            });
            switch (valeurTrie.value) {
                case "popularite":
                    data.media.sort((a, b) => {
                        return b.likes - a.likes;
                    });
                    break;
                case "date":
                    data.media.sort((a, b) => {
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;
                case "titre":
                    data.media.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                default:
                    data.media.sort((a, b) => {
                        return b.likes - a.likes;
                    });
                    break;
            }
            data.media.forEach(photographie => {
                if (photographie.photographerId == photographeId) {
                    if (filtreTag !== 'all') {
                        let listeTags = photographie.tags;
                        dataFilter = listeTags.filter(filtre => filtre == filtreTag)
                        if (dataFilter.length !== 0) {
                            displayMedia(photographie);

                        }
                    } else {
                        displayMedia(photographie);
                    }
                }
            });
            likeDislike();
            Lightbox.init();
        })
}

async function displayInfo(photographe) {
    const photographerModel = photographerFactory(photographe);
    photographerModel.getUserInfoDOM();
}

async function displayMedia(photographie) {
    const MediaModel = mediaFactory(photographie);
    MediaModel.getMediaCardDOM();
}

getInfoPhotographers();

function likeDislike() {
    const likeActive = document.querySelectorAll("button.photographies__likes--active");
    const likeInactive = document.querySelectorAll("button.photographies__likes--inactive");
    likeActive.forEach(e => {
        e.addEventListener("click", function () {
            let nblike = e.parentElement.childNodes[1].textContent;
            nblike++;
            likesTotal++;
            e.parentElement.childNodes[1].textContent = nblike;
            photographeLikes.textContent = likesTotal;
            e.style.display = "none"
            e.parentElement.childNodes[3].style.display = "block";
        });
    });
    likeInactive.forEach(e => {
        e.addEventListener("click", function () {
            let nblike = e.parentElement.childNodes[1].textContent;
            nblike--;
            likesTotal--;
            e.parentElement.childNodes[1].textContent = nblike;
            photographeLikes.textContent = likesTotal;
            e.style.display = "none"
            e.parentElement.childNodes[5].style.display = "block";
        })
    })
}


//// Modal Contact 

// Elements du DOM
const modalButtonMobile = document.querySelector(".asideButton");
const modalBackground = document.querySelector(".backgroundModal");
const modalCroix = document.querySelector(".modalContact__croix");
const submitButton = document.querySelector(".modalContact__buttonSubmit");
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");

//evenement ouverture modal
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
