export default {
  loadWords,
  findWords,
};

// ****************************

// implementing trie tree to hold all our words in dict;
const node = {};
let isWord = Symbol('is-word');

function loadWords(wordList) {
  let nodeCount = 0;

  // if dictionary already have anything - clean it;
  if (Object.keys(node).length > 0) node = {};

  for (let word of wordList) {
    let node = dict;
    // lets iterate all letters of all words and put it in trie tree structure
    for (let letter of word) {
      if (!node[letter]) {
        node[letter] = { [isWord]: false };
        nodeCount++;
      }
      node = node[letter];
    }
    // make isWord true on last letter of the word;
    node[isWord] = true;
  }

  return nodeCount;
}

function findWords(input) {
  // TODO: implement unscrambling/searching logic
  // for a string of uppercase letters in the
  // `input` parameter; return the array of
  // matching words
  return [];
}
