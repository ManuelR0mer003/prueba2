document.addEventListener('DOMContentLoaded', () => {
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');
    const copyBtn = document.getElementById('copyBtn');
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');

    // Diccionario de sustitución para cifrado
    const substitutionDict = {
        'a': '4',
        'b': '8',
        'c': '<',
        'd': '|)',
        'e': '3',
        'f': '|=',
        'g': '9',
        'h': '#',
        'i': '1',
        'j': '_|',
        'k': '|<',
        'l': '|',
        'm': '/\/\\',
        'n': '|\\|',
        'o': '0',
        'p': '|>',
        'q': '0,',
        'r': '|2',
        's': '5',
        't': '7',
        'u': '(_)',
        'v': '\\/',
        'w': '\\/\\/',
        'x': '%',
        'y': '¥',
        'z': '2'
    };

    // Inverso del diccionario de sustitución para descifrado
    const reverseSubstitutionDict = Object.fromEntries(
        Object.entries(substitutionDict).map(([key, value]) => [value, key])
    );

    function substitute(text, dict) {
        return text.split('').map(char => dict[char] || char).join('');
    }

    function reverseSubstitute(text, dict) {
        let result = '';
        let temp = '';
        for (let i = 0; i < text.length; i++) {
            temp += text[i];
            if (dict[temp] !== undefined) {
                result += dict[temp];
                temp = '';
            } else if (Object.values(dict).some(value => value.startsWith(temp))) {
                continue;
            } else {
                result += temp;
                temp = '';
            }
        }
        return result;
    }

    encryptBtn.addEventListener('click', () => {
        const text = inputText.value.toLowerCase().replace(/[^a-z]/g, '');
        const encryptedText = substitute(text, substitutionDict);
        outputText.value = encryptedText;
    });

    decryptBtn.addEventListener('click', () => {
        const text = outputText.value;
        const decryptedText = reverseSubstitute(text, reverseSubstitutionDict);
        outputText.value = decryptedText;
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(outputText.value)
            .then(() => alert('Texto copiado al portapapeles'))
            .catch(err => alert('Error al copiar el texto: ' + err));
    });
});
