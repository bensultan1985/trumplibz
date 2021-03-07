/*/////////////////////////
NewsLibz v 2.0.0.0
3/6/21 BEN
1. articleDetails object contains all necessary variables.
2. articleDetails.replWordsList lists all words to be replaced and stores the replacement words.
/////////////////////////*/

let timesData = {};
let count = 0;
let submit = document.getElementById("submit");
let headline = '';
let pageCount = 0;
let firstLib = true;
let listOfReplaced = [];
let elementCount = 0;
let newArticle = '';
let articleDetails = {};
let punctuationExceptions = /(((?:a\.d|a\.m|abbr|adj|adv|al|assn|ave|c|c\.v|ca|dept|dr|e\.g|est|etc|fig|gen|hon|hrs|i\.e|inc|jr|mr|mrs|ms|mt|no|obj|oz|p\.a|p\.m|p\.s|pl|poss|prep|prof|pron|pseud|r\.i\.p|rev|sing|sq|sr|st|stat|syn|trans|v|vb|vs))\.|[,;:!?])$/;
//special conditions
//['election', 'award ceremony name', 'bas'] add in later
//detect two articles (a, an, the) in a row

//API NYTimes Call
// let url = 'http://localhost:5000/nytimes';
// let response = fetch(url).then(response => res.json()).then(data => console.log(data));
// console.log(response);
// headline = object.response.docs[count].headline.main;
// discoverReplacements(object.response.docs[count].lead_paragraph);
const newLibs = () => {
  if (pageCount == 20) pageCount = 0; 
  (async () => {
    timesData = {};
    const rawResponse = await fetch('/nytimes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'pagecount': pageCount})
    });
    pageCount++;
    timesData = await rawResponse.json(); // read response body and parse as JSON
  headline = timesData.response.docs[count].headline.main;
  discoverReplacements(timesData.response.docs[count].lead_paragraph, articleDetails.headline = timesData.response.docs[count].headline.main);
  })();
};

//part 1: discover words to be replaced
const discoverReplacements = (article, headline) => {
  listOfReplaced = [];
  spacedArticle = article.split(' ');
  articleDetails.ogArticle = article;
  articleDetails.spacedArticle = spacedArticle;
  articleDetails.replWordList = {};
  articleDetails.count = 0;
  articleDetails.headline = headline;
  spacedArticle.forEach(word => {
    let lWord = word.toLowerCase();
    let match = lWord.match(punctuationExceptions);
    if (match) {
      lWord = lWord.slice(0, -1);
    };
    if (replWordList[lWord] && !articleDetails.replWordList[lWord]) {
      articleDetails.replWordList[lWord] = replWordList[lWord];
      articleDetails.count++
    };
  });
  articleDetails.headline.split(' ').forEach(word => {
    let lWord = word.toLowerCase();
    let match = lWord.match(punctuationExceptions);
    if (match) {
      lWord = lWord.slice(0, -1);
    };
    if (replWordList[lWord] && !articleDetails.replWordList[lWord]) {
      articleDetails.replWordList[lWord] = replWordList[lWord];
      articleDetails.count++;
    };
  });
  if (articleDetails.count > 2) {
    addElement(articleDetails);
  } else {
    nextLib();
  };
};

// part 2: create form boxes for user
function addElement (articleDetails) {
  document.getElementById("formarea").innerHTML = '';
  elementCount = 0;
  for (key in articleDetails.replWordList) { 
    let box = document.createElement('input');
    box.id = "ID" + elementCount;
    box.type = "text";
    box.className = "formbox";
    box.placeholder = articleDetails.replWordList[key].pos;
    box.setAttribute("ogWord", key)
    document.getElementById("formarea").append(box);
    elementCount++;
  };
  submit.style.visibility = 'visible';
};
//discoverReplacements(article)

//part 3: new words are received
const pushElements = () => {
  let formElements = document.getElementsByClassName('formbox');
  for (let i = 0; i < formElements.length; i++) {
    articleDetails.replWordList[formElements[i].getAttribute("ogWord")].replacement = formElements[i].value;
  };
  var art = replaceWords(articleDetails.spacedArticle);
  var head = replaceWords(articleDetails.headline.split(' ')).join(' ');
  return newzLib(art, head);
};

//part 4: article words are replaced with user words
const replaceWords = (spacedWords) => {
  for (let i = 0; i < spacedWords.length; i++) {
    lWord = spacedWords[i].toLowerCase();
    let match = lWord.match(/((?<!\b(?:a\.d|a\.m|abbr|adj|adv|al|assn|ave|c|c\.v|ca|dept|dr|e\.g|est|etc|fig|gen|hon|hrs|i\.e|inc|jr|mr|mrs|ms|mt|no|obj|oz|p\.a|p\.m|p\.s|pl|poss|prep|prof|pron|pseud|r\.i\.p|rev|sing|sq|sr|st|stat|syn|trans|v|vb|vs))\.|[.,;:!?])$/)
    if (match) {
      lWord = lWord.slice(0, -1);
    };
    if (articleDetails.replWordList[lWord]) {
      if (articleDetails.replWordList[lWord].rule == 'bas') {
      spacedWords[i] = articleDetails.replWordList[lWord].replacement;
      continue;
      };
      if (articleDetails.replWordList[lWord].rule == 'addbefore') {
        spacedWords.splice(i, 0, articleDetails.replWordList[lWord].replacement);
        i++;
        continue;
      };
    };
  };
  return spacedWords;
};

// function hasApostrophe(str) {
//   if (str.match(/[']s$/i)) {
//   sliceWord = str
//   spacedArticleD.splice(i+1, 0, sliceWord);
//   k++;
//   };
// }

const newzLib = (array, headline) => {
  document.getElementById("formarea").innerHTML = '';
  newArticle = array.join(' ');
  document.getElementById("article").innerHTML = `<h2>${headline}</h2> <br><div id="newart">${newArticle}</div>`;
  document.getElementById("howitworks").innerHTML = '';
  document.getElementById("subheadings").style.visibility = "hidden";
};

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
  discoverReplacements(timesData.response.docs[count].lead_paragraph, articleDetails.headline = timesData.response.docs[count].headline.main);
};

const endLibs = () => {
  count = 0;
  newLibs();
};

//new submit button event handlers
const handler1 = () => {
  firstLib = false;
  if (submit.innerHTML === 'submit')  {
    pushElements();
    submit.innerHTML = 'make a new one!';
  } else {
    submit.style.visibility = 'hidden';
    submit.innerHTML = 'submit';
    nextLib();
  };
};

submit.addEventListener('click', handler1);
newLibs();