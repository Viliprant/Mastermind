class Pawn{
    constructor(color='white',type){
        this.element = document.createElement('div');
        this.element.className = 'couleur rounded-circle';
        this.element.style.backgroundColor = color;
    }
}