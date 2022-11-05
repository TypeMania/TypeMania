const Songmap =  (title, artist, bpm, npm, length, seed, uploadedBy, songFilePath) => {

     const INITIAL_ARRAY = [];

     return { title: title, 
            artist: artist,
            bpm: bpm,
            npm: npm,
            length: length,
            seed: seed,
            uploadedBy: uploadedBy,
            songFilePath: songFilePath,
            INITIAL_ARRAY
            }
}

export default Songmap;

