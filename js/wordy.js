import deePool from './external/deePool.mjs'

export default {
  loadWords,
  findWords,
};

// ****************************

// implementing trie tree to hold all our words in dict;
let dict = {};
// Symbol give as unique key every time we use it
let isWord = Symbol('is-word');

function loadWords(wordList) {
  let nodeCount = 0;

  // if dictionary already have anything - clean it;
  if (Object.keys(dict).length > 0) dict = {};

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

// searching for all possible words from input string from trie tree data structure
function findWords(input, prefix = '', node = dict) {
  let words = [];

  // check if isWord property od node is true and push complete word to words
  if (node[isWord]) words.push(prefix);

  // traverse all letters from input
  for (let i = 0; i < input.length; i++) {
    let currentLetter = input[i];

    // if current letter is inside current node of dictionary - do recursion, else - continue
    if (node[currentLetter]) {
      // construct remaining letters, prefix, node for deeper recursion
      let remainingLetters = [...input.slice(0, i), ...input.slice(i + 1)];
      let newPrefix = prefix + currentLetter;
      let newNode = node[currentLetter];

      // deeper recursion will return either array of words or empty array,
      // so add them to main words array
      words.push(...findWords(remainingLetters, newPrefix, newNode));
    }
  }

  // we will create duplicates, so we need to deduplicate our words array, but only at the end of our first layer recursion (after words array will be fully populated by deeper recursions)
  if (node === dict) words = Array.from(new Set(words));

  return words;
}
