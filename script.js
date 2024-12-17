function replaceLastSyllable()
{
	const input  = document.getElementById('input').value;
	const output = document.getElementById('output')     ;

	if (input.trim() === "")
	{
		output.value = "";
		return;
	}

	// Séparer les mots par un espace
	const words = input.split(/\s+/);

	// Appliquer la traduction sur chaque mot
	const translatedWords = words.map(word =>
	{
		return word.replace(/[aeiouyAEIOUY]+[^aeiouyAEIOUY]*$/, "ous");
	});

	// Rejoindre les mots traduits avec un espace
	output.value = translatedWords.join(" ");
}
