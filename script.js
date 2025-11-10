let qs = x => document.querySelector(x);
let qsa = x => document.querySelectorAll(x);
let bookData = []

function loadJson() {
    return fetch('data.json')
        .then(res => res.json())
        .then(data => {
            bookData = data;
        })
        .catch(err => console.error('Błąd wczytywania JSON:', err));
}

function renderList(){
    let html =""
    let div = qs(".render")
    for(let x=0;x<bookData.length-1; x++){
        
        let book = bookData[x]
        let bookHtml = `
        <div class="book">
            <div class="main">
                <img src="${book.img}" alt="">
                <div class="info">
                    <h3>${book.name}</h3>
                    <div class="dane">
                        <span class="id">ISBN: ${book.isbn}</span>
                        <span class="id">ID: ${book.idOdrabiamy}</span>
                    </div>
                </div>
                <div class="icon">
                    <span class="icon glyphicon glyphicon-chevron-down"></span>
                </div>
            </div>
            <div class="drop hide">
                <select name="page" id="sel${x}"></select>
                <button class="copy" id="btc${x}">Kopiuj link</button>
                <button class="open" id="bto${x}">Otwórz w discordzie</button>
            </div>
         </div>
        `
     html+=bookHtml

    }
    console.log(html)
    div.innerHTML=html

  
}

function genSelect() {
    const selects = qsa("select");
    let options = "";
    for (let i = 0; i <= 400; i++) {
        options += `<option value="${i}">${i}</option>`;
    }
    for (let sel of selects) {
        sel.innerHTML = options;
    }
}

function dropMenu(){
    let dropIcon = document.querySelectorAll("span.icon")
    let dropDiv = document.querySelectorAll("div.drop")
    console.log(dropIcon)
    console.log(dropDiv)
    for(let i=0;i<dropIcon.length;i++){
        console.log(i)
        dropIcon[i].addEventListener("click", function(){
            console.log("kliknieto")
            dropDiv[i].classList.toggle("hide")
            dropIcon[i].classList.toggle("show")
        })
    }

}

function buttons(){
    let btnsCopy = qsa("button.copy");
    let btnsOpen = qsa("button.open");

    for(let btn of btnsCopy){
        btn.addEventListener("click", copyComm);
    }
    for(let btn of btnsOpen){
        btn.addEventListener("click", openDsc);
    }
}

function copyComm() {
    const i = this.id.slice(3); 
    const book = bookData[i].idOdrabiamy;
    const page = qs(`#sel${i}`).value;

    const command = `!page ${book} ${page}`;
    navigator.clipboard.writeText(command);
}

function openDsc() {
    copyComm.call(this);
    window.open("discord://discord.com/channels/1431198078370578488/1431198079499108362");
}

async function init(){
    await loadJson();
    renderList();
    genSelect()
    dropMenu()
    buttons();
}

init();