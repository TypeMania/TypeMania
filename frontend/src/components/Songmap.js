//Songmap files, as of 12/4/2022 the songmap has been put on hold due to time constraints
const Songmap =  (title, artist, bpm, npm, length, seed, uploadedBy, songFilePath) => {

     const INITIAL_ARRAY = [];

     return { title: title, 
            artist: artist,
            bpm: bpm,
            npm: npm,
            length: length,
            seed: seed,
            songFilePath: songFilePath,
            INITIAL_ARRAY
            }
}

export default Songmap;

