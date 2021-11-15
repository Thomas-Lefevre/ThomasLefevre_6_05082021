class Photographe {
    constructor(data) {
        this._id = data.id
        this._city = data.city
        this._country = data.country
        this._name = data.name
        this._picture = data.portrait
        this._price = data.price
        this._tagline = data.tagline
        this._tags = data.tags
    }

    get picture() {
        return `public/img/Photographers ID Photos/${this._picture}`
    }

    get city() {
        return `${this._city}`
    }

    get country(){
        return`${this._country}`
    }

    get name(){
        return`${this._name}`
    }

    get price(){
        return`${this._price}`
    }

    get tagline(){
        return`${this._tagline}`
    }

    get tags(){
        return`${this._tags}`
    }
    // get photographeCard() {
    //     return `
    //         <article>
    //                 <a class="photographe lienCard" href="photographe.html?id=${this._photographe.id}" aria-label="Aller sur la page de ${this._photographe.name}
    //                 basé à ${this._photographe.city}, ${this._photographe.country} sont tarif journalier est de ${this._photographe.price} euro par jour.
    //                 Ses spécialité sont ${this._photographe.tags} et sa devise ${this._photographe.tagline}">
    //                 <figure class="photographe__figure">
    //                     <img class="photographe__img" src="public/img/Photographers ID Photos/${this._photographe.portrait}"
    //                         alt="Photographie de profil de ${this._photographe.alt}">
    //                     <figcaption class="photographe__figcaption">${this._photographe.name}</figcaption>
    //                 </figure>
    //             <p class="photographe__localisation">${this._localisation}</p>
    //             <p class="photographe__catchLine">${this._photographe.tagline}</p>
    //             <p class="photographe__tarif">${this._photographe.price}€/jour</p>
    //             <ul class="photographe__tagList">${this._tags.map(tag => `<li class="photographe__tag"><span aria-label="${tag}">#${tag}</span></li>`).join('')}</ul>
    //             </a>
    //         </article>
    //         `
    // }

    // get photographeHeader() {
    //     return `
    //     <div class="photographeInfo__div">
    //     <div class="photographeInfo__divContact">
    //         <h1 class="photographeInfo__nom">${this._name} </h1>
    //         <button class="photographeInfo__button" aria-label="Contact Me"
    //             id="contactButton">Contactez-moi</button>
    //     </div>
    //     <div>
    //         <p class="photographeInfo__localisation">${this._localisation}</p>
    //         <p class="photographeInfo__catchLine">${this._tagline}</p>
    //         <ul class="photographeInfo__tagList">${this._tags.map(tag=>`<li tabindex="0"><span aria-label="Trier les photographies via le tag ${tag}">#${tag}</span></li>`).join('')}</ul>
    //     </div>
    //     <figure class="photographeInfo__figure">
    //     <img class="photographeInfo__img" src="public/img/Photographers ID Photos/${this._portrait}" alt="">
    //     </figure>
    //     `
    // }
}