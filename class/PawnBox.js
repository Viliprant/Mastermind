class PawnBox{
    constructor(container){
        this.element = document.createElement('div');
        this.element.id = 'paletteDeCouleur';
        this.element.className = 'd-block mx-auto rounded my-3 d-flex p-3';
        container.appendChild(this.element);
        this.lastClicked = null;
    }
    init(myColors){
        for (const key in myColors) {
            const myPawn = new Pawn(myColors[key],'palette')
            myPawn.element.addEventListener('click',() => {
                if(this.lastClicked)
                {
                    this.lastClicked.element.classList.remove("selected");
                }
                this.lastClicked = myPawn;
                myPawn.element.classList.add("selected");
                console.log('Lastclicked : ' + this.lastClicked.element.style.backgroundColor);
            })
            this.element.appendChild(myPawn.element);
        }
    }
}