function photographerFactory(data) {
    const { name, portrait, city, country, id, price, tags, tagline, alt } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        let article = document.createElement('article');

        let photographeInfo =
            `
                <a class="photographe lienCard" href="photographe.html?id=${id}" aria-label="Aller sur la page de ${name}
                 basé à ${city}, ${country} sont tarif journalier est de ${price} euro par jour.
                  Ses spécialité sont ${tags} et sa devise ${tagline}">
                    <figure class="photographe__figure">
                        <img class="photographe__img" src="public/img/Photographers ID Photos/${portrait}"
                            alt="Photographie de profil de ${alt}">
                        <figcaption class="photographe__figcaption">${name}</figcaption>
                    </figure>
                <p class="photographe__localisation">${city}, ${country}</p>
                <p class="photographe__catchLine">${tagline}</p>
                <p class="photographe__tarif">${price}€/jour</p>
                <ul class="photographe__tagList">`;
        // tags.forEach(tag => {
        //     photographeInfo += `<li class="photographe__tag"><span aria-label="${tag}">#${tag}</span></li>`;
        // });
        photographeInfo += `</ul></a>`;
        article.innerHTML = photographeInfo;
        return (article);
    };

    function getUserInfoDOM() {
        let div = document.createElement('div');
        let presentationPhotographe = `
        <div class="photographeInfo__div">
        <div class="photographeInfo__divContact">
            <h1 class="photographeInfo__nom">${name} </h1>
            <button class="photographeInfo__button" aria-label="Contact Me"
                id="contactButton">Contactez-moi</button>
        </div>
        <div>
            <p class="photographeInfo__localisation">${city}, ${country}</p>
            <p class="photographeInfo__catchLine">${tagline}</p>
            <ul class="photographeInfo__tagList">`
        // tags.forEach(tag => {
        //     presentationPhotographe += `<li tabindex="0"><span aria-label="Trier les photographies via le tag ${tag}">#${tag}</span>
        //         </li>`;
        // });
        presentationPhotographe += `
            </ul>
            </div>
        </div>
        <figure class="photographeInfo__figure">
            <img class="photographeInfo__img" src="public/img/Photographers ID Photos/${portrait}" alt="">
        </figure>`;
        div.innerHTML = presentationPhotographe;
        photographePrix.innerHTML = `<p>${price}€ / jour</p>`
        return(div);
    }

    return { name, picture, city, country, id, price, tags, tagline, alt, getUserCardDOM , getUserInfoDOM}
}