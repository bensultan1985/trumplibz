let object = {};
let count = 0;
let submit = document.getElementById("submit");
let headline = '';
//API NYTimes Call
(async () => {
let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Trump&api-key=9hF6uiZFm8pPLDGLCGZoP3MhhVsHiMsL';
let response = await fetch(url);
object = await response.json(); // read response body and parse as JSON
headline = object.response.docs[count].headline.main;
discoverReplacements(object.response.docs[count].lead_paragraph);
})()

//global variables
let listOfReplaced = [];
let elementCount = 0;
let newArticle = '';
//special conditions
let addAdj = ['\'s', 'adjective', 'addafter']
let replaceIng = ['ing', '-ing verb', 2]
let president = ['President', 'adjective', 'addbefore']
let addAdjectives = [['meeting', 'adjective', 'addbefore'], ['votes', 'plural noun', 'bas'], ['complete', 'adverb', 'addbefore'], ['advised', 'adverb', 'addbefore'], ['voted', 'adverb', 'addbefore'], ['said', 'adverb', 'addbefore'], ['adverb', 'tweeted', 'addbefore'], ['trial', 'adjective', 'addbefore'], ['hearings', 'adjective', 'addbefore'],['President', 'adjective', 'addbefore'], ['dangerous', 'adjective', 'bas']]
//regular conditions template ['', '', 'bas']
let commonFills = [['book', 'noun', 'bas'], ['collusion', 'noun', 'bas'], ['wished', 'past tense verb', 'bas'], ['people', 'living things', 'bas'], ['fake', 'adjective', 'bas'], ['witch', 'occupation (singular)', 'bas'], ['adviser', 'occupation (singular)', 'bas'], ['foreign aid', 'plural noun', 'bas'], ['white house', 'place', 'bas'], ['Washington D.C.', 'place', 'bas'], ['senate', 'place', 'bas'], ['Nancy Pelosi', 'celebrity', 'bas'], ['Mitch McConnell', 'celebrity', 'bas'], ['China', 'place', 'bas'], ['election', 'award ceremony name', 'bas'],['President', 'adjective', 'addbefore'],['\'s', 'adjective', 'addafter'], ['Russia', 'place', 'bas'], ['Putin', 'celebrity', 'bas'], ['collusion', '-ing verb', 'bas'], ['testify', 'verb', 'bas'], ['Republicans', 'occupation (plural)', 'bas'], ['Democrats', 'occupation (plural)', 'bas'], ['lawyer', 'occupation (singular)', 'bas'], ['day', 'amount of time', 'bas'], ['Space', 'place', 'bas'], ['coal', 'noun', 'bas'], ['reporters', 'plural noun', 'bas'], ['immigration', 'abstract noun (ending in -tion)', 'bas'], ['meeting', 'adjective', 'addbefore'], ['votes', 'plural noun', 'bas'], ['complete', 'adverb', 'addbefore'], ['advised', 'adverb', 'addbefore'], ['voted', 'adverb', 'addbefore'], ['said', 'adverb', 'addbefore'], ['adverb', 'tweeted', 'addbefore'], ['trial', 'adjective', 'addbefore'], ['hearings', 'adjective', 'addbefore'], ['dangerous', 'adjective', 'bas'], ['extreme', 'adjective', 'bas'],['spokeswoman', 'occupation (singular)', 'bas'], ['spokesman', 'occupation (singular)','bas'],['lied', 'verb (past tense)', 'bas'], ['Americans', 'animal (plural)','bas']]

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
  if (listOfReplaced.length > 1) {addElement(listOfReplaced)} else{ console.log('skipped'); nextLib();}
}

// part 2: create form boxes for user
function addElement (arr) {
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
  document.getElementById("howitworks").innerHTML = `How does it work?
      <br>We grabbed another article that <BR> awaits your final edits.<br>Just replace the prompts and hit submit!`;
  document.getElementById("formarea").innerHTML = '';
  document.getElementById("article").innerHTML = '';
  document.getElementById("subheadings").style.visibility = "visible";
  discoverReplacements(object.response.docs[count].lead_paragraph);
};

const endLibs = () => {
  location.reload()
}

//new submit button event handlers
const handler1 = () => {
  if (submit.innerHTML === 'submit')  {
    pushElements();
    submit.innerHTML = 'make a new one!';
  } else {
    submit.innerHTML = 'submit';
    nextLib()
  };
};

submit.addEventListener('click', handler1);

