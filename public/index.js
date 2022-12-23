// Your code here
const initPage = () => {
    // create and initialize page items.
    // this can (and should) be broken down into sections

    // generate and add background

    // create containers
    containers();

    // make draw new card button
    drawCardButton();

    // generate catstacard
    generateCard();
}

const containers = () => {
    // new card button container
    const drawCardContainer = document.createElement('div');
    drawCardContainer.id = 'draw-card-button-container';
    drawCardContainer.style.display = 'flex';
    drawCardContainer.style.justifyContent = 'center';
    drawCardContainer.style.marginTop = '100px';
    drawCardContainer.style.marginBottom = '50px';

    // card container, container wit the card in it
    const cardContainer = document.createElement('div');
    cardContainer.id = 'card-container';
    cardContainer.style.display = 'flex';
    cardContainer.style.justifyContent = 'center'
    // temporary, until there is content above the image
    // or maybe not temporary idk we will see

    document.body.appendChild(drawCardContainer);
    document.body.appendChild(cardContainer);
}

const drawCardButton = () => {
    const container = document.querySelector('#draw-card-button-container');

    const drawNewCard = document.createElement('button');
    drawNewCard.id = "draw-card-button";
    drawNewCard.innerText = "Draw new Catstacard"

    container.appendChild(drawNewCard);
}

const generateCard = () => {
    // make card base
    cardBase();

    // after base, build card from top down
    // add top items
    cardHeader();

    // add image to card
    cardImage();
}

const cardHeader = () => {
    const header = document.createElement('div');
    header.id = "card-header";
    header.style.height = "40px";
    header.style.width = "100%";
    header.style.display = "flex";
    header.style.flexDirection = "row";
    header.style.alignItems = "center";

    const leftHeaderItem = document.createElement('div');
    leftHeaderItem.id = "left-header-item";
    leftHeaderItem.style.width = "65px";

    const title = document.createElement('span');
    title.id = "card-title";
    title.innerText = "Catstacard";
    title.style.fontFamily = "Arial";
    title.style.fontWeight = "bold";
    title.style.fontSize = "20pt";
    title.style.transform = "scale(0.8, 1)"
    // header.style.backgroundColor = 'yellow' // debug line, comment out

    header.append(leftHeaderItem, title);
    document.querySelector("#bg2").appendChild(header);
}

const fetchCat = async () => {
    let img;
    let ratioCheck = false;

    while(!ratioCheck) {
        img = await fetch('https://api.thecatapi.com/v1/images/search')
              .then(res => res.json())
              .then(data => [data[0].url, data[0].height, data[0].width])
        // console.log(img);
        if (img[1] <= img[2]) {
            // acceptable aspect ratio
            ratioCheck = true;
        }
    }

    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    localStorage.setItem('cardColor', "#" + randomColor);
    localStorage.setItem('cat', img[0]);
}

const cardImage = async () => {
    // const url = (localStorage.getItem('cat')? localStorage.getItem('cat') : await fetchCat());

    // comment this back when you implement generating a new cat button
    if (!localStorage.getItem('cat')) {
        await fetchCat();
    }
    const url = localStorage.getItem('cat');

    const image = document.createElement('img');
    image.id = "cat-image";
    image.src = url;
    image.style.height = "230px";
    image.style.width = "360px";
    // image.style.position = "relative";
    // image.style.top = "40px";
    image.style.border = "#f0f0f0 4px solid"
    image.style.boxShadow = "1px 1px 2px rgba(0,0,0,0.5)"

    document.querySelector("#bg2").appendChild(image);

    // some favorite cats:
    /*
        https://cdn2.thecatapi.com/images/4dm.gif
    */
}

const updateImg = async () => {
    await fetchCat();
    document.querySelector("#bg2").style.backgroundColor = localStorage.getItem('cardColor');
    document.querySelector('#cat-image').src = localStorage.getItem('cat');
}

const cardBase = () => {
    // yellow border
    const bg1 = document.createElement('div');
    bg1.id = "bg1";
    bg1.style.width = "430px";
    bg1.style.height = "600px";
    bg1.style.backgroundColor = "yellow";
    // bg1.style.boxSizing = "border-box";
    bg1.style.borderRadius = "20px";
    bg1.style.boxShadow = "5px 10px 20px rgba(0,0,0,0.4)";

    // card primary bg
    const bg2 = document.createElement('div');
    bg2.id = "bg2";
    bg2.style.width = "400px";
    bg2.style.height = "570px";
    // bg2.style.boxSizing = "border-box";
    if (!localStorage.getItem('cardColor')) {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        localStorage.setItem('cardColor', "#" + randomColor);
    }
    // console.log(localStorage.getItem('cardColor'));
    bg2.style.backgroundColor = localStorage.getItem('cardColor');
    bg2.style.borderRadius = "10px";
    bg2.style.position = "relative";
    bg2.style.top = "15px";
    bg2.style.left = "15px";
    bg2.style.display = "flex";
    bg2.style.alignItems = "center";
    bg2.style.flexDirection = "column";

    //append
    bg1.appendChild(bg2);
    document.querySelector('#card-container').appendChild(bg1);
}

window.onload = async () => {
    // console.log('hello world');
    initPage();

    // event listeners
    document.querySelector('#draw-card-button').addEventListener("click", updateImg);
}
