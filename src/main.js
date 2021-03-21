import gallery from './gallery-items.js';

const ref = {
    galleryRef: document.querySelector('.js-gallery'),
    modalRef: document.querySelector('.js-lightbox'),
    overlayRef: document.querySelector('.lightbox__overlay'),
    origImgRef: document.querySelector('.lightbox__image'),
    btnRef: document.querySelector('button[data-action="close-lightbox"]')
}


const {galleryRef, modalRef, overlayRef, origImgRef, btnRef} = ref;


galleryRef.addEventListener('click', handkerModalOpen)
overlayRef.addEventListener('click', handlerBackdropModalClose)
origImgRef.addEventListener('click', handlerChangeClick)
btnRef.addEventListener('click', handlerModalClose)



let index = -1;

function creareEl ({preview, original, description }) {
    const liEl = document.createElement('li');
    liEl.classList.add('gallery__item');

    const link = document.createElement('a');
    link.classList.add('gallery__link');
    link.href = original;

    const imgRef = document.createElement('img');
    imgRef.classList.add('gallery__image');
    imgRef.src = preview;
    imgRef.alt = description;
    imgRef.setAttribute('data-source', original);
    imgRef.setAttribute('data-index', index += 1);

    link.appendChild(imgRef);
    liEl.appendChild(link);

    return liEl;
}

function handlerNewEl (images) {
    return images.map(creareEl);
}

function handlerRenderEl (newEl) {
    galleryRef.append(...newEl)
}

handlerRenderEl(handlerNewEl(gallery))


// MODAL
function handkerModalOpen (event) {
event.preventDefault();
window.addEventListener('keydown', handlerPressKeys);

const {target} = event;
const {dataset} = target;

if (target.nodeName !== 'IMG') {
    return
}

const sourceImg = dataset.source;
const indexCount = dataset.index;

modalRef.classList.add('is-open');
origImgRef.src = sourceImg;
origImgRef.alt = target.alt;
origImgRef.setAttribute('data-index', indexCount)
};

function handlerModalClose() {
    modalRef.classList.remove('is-open');
    origImgRef.src = '';
    origImgRef.alt = '';
    window.removeEventListener('keydown', handlerPressKeys)
};

function handlerBackdropModalClose ({target, currentTarget}) {
if (target === currentTarget) {
    handlerModalClose();
}
}

function handlerChangeClick ({ target }) {
    const { dataset } = target;
    const currentIndexImg = Number(dataset.index)

    if (currentIndexImg + 1 === gallery.length) {
        target.src = gallery[0].original;
        target.alt = gallery[0].description;
        dataset.index = 0;
        return
    }

        target.src = gallery[currentIndexImg + 1].original;
        target.alt = gallery[currentIndexImg + 1].description;
        dataset.index = currentIndexImg + 1;

        console.log(this.target);
}


function handlerPressKeys (event) {
    if (event.code === 'Escape') {
        handlerModalClose();
    }

    const { dataset } = origImgRef;
    const index = Number(dataset.index);

    if(event.code === 'ArrowRight') {
        if (index + 1 === gallery.length) {
            origImgRef.src = gallery[0].original;
            origImgRef.alt = gallery[0].description;
            dataset.index = 0;
            return
        }

        origImgRef.src = gallery[index + 1].original;
        origImgRef.alt = gallery[index + 1].description;
        dataset.index = index + 1;
    }

    if (event.code === 'ArrowLeft') {
        if (index - 1 < 0) {
            origImgRef.src = gallery[8].original;
            origImgRef.alt = gallery[8].description;
            dataset.index = 8;
            return
        }

        origImgRef.src = gallery[index - 1].original;
        origImgRef.alt = gallery[index - 1].description;
        dataset.index = index - 1;
    }
}

