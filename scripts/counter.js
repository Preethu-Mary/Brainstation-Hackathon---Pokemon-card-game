

document.addEventListener('DOMContentLoaded', () => {
    const parentContainer = document.querySelector('.turn-board__container');
    
    
    const turnBoardHeader = document.createElement('div');
    turnBoardHeader.className = 'turn-board__header';
    
    const title = document.createElement('h3');
    title.className = 'header__title';
    title.textContent = 'Tries Remaining';
    
    
    turnBoardHeader.appendChild(title);
    
    
    const turnBoardBody = document.createElement('div');
    turnBoardBody.className = 'turn-board__body';
    
    const bodyContainer = document.createElement('div');
    bodyContainer.className = 'body__container';
    
    const bodyH2 = document.createElement('h3');
    bodyH2.id = 'num__tries';
    bodyH2.textContent = '6';
    
    
    bodyContainer.appendChild(bodyH2);
    turnBoardBody.appendChild(bodyContainer);
    
    
    
    parentContainer.appendChild(turnBoardHeader);
    parentContainer.appendChild(turnBoardBody);
    
    });
    
    
    
    // let turnCount = 5;
    
    // function turnCounter(){  
    
    //     if(successfulMatch){
    //         //winSequence()
    //         console.log('winSequence')
    //     }
    //     else if(turnCounter === 0){
    //         console.log("gameOver();")
    
    //     }
    
    //     else{
    //         turnCount = decreaseTurnCounter(turnCount)
    
    //     }
    // }
    // function updateTurnCountDOM(turnCount) {
    //     const turnCounterDOM = document.getElementById('num__tries');
    //     turnCounterDOM.textContent = turnCount;
    // }
    
    // function decreaseTurnCount(turnCount) {
    //     turnCount--;
    //     updateTurnCountDisplay(turnCount);
    //     return turnCount;
    // }
    
    // turnCounter(turnCounter)
    