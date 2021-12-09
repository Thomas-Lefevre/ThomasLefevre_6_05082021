function mediaFactory(data) {
    const { id, photographerId, title, image, video, tags, likes, date, price, alt } = data;

    function getMediaCardDOM() {
        let figure = document.createElement('figure');
        let media = `
                            <div class="photographies__card">`;
        if (typeof data.image !== "undefined") {
            media += `<img tabindex="5" class="photographies__img" src="public/img/${photographerId}/${image}"
                                            alt="${alt}, closeup view">`
        } else {
            media += `<video tabindex="5" controls class="photographies__img">
                                                <source src="public/img/${photographerId}/${video}" type="video/mp4">
                                            </video>`
        };
        media += `<div class="photographies__legende">
                                    <figcaption>${title}</figcaption>
                                    <div class="photographies__likes">
                                        <p>${likes}</p>
                                        <button class="photographies__likes__button photographies__likes--inactive" tabindex="5">
                                            <i aria-label="likes" class="fas fa-heart "></i>
                                        </button>
                                        <button class="photographies__likes__button photographies__likes--active" tabindex="5">
                                            <i aria-label="likes" class="far fa-heart "></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `
        figure.innerHTML = media;
        likesTotal += likes;
        photographiesListe.appendChild(figure).className = "photographies__figure";
        photographeLikes.innerHTML = `<p id="nbLikesTotal">${likesTotal}</p>`
        return (figure);
    }
    return { id, photographerId, title, image, video, tags, likes, date, price, alt, getMediaCardDOM }
}