//Node
const containerPalette = document.querySelector('#containerPalette');
const gameBoardContainer = document.querySelector('#gameBoardContainer');
const playButton = document.querySelector('#playButton');
const newGameButton = document.querySelector('#newGameButton');
const selectButtonDifficulte = document.querySelector('#difficulte');

let difficulte = selectButtonDifficulte.options[selectButtonDifficulte.selectedIndex].value;

//palette de couleur
const myPawnBox = new PawnBox(containerPalette);
myPawnBox.init(PAWNS);

//liste des essais
const myGameBoard = new GameBoard('#groupeEssais');
myGameBoard.init(LEVEL[difficulte].nbTry);

//Bouton new game
newGameButton.addEventListener('click', () => {
    difficulte = selectButtonDifficulte.options[selectButtonDifficulte.selectedIndex].value;
    myGameBoard.replay(LEVEL[difficulte].nbTry);
})

//Boutton jouer
playButton.addEventListener('click',() => {
    if(myGameBoard.checkAllPawns())
    {
        let myColorsArray = [];
        for (let index = 0; index < LEVEL[difficulte].nbPawns; index++) {
            myColorsArray.push(myGameBoard.triesArray[myGameBoard.lastTry].pawnsArray[index].element.style.backgroundColor);
        }

        myGameBoard.showIndice(); //On fait apparaitre les indices

        //On les convertit en chaine de caractère pour les comparer
        if(JSON.stringify(myColorsArray) == JSON.stringify(myGameBoard.winCombinaison)){
            console.log('t\'as gagné !');
        }
        else
        {
            console.log('Tu n\'as pas trouvé la bonne combinaison !');
            if(myGameBoard.lastTry === myGameBoard.triesArray.length-1){
                console.log('t\'as perdu, nullos !');
                return;
            }
            else{
                //on passe à la ligne suivante
                myGameBoard.updateTry();
            }
        }
    }
})