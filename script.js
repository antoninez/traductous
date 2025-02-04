function replaceLastSyllable() {
    const input = document.getElementById('input').value;
    const output = document.getElementById('output');

    if (input.trim() === "") {
        output.value = "";
        return;
    }

    // Séparer le texte en lignes
    const lines = input.split(/\r?\n/);

    // Traiter chaque ligne
    const translatedLines = lines.map(line => {
        // Séparer les mots par un espace
        const words = line.split(/\s+/);

        // Appliquer la traduction sur chaque mot
        const translatedWords = words.map(word => {
            // Utiliser une expression régulière qui prend en compte les accents
            return word.replace(/[aàâäeéèêëiîïoôöuùûüyÿAÀÂÄEÉÈÊËIÎÏOÔÖUÙÛÜYŸ]+[^aàâäeéèêëiîïoôöuùûüyÿAÀÂÄEÉÈÊËIÎÏOÔÖUÙÛÜYŸ]*$/u, "ous");
        });

        // Rejoindre les mots traduits avec un espace
        return translatedWords.join(" ");
    });

    // Rejoindre les lignes traduites en préservant les sauts de ligne
    output.value = translatedLines.join("\n");
}
