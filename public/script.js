let object = {};
let count = 0;
let submit = document.getElementById("submit");
let headline = '';
let pageCount = 0;
let firstLib = true;
//API NYTimes Call
// let url = 'http://localhost:5000/nytimes';
// let response = fetch(url).then(response => res.json()).then(data => console.log(data));
// console.log(response);
// headline = object.response.docs[count].headline.main;
// discoverReplacements(object.response.docs[count].lead_paragraph);
const newLibs = () => {
  if (pageCount == 20) pageCount = 0; 
  (async () => {
    object = {};
    const rawResponse = await fetch('/nytimes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'pagecount': pageCount})
    })
    pageCount++;
    object = await rawResponse.json(); // read response body and parse as JSON
  console.log(object);
  headline = object.response.docs[count].headline.main;
  discoverReplacements(object.response.docs[count].lead_paragraph);
    console.log(pageCount)
  })();
}


//global variables
let listOfReplaced = [];
let elementCount = 0;
let newArticle = '';
//special conditions
//['election', 'award ceremony name', 'bas'] add in later
let addAdj = ['\'s', 'adjective', 'addafter']
let replaceIng = ['ing', '-ing verb', 2]
let president = ['President', 'adjective', 'addbefore']
let addAdjectives = [['meeting', 'adjective (e.g. pretty)', 'addbefore'], ['votes', 'plural noun', 'bas'], ['complete', 'adverb (e.g. softly)', 'addbefore'], ['advised', 'adverb (e.g. softly)', 'addbefore'], ['voted', 'adverb (e.g. softly)', 'addbefore'], ['said', 'adverb (e.g. softly)', 'addbefore'], ['adverb (e.g. softly)', 'tweeted', 'addbefore'], ['trial', 'adjective (e.g. pretty)', 'addbefore'], ['hearings', 'adjective (e.g. pretty)', 'addbefore'],['President', 'adjective (e.g. pretty)', 'addbefore'], ['dangerous', 'adjective (e.g. pretty)', 'bas']]
//regular conditions template ['', '', 'bas']
let commonFills = [['healthcare workers', 'occupation (plural)', 'bas'], ['book', 'noun', 'bas'], ['collusion', 'noun', 'bas'], ['wished', 'past tense verb', 'bas'], ['people', 'living things', 'bas'], ['fake', 'adjective (e.g. pretty)', 'bas'], ['witch', 'occupation (singular)', 'bas'], ['adviser', 'occupation (singular)', 'bas'], ['foreign aid', 'plural noun', 'bas'], ['white house', 'place', 'bas'], ['Washington D.C.', 'place', 'bas'], ['senate', 'place', 'bas'], ['Nancy Pelosi', 'celebrity', 'bas'], ['Mitch McConnell', 'celebrity', 'bas'], ['China', 'place', 'bas'],['President', 'adjective (e.g. pretty)', 'addbefore'],['\'s', 'adjective (e.g. pretty)', 'addafter'], ['Russia', 'place', 'bas'], ['Putin', 'celebrity', 'bas'], ['collusion', '-ing verb', 'bas'], ['testify', 'verb', 'bas'], ['Republicans', 'occupation (plural)', 'bas'], ['Democrats', 'occupation (plural)', 'bas'], ['lawyer', 'occupation (singular)', 'bas'], ['Space', 'place', 'bas'], ['coal', 'noun', 'bas'], ['reporters', 'plural noun', 'bas'], ['immigration', 'abstract noun (ending in -tion)', 'bas'], ['meeting', 'adjective (e.g. pretty)', 'addbefore'], ['votes', 'plural noun', 'bas'], ['complete', 'adverb (e.g. softly)', 'addbefore'], ['advised', 'adverb (e.g. softly)', 'addbefore'], ['voted', 'adverb (e.g. softly)', 'addbefore'], ['said', 'adverb (e.g. softly)', 'addbefore'], ['adverb (e.g. softly)', 'tweeted', 'addbefore'], ['trial', 'adjective (e.g. pretty)', 'addbefore'], ['hearings', 'adjective (e.g. pretty)', 'addbefore'], ['dangerous', 'adjective (e.g. pretty)', 'bas'], ['extreme', 'adjective (e.g. pretty)', 'bas'],['spokeswoman', 'occupation (singular)', 'bas'], ['states', 'noun (plural)', 'bas'], ['distancing', 'verb (ending with -ing)', 'bas'], ['spokesman', 'occupation (singular)','bas'],['lied', 'verb (past tense)', 'bas'], ['ignored', 'verb (ending in -ed)', 'bas'], ['veto', 'verb (present tense e.g. "sing")', 'bas'
], ['signed', 'verb (ending in -ed)', 'bas'], ['troops', 'noun (plural)', 'bas'], ['agree', 'verb (present e.g. "sing")', 'bas'], ['deadly', 'adjective (e.g. pretty)', 'bas'], ['Americans', 'animal (plural)','bas']]

//part 1: discover words to be replaced
const discoverReplacements = (article) => {
listOfReplaced = [];
spacedArticle = article.split(' ')

for (let i = 0; i < spacedArticle.length; i++) {
  for (let j = 0; j < commonFills.length; j++) {
    if (spacedArticle[i] === commonFills[j][0]) {
      listOfReplaced.push(commonFills[j][1])
    };
    if (spacedArticle[i].match(/[']s$/i)) {
      listOfReplaced.push(addAdj[1])
      break;

    };
  };
};
console.log(listOfReplaced);
  if (listOfReplaced.length > 2) {addElement(listOfReplaced)} else{ console.log('skipped'); nextLib();}
}

// part 2: create form boxes for user
function addElement (arr) {
  document.getElementById("formarea").innerHTML = ''
  elementCount = 0;
  for (let i = 0; i < arr.length; i++) { 
    //let input = document.createElement("input");
    let box = document.createElement('input');
    box.id = "ID" + i;
    box.type = "text";
    box.placeholder = arr[i];
    box.className = "formbox";
    document.getElementById("formarea").append(box);
    elementCount++;
  }
  submit.style.visibility = 'visible';
}

//discoverReplacements(article)


let newWords = [];

//part 3: new words are received
const pushElements = () => {
  newWords = [];
  for (let i = 0; i < elementCount; i++) {
    newWords.push(document.getElementById("ID" + i).value);
  };
  console.log(`${newWords}newwords`)
  replaceWords(newWords);
};

//part 4: article words are replaced with user words
const replaceWords = (newWords) => {
  let sliceWord = [];
  let temp;
  let k = 0;
  for (let i = 0; i < spacedArticle.length; i++) {
    if (spacedArticle[i].match(/[']s$/i)) {
      sliceWord = newWords[k]
      spacedArticle.splice(i+1, 0, sliceWord);
      k++;
      }
    for (let l = 0; l < addAdjectives.length; l++) {
      if (spacedArticle[i] === addAdjectives[l][0]) {
      sliceWord = newWords[k]
      spacedArticle.splice(i, 0, sliceWord);
      i++;
      k++;
      continue;
    } else {
    for (let j = 0; j < commonFills.length; j++) {
      if (spacedArticle[i] === commonFills[j][0]) {
        if (commonFills[j][2] === 'bas') {
          spacedArticle[i] = newWords[k];
          k++;
          };
        };
      };
    };
  };
  }
      return trumpLib(spacedArticle);
}


const trumpLib = () => {
  headline = object.response.docs[count].headline.main;
  document.getElementById("formarea").innerHTML = '';
  newArticle = spacedArticle.join(' ');
  console.log(newArticle);
  document.getElementById("article").innerHTML = `<h2>${headline}</h2> <br><div id="newart">${newArticle}</div>`;
  document.getElementById("howitworks").innerHTML = '';
  document.getElementById("subheadings").style.visibility = "hidden";

}

const nextLib = () => {
  count++;
  if (count === 10) return endLibs();
  if (firstLib == false) {
    document.getElementById("howitworks").innerHTML = `How does it work?
      <br>We grabbed another article that <BR> awaits your final edits.<br>Just replace the prompts and hit submit!`
    };
  document.getElementById("formarea").innerHTML = 'loading...';
  document.getElementById("article").innerHTML = '';
  document.getElementById("subheadings").style.visibility = "visible";
  discoverReplacements(object.response.docs[count].lead_paragraph);
};

const endLibs = () => {
  count = 0;
  newLibs()
}

//new submit button event handlers
const handler1 = () => {
  firstLib = false;
  if (submit.innerHTML === 'submit')  {
    pushElements();
    submit.innerHTML = 'make a new one!';
  } else {
    submit.style.visibility = 'hidden';
    submit.innerHTML = 'submit';
    nextLib()
  };
};

submit.addEventListener('click', handler1);

newLibs()