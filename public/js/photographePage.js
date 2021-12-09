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

////Information sur le photographe
// function mainInfo() {
//     fetch('FishEyeData.json')
//         .then(res => res.json())
//         .then(data => {
//             data.photographers.forEach(photographe => {
//                 if (photographe.id == photographeId) {
//                     insertionInfo(photographe);
//                 }
//             });
//             data.media.forEach(photographie => {
//                 if (photographie.photographerId == photographeId) {
//                     insertionPhotographies(photographie);
//                 }
//             });
//             // ajout fonction evenement 
//         })
// }


async function getInfoPhotographers() {
    photographiesListe.innerHTML = "";
    // Penser à remplacer par les données récupérées dans le json
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
            };
            data.media.forEach(photographie => {
                if (photographie.photographerId == photographeId) {
                    // displayMedia(photographie);
                    if (filtreTag !== 'all') {
                        let listeTags = photographie.tags;
                        dataFilter = listeTags.filter(filtre => filtre == filtreTag)
                        if (dataFilter.length == 0) {

                        } else {
                            displayMedia(photographie);
                        }
                    } else {
                        displayMedia(photographie);
                    }
                }
            });
            likeDislike();
            Lightbox.init()
        })
};

async function displayInfo(photographe) {
    const photographerModel = photographerFactory(photographe);
    photographerModel.getUserInfoDOM();
};

async function displayMedia(photographie) {
    const MediaModel = mediaFactory(photographie);
    MediaModel.getMediaCardDOM();
};

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

//// Lightbox 
class Lightbox {
    static init() {
        const gallerySection = document.querySelector(".photographies__liste");
        const links = Array.from(gallerySection.querySelectorAll('img[src$=".jpg"],source[src$=".mp4"]'));
        const gallery = links.map((link) => link.getAttribute("src"));
        links.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                new Lightbox(e.currentTarget.getAttribute("src"), gallery);
            });
            link.addEventListener("keyup", (e) => {
                if (e.code === Enter) {
                    e.preventDefault();
                    new Lightbox(e.currentTarget.getAttribute("src"), gallery);
                }
            });
        });
    }

    constructor(url, gallery, alt) {
        console.log(alt);
		this.element = this.buildDOM(url, alt);
		this.gallery = gallery;
		this.loadMedia(url, alt, gallery);
		this.onKeyUp = this.onKeyUp.bind(this);
		document.body.appendChild(this.element);
		document.addEventListener("keyup", this.onKeyUp);
	}


    loadMedia(url, alt) {
		this.url = url;
		this.alt = alt;
        // console.log(alt);
		if (url.endsWith(".mp4")) {
			const video = document.createElement("video");
			const container = this.element.querySelector(".lightbox__contenu__figure");
			const legend = document.createElement("figcaption");
			legend.innerHTML += this.getFormatedTitle(url);
            legend.classList.add("lightbox__contenu__figcaption");
			container.innerHTML = "";
			container.appendChild(video);
			container.appendChild(legend);
			video.setAttribute("controls");
			video.src = url;
		} else if (url.endsWith(".jpg")) {
			const image = new Image();
			const container = this.element.querySelector(".lightbox__contenu__figure");
			const legend = document.createElement("figcaption");
            legend.classList.add("lightbox__contenu__figcaption");
			legend.innerHTML += this.url;
			container.innerHTML = "";
			container.appendChild(image);
			container.appendChild(legend);
			image.alt = this.getFormatedTitle(url);
			image.src = this.url;
			image.classList.add("lightbox__contenu__media");
		}
	}

    getFormatedTitle(path) {
		const splitedPath = path.split("/");
		const string = splitedPath[splitedPath.length - 1].split(".")[0];
		const formatedTitle = string.replaceAll("_", " ");
		return formatedTitle;
	}

    onKeyUp(e) {
		if (e.key === "Escape") {
			this.close(e);
		} else if (e.key === "ArrowRight") {
			this.next(e);
		} else if (e.key === "ArrowLeft") {
			this.previous(e);
		}
	}

    close(e) {
		e.preventDefault();
		this.element.classList.add("lightbox__fadeOut");
		window.setTimeout(() => {
			this.element.parentElement.removeChild(this.element);
		}, 500);
		document.removeEventListener("keyup", this.onKeyUp);
	}

    next(e) {
		e.preventDefault();
		let i = this.gallery.findIndex((image) => image === this.url);
		if (i === this.gallery.length - 1) {
			i = -1;
		}
		this.loadMedia(this.gallery[i + 1]);
	}

    previous(e) {
		e.preventDefault();
		let i = this.gallery.findIndex((image) => image === this.url);
		if (i === 0) {
			i = this.gallery.length;
		}
		this.loadMedia(this.gallery[i - 1]);
	}

    buildDOM() {
		const dom = document.createElement("div");
		dom.classList.add("lightbox");
		dom.innerHTML = `<div class="lightbox__contenu">
                     <a class="lightbox__contenu__fleche prev"><i class="fas fa-chevron-left"></i></a>
                     <figure class="lightbox__contenu__figure">
                     </figure>
                 <button class="lightbox__contenu__croix"><i class="fas fa-times"></i></button>
                 <a class="lightbox__contenu__fleche next"><i class="fas fa-chevron-right"></i></a>
             </div>`;
		dom.querySelector(".lightbox__contenu__croix").addEventListener("click", this.close.bind(this));
		dom.querySelector(".next").addEventListener("click", this.next.bind(this));
		dom.querySelector(".prev").addEventListener("click", this.previous.bind(this));
		return dom;
	}
}

// function insertionInfo(data) {
//     let presentationPhotographe = `
//             <div class="photographeInfo__div">
//             <div class="photographeInfo__divContact">
//                 <h1 class="photographeInfo__nom">${data.name} </h1>
//                 <button class="photographeInfo__button" aria-label="Contact Me"
//                     id="contactButton">Contactez-moi</button>
//             </div>
//             <div>
//                 <p class="photographeInfo__localisation">${data.city}, ${data.country}</p>
//                 <p class="photographeInfo__catchLine">${data.tagline}</p>
//                 <ul class="photographeInfo__tagList">`
//     data.tags.forEach(tag => {
//         presentationPhotographe += `<li tabindex="0"><span aria-label="Trier les photographies via le tag ${tag}">#${tag}</span>
//                     </li>`;
//     });
//     presentationPhotographe += `
//                 </ul>
//                 </div>
//             </div>
//             <figure class="photographeInfo__figure">
//                 <img class="photographeInfo__img" src="public/img/Photographers ID Photos/${data.portrait}" alt="">
//             </figure>`;
//     photographeInfo.innerHTML = presentationPhotographe;
//     photographePrix.innerHTML = `<p>${data.price}€ / jour</p>`
// }

////Photographies et vidéo du photographe

// function insertionPhotographies(data) {
//     let figure = document.createElement('figure');
//     let media = `
//                         <div class="photographies__card">`;
//     if (typeof data.image !== "undefined") {
//         media += `<img class="photographies__img" src="public/img/${data.photographerId}/${data.image}"
//                                         alt="Lilac breasted roller, closeup view">`
//     } else {
//         media += `<video controls class="photographies__img">
//                                             <source src="public/img/${data.photographerId}/${data.video}" type="video/mp4">
//                                         </video>`
//     };
//     media += `<div class="photographies__legende">
//                                 <figcaption>${data.title}</figcaption>
//                                 <div class="photographies__likes">
//                                     <p>${data.likes}</p>
//                                     <i aria-label="likes" class="fas fa-heart photographies__likes--inactive"></i>
//                                     <i aria-label="likes" class="far fa-heart"></i>
//                                 </div>
//                             </div>
//                         </div>
//                     `
//     figure.innerHTML = media;
//     photographiesListe.appendChild(figure).className = "photographies__figure";
//     likesTotal += data.likes;
//     photographeLikes.innerHTML = `<p>${likesTotal}</p>`
// }

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
