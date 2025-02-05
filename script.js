function replaceLastSyllable() {
	const input = document.getElementById('input').value;
	const output = document.getElementById('output');
	output.value = traduireEnOus(input);
}



function traduireEnOus(texte) {
	return texte.split(/\r?\n/)
		.map(line =>
			line.split(/\s+/)
				.map(word => {
					// Capture la ponctuation à la fin du mot
					const punctuation = word.match(/[.,!?;:'")\]]$/);
					const cleanWord = punctuation ? word.slice(0, -punctuation[0].length) : word;

					const match = cleanWord.match(/[aàâäeéèêëiîïoôöuùûüyÿAÀÂÄEÉÈÊËIÎÏOÔÖUÙÛÜYŸ]+[^aàâäeéèêëiîïoôöuùûüyÿAÀÂÄEÉÈÊËIÎÏOÔÖUÙÛÜYŸ]*$/u);
					if (match) {
						const lastSyllable = match[0];
						const isUpperCase = lastSyllable === lastSyllable.toUpperCase();
						const replacement = isUpperCase ? 'OUS' : 'ous';
						return cleanWord.slice(0, match.index) + replacement + (punctuation ? punctuation[0] : '');
					}
					return word;
				})
				.join(' ')
		)
		.join('\n');
}



function traduireEtTelecharger(fichier) {
	const reader = new FileReader();
	reader.onload = function (e) {
		const contenuTraduit = traduireEnOus(e.target.result);
		const nomSansExtension = fichier.name.replace(/\.[^/.]+$/, "");
		const nomTraduit = traduireEnOus(nomSansExtension) + ".txt";

		const blob = new Blob([contenuTraduit], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = nomTraduit;
		a.click();
		URL.revokeObjectURL(url);
	};
	reader.readAsText(fichier);
}



document.getElementById('input').addEventListener('input', replaceLastSyllable);
document.getElementById('translateFile').addEventListener('click', () => document.getElementById('fileInput').click());
document.getElementById('fileInput').addEventListener('change', e => e.target.files[0] && traduireEtTelecharger(e.target.files[0]));
document.getElementById('copyOutput').addEventListener('click', () => {
	navigator.clipboard.writeText(document.getElementById('output').value).then(() => {
		alert('Texte copié !');
	}).catch(err => {
		console.error('Erreur lors de la copie : ', err);
	});
});

let secretCode = '';
const correctCode = '3d';

document.addEventListener('keydown', (event) => {
    secretCode += event.key.toLowerCase();
    secretCode = secretCode.slice(-2); // Garde seulement les 8 dernières touches

    if (secretCode === correctCode) {
        document.body.classList.toggle('rotate3D');
    }
});
