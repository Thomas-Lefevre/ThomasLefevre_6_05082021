function mediaFactory(data) {
    const { title, image, price, date, id, photographerId, tags, likes, alt } = data;

    const picture = `assets/photographers/${image}`;

    function getMediaCardDOM() {
        let figure = document.createElement('figure');
        let media = `
                            <div class="photographies__card">`;
        if (typeof data.image !== "undefined") {
            media += `<img class="photographies__img" src="public/img/${photographerId}/${image}"
                                            alt="${alt}, closeup view">`
        } else {
            media += `<video controls class="photographies__img">
                                                <source src="public/img/${photographerId}/${video}" type="video/mp4">
                                            </video>`
        };
        media += `<div class="photographies__legende">
                                    <figcaption>${title}</figcaption>
                                    <div class="photographies__likes">
                                        <p>${likes}</p>
                                        <i aria-label="likes" class="fas fa-heart photographies__likes--inactive"></i>
                                        <i aria-label="likes" class="far fa-heart"></i>
                                    </div>
                                </div>
                            </div>
                        `
        figure.innerHTML = media;
        figure.className = "photographies_figure";
        return (figure);
    }
    return { title, image, price, date, id, photographerId, tags, likes, alt, getMediaCardDOM }
}