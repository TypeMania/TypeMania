const Songmap =  (title, artist, bpm, length, seed, index, songFilePath) => {

     return { title: title, 
            artist: artist,
            bpm: bpm,
            length: length,
            seed: seed,
            songFilePath: songFilePath,
            index
            }
}

export default Songmap;

