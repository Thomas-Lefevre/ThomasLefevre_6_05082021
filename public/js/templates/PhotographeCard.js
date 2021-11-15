class photographeCard {
    constructor(photographe) {
        this._photographe = photographe;
    }

    createPhotographeCard() {
        const article = document.createElement('article');

        const photographeCard = `
                <a class="photographe lienCard" href="photographe.html?id=${this._photographe.id}" aria-label="Aller sur la page de ${this._photographe.name}
                basé à ${this._photographe.city}, ${this._photographe.country} sont tarif journalier est de ${this._photographe.price} euro par jour.
                Ses spécialité sont ${this._photographe.tags} et sa devise ${this._photographe.tagline}">
                <figure class="photographe__figure">
                    <img class="photographe__img" src="public/img/Photographers ID Photos/${this._photographe.portrait}"
                        alt="Photographie de profil de ${this._photographe.alt}">
                    <figcaption class="photographe__figcaption">${this._photographe.name}</figcaption>
                </figure>
            <p class="photographe__localisation">${this._photographe.city}, ${this._photographe.country}</p>
            <p class="photographe__catchLine">${this._photographe.tagline}</p>
            <p class="photographe__tarif">${this._photographe.price}€/jour</p>
            <ul class="photographe__tagList">${this._tags.map(tag => `<li class="photographe__tag"><span aria-label="${tag}">#${tag}</span></li>`).join('')}</ul>
            </a>
        `;
        article.innerHTML=photographeCard;
        return article;
    }

}