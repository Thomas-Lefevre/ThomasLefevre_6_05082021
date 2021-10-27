let url = new URL(window.location.href);
let photographeId = url.searchParams.get("id");

const photographiesListe = document.getElementsByClassName("photographies__liste");

function main(){
    fetch('FishEyeData.json')
                            .then(res=>res.json())
                            .then(data=>{
                                    data.media.forEach(photographie => {
                                        console.log(photographie);
                                        insertionDonnees(photographie);
                                    });
                                })
}

function insertionDonnees(data){
    let figure = document.createElement('figure');
    // console.log(data.photographerId);
}

main();


//// Modal Contact 

// Elements du DOM
const modalButton = document.getElementById("contactButton");
const modalButtonMobile = document.querySelector(".asideButton");
const modalBackground = document.querySelector(".backgroundModal");
const modalCroix = document.querySelector(".modalContact__croix");
const submitButton = document.querySelector(".modalContact__buttonSubmit");
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email= document.getElementById("email");
const message = document.getElementById("message");

//evenement ouverture modal
modalButton.addEventListener('click', ouvertureModal);
modalButtonMobile.addEventListener('click',ouvertureModal);

//evenement fermeture modal via click sur la croix
modalCroix.addEventListener('click',fermetureModal);

//evenement fermeture modal via bouton échap
document.addEventListener('keydown',echapKey);

//evenement validation 
submitButton.addEventListener('click', validation);

//ouverture de la modal
function ouvertureModal(){
    modalBackground.style.display= "block";
}

//fermeture de la modal 
function fermetureModal(){
    modalBackground.style.display="none"
}

function echapKey(e){
    if(e.code =="Escape"){
        modalBackground.style.display="none";
    }
}

//validation du formulaire
function validation(e){
    modalBackground.style.display="none";
    e.preventDefault();
    const valeurPrenom = prenom.value;
    const valeurNom = nom.value;
    const valeurEmail = email.value;
    const valeurMessage = message.value;
    console.log("Prénom:"+valeurPrenom+"  Nom:"+valeurNom+"  Email:"+valeurEmail+"  Message:"+valeurMessage);
}