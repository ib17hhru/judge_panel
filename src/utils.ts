export function stopAllAudioExcept(one: HTMLAudioElement)
{
	let audios = document.getElementsByTagName('audio');
	for (let i = 0; i < audios.length; i++)
	{
		if (audios[i] != one)
			audios[i].pause()
	}
}

export function appendZeroes(i: number, len: number)
{
	return '0'.repeat(Math.max(0, len - i.toString().length)) + i
}
