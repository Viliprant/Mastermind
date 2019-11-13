class Try {
    constructor(myPawnBox, isFirstTry) {
        this.state = false;
        this.pawnsArray = [];
        this.indicesArray = [];

        //partie gauche
        this.subElementLeft = document.createElement('div');
        this.subElementLeft.id = 'leftTry';
        this.subElementLeft.className = 'leftTry border-right border-white';

        //partie droite
        this.subElementRight = document.createElement('div');
        this.subElementRight.id = 'rightTry';
        this.subElementRight.className = 'rightTry';

        //Container Try
        this.element = document.createElement('div');
        this.element.id = 'Try';
        if (isFirstTry) {
            this.element.className = 'border rounded border-info bg-info my-2';
        } else {
            this.element.className = 'border rounded border-info bg-info my-2 notCurrentTry';
        }

        this.element.appendChild(this.subElementLeft);
        this.element.appendChild(this.subElementRight);
    }

    init(nbPawns) {
        for (let index = 0; index < nbPawns; index++) {
            this.pawnsArray.push(this.createPawn(true));
            this.indicesArray.push(this.createPawn());
        }
    }

    //Affiche et retourne un Pawn de la partie gauche
    createPawn(isColorable = false) {
        const myPawn = new Pawn();
        if (isColorable) {
            myPawn.element.addEventListener('click', () => {
                if (myPawnBox.lastClicked && this.state === true) {
                    myPawn.element.style.backgroundColor = myPawnBox.lastClicked.element.style.backgroundColor;
                }
            });
            this.subElementLeft.appendChild(myPawn.element);
        } else {
            this.subElementRight.appendChild(myPawn.element);
        }
        return myPawn;
    }

    compareCombinaisons(winCombinaison) {
        let indiceArray = []; // tableau qui est return
        let combinaisonChecked = [];
        let userColor;
        let winColor;

        // On regarde d'abord ceux qui sont bons
        for (let userPawnElementIndex = 0; userPawnElementIndex < this.pawnsArray.length; userPawnElementIndex++) {
            userColor = this.pawnsArray[userPawnElementIndex].element.style.backgroundColor;
            winColor = winCombinaison[userPawnElementIndex];

            if (userColor === winColor) {
                indiceArray[userPawnElementIndex] = 'bon';
                combinaisonChecked[userPawnElementIndex] = true;
            }
        }
        //on parcourt les couleurs de l'utilisateur
        for (let userPawnElementIndex = 0; userPawnElementIndex < this.pawnsArray.length; userPawnElementIndex++) {
            userColor = this.pawnsArray[userPawnElementIndex].element.style.backgroundColor;

            //on parcourt les couleurs gagnantes
            for (let winPawnElementIndex = 0; winPawnElementIndex < winCombinaison.length; winPawnElementIndex++) {
                winColor = winCombinaison[winPawnElementIndex];

                // on regarde seulement ceux qui n'ont pas été vérifié
                if (combinaisonChecked[winPawnElementIndex] === true) {
                    //console.log('Deja check, mec !');
                } else {
                    if (userColor === winColor) {
                        indiceArray[userPawnElementIndex] = 'mal place';
                        combinaisonChecked[winPawnElementIndex] = true;
                        break;
                    }

                    //Le champs reste undefined si la couleur n'existe pas, le traitement est fait lors de la lecture du tableau, plus tard
                    //Dans la fonction colorIndices
                }

            }
        }
        return indiceArray;
    }

    colorIndices(p_indicesArray) {
        this.indicesArray.forEach((pawnIndice, index) => {
            if (!p_indicesArray[index]) {
                p_indicesArray[index] = 'inexistant';
            }
            pawnIndice.element.style.backgroundColor = INDICES[p_indicesArray[index]];
        })
    }

    toggleState() {
        if (this.state) {
            this.state = false;
            this.element.classList.toggle('notCurrentTry');
        } else {
            this.state = true;
            this.element.classList.toggle('notCurrentTry');
        }
    }
}