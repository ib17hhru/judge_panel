export function stopAllAudioExcept(one: HTMLAudioElement)
{
	let audios = document.getElementsByTagName('audio');
	for (let i = 0; i < audios.length; i++)
	{
		if (audios[i] != one)
			audios[i].pause()
	}
}
