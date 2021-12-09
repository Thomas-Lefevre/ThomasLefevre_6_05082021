function photographerFactory(data) {
    const { name, id, city, country, tags, tagline, price, portrait, alt } = data;

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
        tags.forEach(tag => {
            photographeInfo += `<li class="photographe__tag"><span aria-label="${tag}">#${tag}</span></li>`;
        });
        photographeInfo += `</ul></a>`;
        article.innerHTML = photographeInfo;
        return (article);
    };

    function getUserInfoDOM() {
        let presentationPhotographe = `
        <div class="photographeInfo__div">
        <div class="photographeInfo__divContact">
            <h1 class="photographeInfo__nom">${name} </h1>
            <button class="photographeInfo__button" tabindex=3 aria-label="Contact Me"
                id="contactButton">Contactez-moi</button>
        </div>
        <div>
            <p class="photographeInfo__localisation">${city}, ${country}</p>
            <p class="photographeInfo__catchLine">${tagline}</p>
            <ul class="photographeInfo__tagList">`
        tags.forEach(tag => {
            presentationPhotographe += `<li tabindex="2" id="filtre${tag}"><span class="filtres" aria-label="Trier les photographies via le tag ${tag}">#${tag}</span>
                </li>`;
        });
        presentationPhotographe += `
            </ul>
            </div>
        </div>
        <figure class="photographeInfo__figure">
            <img class="photographeInfo__img" src="public/img/Photographers ID Photos/${portrait}" alt="Photographie de profil de ${name}">
        </figure>`;
        photographeInfo.innerHTML = presentationPhotographe;
        tags.forEach(tag => {
            document.getElementById("filtre" + tag).addEventListener('click', () => {
                if (filtreTag === 'all') {
                    filtrePhotographie(tag);
                } else if (filtreTag === tag) {
                    filtrePhotographie("all");
                } else {
                    filtrePhotographie(tag);
                }
            });
            document.getElementById("filtre" + tag).addEventListener('keydown', (e) => {
                if(e.code == "Enter"){
                    if (filtreTag === 'all') {
                        filtrePhotographie(tag);
                    } else if (filtreTag === tag) {
                        filtrePhotographie("all");
                    } else {
                        filtrePhotographie(tag);
                    }    
                }
            });
        });
        photographePrix.innerHTML = `<p tabindex="7" aria-label="Tarif du photographe de ${price} par jour">${price}€ / jour</p>`
    }

    return { name, picture, city, country, id, price, tags, tagline, alt, getUserCardDOM, getUserInfoDOM }
}