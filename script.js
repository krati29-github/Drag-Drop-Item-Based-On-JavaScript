console.log("Sorted List Drag and Drop API");

const dragableList = document.getElementById("dragable-list");
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

// array to store the sorted items
const listItem = [];

let dragStartIndex;
createList();

// const numbers = [1,3,110,40,302];
// console.log(numbers.sort(function(a,b){
//     console.log(a)
//     // console.log(b)
// return a-b;
// }));

// create a function to insert list item into DOM
function createList(){
[...richestPeople]
.map(a=>({
    value: a, sort:Math.random()
}))
.sort((a,b)=>{
    a.sort - b.sort
})
.map(a=>a.value)
.forEach((person, index)=>{
//     console.log(index);
// console.log(person.value);
    const listItems = document.createElement('li');

    // listItems.classList.add('over');

    listItems.setAttribute('data-index', index);
    listItems.innerHTML = `
    <span class="number">${index+1}</span>
    <div class="dragable" draggable="true">
        <p class="person-name">${person}
        <i class="fas fa-grip-lines"></i>
        </p>
    </div>
    `;

    listItem.push(listItems);
    dragableList.appendChild(listItems);
});

addEventListeners();
}

function addEventListeners(){
    const dragables = document.querySelectorAll('.dragable');
    const dragableListItems = document.querySelectorAll('.dragable-list li');

    dragables.forEach(dragable => {
        dragable.addEventListener('dragstart', dragStart);
    })

    dragableListItems.forEach(items => {
        items.addEventListener('dragover', dragOver);
        items.addEventListener('drop', dragDrop);
        items.addEventListener('dragenter', dragEnter);
        items.addEventListener('dragleave', dragLeave);
    });
}

function dragStart(e){
    // console.log(e.type);
    dragStartIndex=this.closest('li').getAttribute('data-index');
}

function dragOver(e){
    // console.log(e.type);
    e.preventDefault();
}

function dragDrop(e){
    // console.log(e.type);
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex){

    const itemOne = listItem[fromIndex].querySelector('.dragable');

    const itemTwo = listItem[toIndex].querySelector('.dragable');

    // console.log(itemOne,itemTwo);

    listItem[fromIndex].appendChild(itemTwo);
    listItem[toIndex].appendChild(itemOne);
    // console.log(123)
}

function dragLeave(e){
    // console.log(e.type);
    this.classList.remove('over');   
}

function dragEnter(e){
    // console.log(e.type);
    this.classList.add('over');
}