const onInput=event=> {
    event.target.value = event.target.value.replace(/[^0-9+A-Z+a-z+_+.+à-ù+<+>+,+'+ +-]/g, '')
} 

window.onload=function() {
    if (document.querySelectorAll("#name").length==1) {
        document.getElementById("name").textContent=localStorage.getItem("username");
    }
}

function errorControl() {
    if (document.getElementById("name-form").children[1].value==="") {
        alert("Perfavore inserisci un nickname da utilizzzare");
        return
    }

    localStorage.setItem("username", document.getElementById("name-form").children[1].value);
    document.getElementById("username").value="";
    window.location.href="game.html"; 
    document.getElementById("name").textContent=localStorage.getItem("username");
}

function changeNickname(){
    window.location.href="index.html";
}

// Array nazioni
let i=0;
let rightFlags=[];
let answerFlags=[];
let corrette=0;
let corretteCls=0;
let sbagliate=0;
let setTitle=0;
let boxes2;
let box2;
let hints;
let hintsInput;
const europeanCountries = ["Italia","Francia","Germania","Spagna", "Portogallo", "Grecia", "Regno Unito", "Paesi Bassi", "Svizzera", "Austria"];
const asianCountries = ["Cina","Giappone", "Corea del Nord", "Corea del Sud", "Mongolia", "Vietnam", "Kazakistan", "Pakistan", "Russia", "India"];
const northAmericanCountries = ["Groenlandia","Guatemala","Cuba","Bahamas", "Giamaica", "Messico", "Costa Rica", "Panama", "USA", "Canada"];
const southAmericanCountries = ["Colombia","Bolivia","Ecuador","Cile", "Perù", "Venezuela", "Uruguay", "Paraguay", "Argentina", "Brasile"];
const africanCountries = ["Congo","Libia","Marocco","Egitto", "Mozambico", "Ciad", "Etiopia", "Sud Africa", "Nigeria", "Ghana"];
const oceanianCountries = ["Vanuatu","Niue","Guam","Samoa", "Isole Marshall", "Isole Salomone", "Figi", "Papua Nuova Guinea", "Nuova Zelanda", "Australia"];

const classicCountries = ["Italia", "Francia", "Germania", "Spagna", "Brasile", "Grecia", "Regno Unito", "USA", "Russia", "Cina","Argentina", "Giappone", "India", "Messico", "Canada", "Australia", "Norvegia", "Egitto", "Sud Africa", "Nuova Zelanda"];

const indizi1=["Questo paese è famoso per la sua cucina, tra cui pizza e pasta",
               "È noto per la Torre Eiffel e la sua cucina raffinata",
               "Questo paese è famoso per la birra e l'Oktoberfest",
               "È noto per la \"Tomatina\", una festa in cui si lanciano pomodori",
               "Questo paese ospita il Carnevale di Rio",
               "È la culla della democrazia e della filosofia occidentale",
               "Questo paese è noto per la famiglia reale e il Big Ben",
               "È famoso per Hollywood e la Statua della Libertà",
               "È il paese più grande del mondo per superficie",
               "È noto per la Grande Muraglia e la cucina dim sum",
               "Questo paese è famoso per il tango e il calcio",
               "È noto per il sushi e i samurai",
               "Questo paese è famoso per il Taj Mahal e Bollywood",
               "È noto per i mariachi e il Día de los Muertos",
               "Questo paese ospita le famose Cascate del Niagara e la città di Toronto",
               "È la patria di animali unici come canguri e koala, e ospita la Grande Barriera Corallina",
               "Questo paese è famoso per i suoi fiordi spettacolari",
               "È la culla di una delle civiltà più antiche del mondo, famosa per le sue piramidi e la Sfinge",
               "È noto per la sua straordinaria biodiversità e per ospitare il Parco Nazionale Kruger,",
               "Questo paese è composto principalmente da due grandi isole: l'Isola del Nord e l'Isola del Sud"
];
const indizi2=["La sua capitale ospita il Colosseo e il Vaticano",
               "La sua capitale è spesso chiamata \"la città dell'amore\"",
               "La sua capitale è Berlino",
               "La sua capitale è Madrid",
               "È famoso per il calcio e la samba",
               "La sua capitale è Atene",
               "La sua capitale è Londra",
               "La sua capitale è Washington, D.C.",
               "La sua capitale è Mosca",
               "La sua capitale è Pechino",
               "La sua capitale è Buenos Aires",
               "La sua capitale è Tokyo",
               "La sua capitale è Nuova Delhi",
               "La sua capitale è Città del Messico",
               "È la seconda nazione al mondo per estensione del territorio",
               "Ospita la famosa città Sidney",
               "La sua capitale è Oslo",
               "Il fiume Nilo attraversa questo paese da sud a nord",
               "Si trova all'estremità meridionale del continente africano",
               "Si trova a Sud-Est dell'Australia"
];

function setI() {
    i=0;
}

function get4randomNumbers() {
    const numbers = [];

    for (let j = 0; j < 4; j++) {
        const num = Math.floor(Math.random() * 4);
        if (!numbers.includes(num)) {
            numbers.push(num);
        } else {
            j--;
        }
    }
    return numbers;
}

function hide(){
    document.querySelectorAll(".nations-container").forEach(element => {
        element.style.display="none";
    });
    document.querySelectorAll(".classic-container").forEach(element => {
        element.style.display="none";
    });
    document.querySelectorAll(".flag-container").forEach(element => {
        element.style.display="none";
    });
}

function saveAnswers(selectedFlag,box) {
    let a=selectedFlag.getAttribute("src").split("/");
    a=a[a.length-1].split(".");
    answerFlags.push(a[0]);
    rightFlags.push(box.textContent);
}
function saveAnswers2(selectedFlag,box) {
    let a=box.querySelector("img").getAttribute("src").split("/");
    a=a[a.length-1].split(".");
    answerFlags.push(selectedFlag.textContent);
    rightFlags.push(a[0]);
}
function saveAnswers3(answer1,indexs,i,yourAnswer) {
    answerFlags.push(answer1[indexs[i]]);
    rightFlags.push(yourAnswer);
}

function addRows() {
    const table=document.getElementById("score-table");

    for(let i=0; i<answerFlags.length; i++) {
        table.querySelector("tbody").innerHTML+=`
                                    <tr>
                                        <td>${answerFlags[i]}</td>
                                        <td>Hai selezionato ${rightFlags[i]}</td>
                                    </tr>`;
    } 

}

function seeScore(){
    corrette=0;
    sbagliate=0;

    hide();

    addRows();

    answerFlags=[];
    rightFlags=[];

    document.getElementById("score-table").style.display="table";
    document.getElementById("lives-container").style.display="none";
    document.getElementById("see-score-button").style.display="none";
    document.getElementById("nick").style.top=0;
    document.getElementById("name").style.top=0;
}

// Funzione di Generazione Bandiere
function setFlags(indexs3,box,indexs,actualNations,boxes,numberOfCountries){
    document.getElementById("score").style.top=(window.innerHeight - document.querySelector(".nations-container").style.height) / 2 -230 + "px";
    document.getElementById("score").style.right=(window.innerWidth - document.querySelector(".nations-container").style.width) / 2 -380 + "px";
    console.log(document.getElementById("score").style.top);

    box.textContent=actualNations[indexs[setTitle]];
    
    // Idice per le Altre Bandiere
    indexs3=[];
    for(let k=0; k<4; k++) {
        let randomIndex=Math.floor(Math.random() * numberOfCountries);

        indexs3.push(randomIndex);
        for(let j=0; j<k; j++) {
            if(indexs3[j]===randomIndex) {
                k--;
                indexs3.pop();
                break;
            }
        }
    }

    // Indice per la Bandiera Giusta
    indexs2=get4randomNumbers();

    let p=0;
    boxes.forEach(box => {
        do{
            box.querySelector("img").setAttribute("src", `Img/Bandiere/${actualNations[indexs3[p]]}.png`);
        }while(actualNations[indexs3[p]]==box.textContent)
        p++;
    })

    let nonUguale=0;
    boxes.forEach(boxs => {
        if(boxs.querySelector("img").getAttribute("src")==`Img/Bandiere/${box.textContent}.png`) {
            console.log("Questa Bandera é Uguale");
        } else {
            nonUguale++
        }
    })
    if(nonUguale==boxes.length) {
        boxes[indexs2[0]].querySelector("img").setAttribute("src", `Img/Bandiere/${box.textContent}.png`);
        nonUguale=0;
    }
}

function setNations(indexs3,box,indexs,actualNations,boxes,numberOfCountries){ 
    document.getElementById("score2").style.top=(window.innerHeight - document.querySelector(".flag-container").style.height) / 2 -230 + "px";
    document.getElementById("score2").style.right=(window.innerWidth - document.querySelector(".flag-container").style.width) / 2 -380 + "px";

    boxes2=document.querySelectorAll(".boxf");
    box2=document.querySelector(".boxN");

    box2.querySelector("img").setAttribute("src",`Img/Bandiere/${actualNations[indexs[setTitle]]}.png`);
    
    // Idice per le Altre Bandiere
    indexs3=[];
    for(let k=0; k<4; k++) {
        let randomIndex=Math.floor(Math.random() * numberOfCountries);

        indexs3.push(randomIndex);
        for(let j=0; j<k; j++) {
            if(indexs3[j]===randomIndex) {
                k--;
                indexs3.pop();
                break;
            }
        }
    }

    // Indice per la Bandiera Giusta
    indexs2=get4randomNumbers();

   
    // 1. Costruiamo un Set di 4 indici unici diversi da quello corretto
    const distractors = new Set();
    while (distractors.size < 4) {
    const rnd = Math.floor(Math.random() * numberOfCountries);
    // escludi l’indice corretto
    if (rnd !== indexs[setTitle]) {
        distractors.add(rnd);
    }
    }
    // trasformiamo il Set in array
    const indexs4 = Array.from(distractors);

    // 2. Assegniamo a ciascun box il nome corrispondente
    boxes2.forEach((box, i) => {
    box.textContent = actualNations[indexs4[i]];
    }); 
    
    // boxes2.forEach(boxs => {
    //     do{
    //         let randomIndex = Math.floor(Math.random() * numberOfCountries);
    //         candidato = actualNations[randomIndex];
    //     }while(candidato==actualNations[indexs[setTitle]])
    //     d++;
    //     boxs.textContent=candidato;
    // })

    let nonUguale2=0;
    boxes2.forEach(boxs => {
    console.log(boxs.textContent)
    console.log(actualNations[indexs[setTitle]])
        if(boxs.textContent==actualNations[indexs[setTitle]]) {
            console.log("Questa Nazione é Uguale");
        } else {
            nonUguale2++
        }
    })
    if(nonUguale2==boxes.length) {
        boxes2[indexs2[0]].textContent=actualNations[indexs[setTitle]];
        nonUguale2=0;
    }
}

function setClassic(indexs){ 
    document.getElementById("score3").style.top=(window.innerHeight - document.querySelector(".nations-container").style.height) / 2 -220 + "px";
    document.getElementById("score3").style.right=(window.innerWidth - document.querySelector(".nations-container").style.width) / 2 -380 + "px";
    
    hints=document.querySelectorAll("#hint");
    hintsInput=document.querySelectorAll("#hints-answer")[1];
    sbagliate=setTitle;

    hints[0].textContent=indizi1[indexs[setTitle]];
    hints[1].textContent=indizi2[indexs[setTitle]];
}

// Funzioni di avvio
function setParameters(countries, numberOfCountries) {
    let boxes=document.querySelectorAll(".boxn");
    let actualNations=[];
    setTitle=0;

    // Vede Nazioni da Prendere
    switch (countries) {
        case "Europa":
            actualNations=europeanCountries;
            break;
        case "Asia":
            actualNations=asianCountries;
            break;
        case "NorthAmerica":
            actualNations=northAmericanCountries;
            break;
        case "SouthAmerica":
            actualNations=southAmericanCountries;
            break;
        case "Africa":
            actualNations=africanCountries;
            break;
        case "Oceania":
            actualNations=oceanianCountries;
            break;
        case "Classico":
            actualNations=classicCountries;
            break;
    }

    // Indice per Nazione da Indovinare
    let indexs=[];
    for(let k=0; k<numberOfCountries; k++) {
        const randomIndex=Math.floor(Math.random() * numberOfCountries);

        indexs.push(randomIndex);
        for(let j=0; j<k; j++) {
            if(indexs[j]===randomIndex) {
                k--;
                indexs.pop();
                break;
            }
        }
    }

    // Fa Vedere i Div che Servono
    switch(i) {
        case 1:
            giocoNazioni();
            console.log(actualNations);
            break;
        case 2:
            giocoBandiere();
            console.log(actualNations);
            break;
        case 0:
            modalitàClassica();
            console.log(actualNations);
            break;
    }
    
    let indexs3=[];
    const box=document.querySelector(".boxF");

    
    document.querySelectorAll(".boxn").forEach(element => {
        element.addEventListener("click", function(event) {
            const selectedFlag=event.target;
            const correctFlag=`Img/Bandiere/${box.textContent}.png`;

            if(selectedFlag.getAttribute("src")===correctFlag) {
                corrette++;
                console.log("Corrette: " + corrette);

                saveAnswers(selectedFlag,box);

                startGame(numberOfCountries,indexs3,box,indexs,actualNations,boxes);

            } else {
                sbagliate++;
                console.log("Sbagliate: " + sbagliate);

                saveAnswers(selectedFlag,box);
                alert("Hai selezionato la bandiera sbagliata!");

                if(sbagliate==3) {
                    document.querySelector("#life1").setAttribute("src", "Img/Cuore Vuoto.png")
                    sbagliate=0;
                    alert("O no, Hai perso! 😢");
                    corrette=0;
                    document.querySelector("#life1").setAttribute("src", "Img/Cuore Vuoto.png");
                    hide();

                    seeScore();
                    document.querySelector("#life1").setAttribute("src", "Img/Cuore Intero.png");
                    document.querySelector("#life2").setAttribute("src", "Img/Cuore Intero.png");
                    document.querySelector("#life3").setAttribute("src", "Img/Cuore Intero.png");
                }else if(sbagliate==1) {
                    document.querySelector("#life3").setAttribute("src", "Img/Cuore Vuoto.png");}
                else if(sbagliate==2) {
                    document.querySelector("#life2").setAttribute("src", "Img/Cuore Vuoto.png");
                }

            }
        })
    })
    
    document.querySelectorAll(".boxf").forEach(element => {
        element.addEventListener("click", function(event) {
            const selectedNation=event.target;
            const correctNation=box2.querySelector("img");


            if(`Img/Bandiere/${selectedNation.textContent}.png`===correctNation.getAttribute("src")) {
                corrette++;
                console.log("Corrette: " + corrette);

                saveAnswers2(selectedNation,box2);

                startGame(numberOfCountries,indexs3,box,indexs,actualNations,boxes);
            } else {
                sbagliate++;
                console.log("Sbagliate: " + sbagliate);

                
                saveAnswers2(selectedNation,box2);
                alert("Hai selezionato la nazione sbagliata!");
                if(sbagliate==3) {
                    document.querySelector("#life1").setAttribute("src", "Img/Cuore Vuoto.png")
                    sbagliate=0;
                    alert("O no, Hai perso! 😢");
                    corrette=0;
                    document.querySelector("#life1").setAttribute("src", "Img/Cuore Vuoto.png");
                    hide();

                    seeScore();
                    document.querySelector("#life1").setAttribute("src", "Img/Cuore Intero.png");
                    document.querySelector("#life2").setAttribute("src", "Img/Cuore Intero.png");
                    document.querySelector("#life3").setAttribute("src", "Img/Cuore Intero.png");
                }else if(sbagliate==1) {
                    document.querySelector("#life3").setAttribute("src", "Img/Cuore Vuoto.png");}
                else if(sbagliate==2) {
                    document.querySelector("#life2").setAttribute("src", "Img/Cuore Vuoto.png");
                }

            }
        })
    })

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            console.log(document.querySelectorAll("#hints-answer")[1].value)
            console.log(classicCountries[indexs[sbagliate]])

            if(document.querySelectorAll("#hints-answer")[1].value.toUpperCase()==classicCountries[indexs[sbagliate]].toUpperCase()){
                corretteCls++
                saveAnswers3(classicCountries,indexs,sbagliate,document.querySelectorAll("#hints-answer")[1].value);
                document.querySelectorAll("#hints-answer")[1].value="";

                startGame(numberOfCountries,indexs3,box,indexs,actualNations,boxes);
            }else if(classicCountries[indexs[sbagliate]].toUpperCase()=="USA"){
                if(document.querySelectorAll("#hints-answer")[1].value.toUpperCase()=="STATI UNITI" ||
                    document.querySelectorAll("#hints-answer")[1].value.toUpperCase()=="STATI UNITI D'AMERICA" ||
                    document.querySelectorAll("#hints-answer")[1].value.toUpperCase()=="AMERICA" ||
                    document.querySelectorAll("#hints-answer")[1].value.toUpperCase()=="U.S.A"){
                        corretteCls++
                        saveAnswers3(classicCountries,indexs,sbagliate,document.querySelectorAll("#hints-answer")[1].value);
                        document.querySelectorAll("#hints-answer")[1].value="";

                        startGame(numberOfCountries,indexs3,box,indexs,actualNations,boxes);
                    }

            }else if(classicCountries[indexs[sbagliate]].toUpperCase()=="REGNO UNITO"){
                if(document.querySelectorAll("#hints-answer")[1].value.toUpperCase()=="UK"){
                        corretteCls++
                        saveAnswers3(classicCountries,indexs,sbagliate,document.querySelectorAll("#hints-answer")[1].value);
                        document.querySelectorAll("#hints-answer")[1].value="";

                        startGame(numberOfCountries,indexs3,box,indexs,actualNations,boxes);
                    }

            }else{
                saveAnswers3(numberOfCountries,indexs,sbagliate,document.querySelectorAll("#hints-answer")[1].value);
            }
        }
    });


    console.log("Gioco Iniziato");
    startGame(numberOfCountries,indexs3,box,indexs,actualNations,boxes);
}

function startGame(numberOfCountries,indexs3,box,indexs,actualNations,boxes) {

    console.log("Corrette: " + corrette);
    console.log("Sbagliate: " + sbagliate);

    if(corrette==10) {
        alert("Complimenti, hai vinto! 🤑");

        document.getElementById("img").style.display="block";
        setTimeout(() => {
            document.getElementById("img").style.display="none";
        }, 3000);
        corrette=0;
        sbagliate=0;
        hide();

        seeScore();

        document.querySelector("#life1").setAttribute("src", "Img/Cuore Intero.png");
        document.querySelector("#life2").setAttribute("src", "Img/Cuore Intero.png");
        document.querySelector("#life3").setAttribute("src", "Img/Cuore Intero.png");
    }

    if(corretteCls==20) {
        alert("Complimenti, hai vinto! 🤑");

        document.getElementById("img").style.display="block";
        setTimeout(() => {
            document.getElementById("img").style.display="none";
        }, 3000);
        corretteCls=0;
        hide();

        seeScore();
    }

    switch(i) {
        case 1:
            setFlags(indexs3,box,indexs,actualNations,boxes,numberOfCountries);
            break;
        case 2:
            setNations(indexs3,box,indexs,actualNations,boxes,numberOfCountries);
            break;
        case 0:
            setClassic(indexs);
            break;
    }

    

    console.log(setTitle);
    document.querySelector("#score-now").textContent=setTitle;
    document.querySelector("#score-now2").textContent=setTitle;
    document.querySelector("#score-now3").textContent=setTitle;
    setTitle++;
}  

// Funzioni dopo scelta modalità
function modalitàContinenti(){
    i=1
console.log(i);
    document.querySelectorAll(".continents-container").forEach(element => {
        element.style.display="flex";
    });
    document.querySelector(".games-container").style.display="none";
    document.querySelector("#back-button").style.display="block";
}
function modalitàContinenti2(){
    i=2
console.log(i);
    document.querySelectorAll(".continents-container").forEach(element => {
        element.style.display="flex";
    });
    document.querySelector(".games-container").style.display="none";
    document.querySelector("#back-button").style.display="block";
}
function modalitàClassica(){
console.log(i);
    document.querySelector(".games-container").style.display="none";
    document.querySelectorAll(".classic-container").forEach(element => {
        element.style.display="flex";
    });
    document.querySelector("#back-button").style.display="block";
    document.querySelector("#see-score-button").style.display="block";
}

// Funzioni dopo scelta continente
function giocoBandiere(){
    document.querySelectorAll(".continents-container").forEach(element => {
        element.style.display="none";
    });
    document.querySelectorAll(".flag-container").forEach(element => {
        element.style.display="flex";
    });
    document.querySelector("#back-button").style.display="block";
    document.querySelector("#lives-container").style.display="flex";
    document.querySelector("#see-score-button").style.display="block";
}
function giocoNazioni(){
    document.querySelectorAll(".continents-container").forEach(element => {
        element.style.display="none";
    });
    document.querySelectorAll(".nations-container").forEach(element => {
        element.style.display="flex";
    });
    document.querySelector("#back-button").style.display="block";
    document.querySelector("#lives-container").style.display="flex";
    document.querySelector("#see-score-button").style.display="block";
}

// FUnzione per tornare indietro
function goBack(){
    corrette=0;
    sbagliate=0;
    setTitle=0;
    rightFlags=[];
    answerFlags=[];
    document.querySelector("#score-table").querySelector("tbody").innerHTML="";

    document.querySelectorAll(".boxn").forEach(element => {
        // Clona il nodo per rimuovere tutti gli event listener
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
    });
    document.querySelectorAll(".boxf").forEach(element => {
        // Clona il nodo per rimuovere tutti gli event listener
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
    });
    hide();
    document.querySelectorAll(".continents-container").forEach(element => {
        element.style.display="none";
    });
    document.querySelector(".games-container").style.display="flex";
    document.querySelector("#back-button").style.display="none";
    document.querySelector("#lives-container").style.display="none";
    document.querySelector("#score-table").style.display="none";
    document.querySelector("#see-score-button").style.display="none";
    document.querySelector("#life1").setAttribute("src", "Img/Cuore Intero.png");
    document.querySelector("#life2").setAttribute("src", "Img/Cuore Intero.png");
    document.querySelector("#life3").setAttribute("src", "Img/Cuore Intero.png");
}
