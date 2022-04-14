function opacity(selectedBox)
{
    const id_selectedBox = selectedBox.dataset.choiceId; //salva id box selezionato
    
    const answers = selectedBox.parentNode.querySelectorAll('div');
    
    for (const unselectedAnswers of answers)
    {
        if(unselectedAnswers.dataset.choiceId !== id_selectedBox)
        {
          unselectedAnswers.classList.add('opacity');
          unselectedAnswers.querySelector('.checkbox').src = './images/unchecked.png';
          unselectedAnswers.classList.remove('color');
        }
    }

}

function reset(event)
{
    result.classList.add('hidden');

    delete selectedList.one; //tolgo dalla lista le risposte
    delete selectedList.two;
    delete selectedList.three;

    for (const box of boxes)
    {
        box.addEventListener('click', changeToChecked); //raggiungo click
        box.classList.remove('opacity'); //rimuovo opacità 
        box.querySelector('.checkbox').src = './images/unchecked.png'; //rimetto tutti unchecked
        box.classList.remove('color'); //rimuovo il colore dall'elemento selezionato
    }
}

function getPersonality()
{
    if(selectedList['one'] === selectedList['two'] || selectedList['one'] === selectedList['three'])
    return selectedList['one'];

    if(selectedList['two'] === selectedList['one'] || selectedList['two'] === selectedList['three'])
    return selectedList['three'];

    if(selectedList['three'] === selectedList['one'] || selectedList['three'] === selectedList['two'])
    return selectedList['three'];

    return selectedList['one'];
}

function insert_list (selectedBox)
{
    selectedList[selectedBox.dataset.questionId] = selectedBox.dataset.choiceId; //inserisco elemento selezionato nella lista

    let i = 0;
    for(let x in selectedList)
    {
        i++;
    }

    if (i == 3)
    {
        for(const box of boxes)
        {
        box.removeEventListener('click', changeToChecked); //fa in modo che le risposte non possono essere cambiate
        }
    }

    const personality = getPersonality();

    result.querySelector('h1').textContent = RESULTS_MAP[personality].title;
    result.querySelector('p').textContent = RESULTS_MAP[personality].contents;
    result.classList.remove('hidden'); 

    const button = result.querySelector('#reset');
    button.addEventListener('click', reset);

}



function changeToChecked(event)
{
    const selectedBox = event.currentTarget; 
    selectedBox.classList.add('color');
    selectedBox.classList.remove('opacity');

    selectedBox.querySelector('.checkbox').src = './images/checked.png';
    
    opacity(selectedBox);
    insert_list(selectedBox);
}


const selectedList = {};
const result = document.querySelector('#result');
const boxes = document.querySelectorAll('.choice-grid div')
for(const box of boxes)
{
    box.addEventListener('click', changeToChecked);
}