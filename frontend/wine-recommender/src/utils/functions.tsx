const STOP_WORDS = ["de", "d'", "du", "des", "le", "la", "les", "l'", "un", "une", "au", "aux", "à", "et", "ou", "où", "pour", "avec", "sans", "sur", "sous", "dans", "entre", "par", "vers"];
export const remove_first_stop_word = (str: string) => {
    const res = [];
    const words = str.split(' ')
    // check first word
    const word_to_check = words[0].toLowerCase();
    if (!STOP_WORDS.includes(word_to_check)) {
        res.push(words[0])
    }
    // add the rest of the words
    for (let i = 1; i < words.length; i++) {
        res.push(words[i]);
    }
    return (res.join(' '))
}
