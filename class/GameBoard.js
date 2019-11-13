class GameBoard{
    constructor(elementID){
        this.element = document.querySelector(elementID);
        this.element.className = 'container d-block mx-auto';
        this.triesArray = [];
        this.lastTry = 0;
        this.winCombinaison = []
    }

    init(nbTries){
        this.winCombinaison = this.createWinCombinaison(LEVEL[difficulte].nbPawns);
        let  myTry;
        //On crée les lignes de MasterMind en fonction du nombre d'essais
        for (let index = 0; index < nbTries; index++) {
            if(index == 0)
            {
                myTry = new Try(myPawnBox, true);
            }
            else{
                myTry = new Try(myPawnBox);
            }
            if(index === 0)
            {
                myTry.state = true;
            }
            myTry.init(LEVEL[difficulte].nbPawns);
            this.triesArray.push(myTry);
            this.element.appendChild(myTry.element);
        }
    }

    replay(nbTries){
        this.element.innerHTML = '';
        this.triesArray = [];
        this.lastTry = 0;
        this.init(nbTries);
    }

    //Retourne une nouvelle combinaison
    createWinCombinaison(nbPawns){
        let myWinCombinaison = [];

        for (let index = 0; index < nbPawns; index++) {
            const monAleatoire = Math.floor(Math.random() * Math.floor(PAWNS.length));
            myWinCombinaison.push(PAWNS[monAleatoire]);
        }
        console.log(myWinCombinaison);
        return myWinCombinaison
    }

    //Retourne si tous les pawns ont été remplis
    checkAllPawns(){
        let myPawns;
        for (let index = 0; index < LEVEL[difficulte].nbPawns; index++) {
            myPawns = this.triesArray[this.lastTry].pawnsArray[index];
            if(myPawns.element.style.backgroundColor === 'white')
            {
                console.log('Il manque une case pour le #',index+1);
                return false
            }
        }
        return true;
    }

    //Affiche les indices de l'essai courant
    showIndice(){
        const indicesArray = this.triesArray[this.lastTry].compareCombinaisons(this.winCombinaison);
        this.triesArray[this.lastTry].colorIndices(indicesArray);
    }

    updateTry(){
        this.triesArray[myGameBoard.lastTry].toggleState();
        this.lastTry += 1;
        this.triesArray[myGameBoard.lastTry].toggleState();
    }
}