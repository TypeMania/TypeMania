import React, { useState, useEffect, Suspense } from "react";
import useMusicPlayer from "../hooks/useMusicPlayer";
//import { getSongData} from "../data/songIndex.js"
import 'bootstrap/dist/css/bootstrap.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';



function SongList() {
    const {playMusic, songsList } = useMusicPlayer();
    //const [data] = useState(getSongData);
    const [currentSongmap, setCurrentSongmap] = useState(songsList[0]);

    function callPlayMusic(songmap){
        playMusic(songmap);
        setCurrentSongmap(songmap);
    }

  return (
    <div id='game-container'>
        <Tab.Container id="song-list" defaultActiveKey={"#" + songsList[0].title}>
            
            <Row>
                <Col sm={8}>
                    <ListGroup>
                        {songsList.map((songmap, index) =>
                            <ListGroup.Item action href={"#" + songmap.title} onClick={() => callPlayMusic(songmap) }>
                                {songmap.title}
                            </ListGroup.Item>
                        )}
                        
                    </ListGroup>   
                </Col>
                <Col sm={4}>
                    <Tab.Content>
                        <Tab.Pane eventKey={"#" + currentSongmap.title}>
                            
                            <table class="table table-sm">
                                <tbody>
                                    <tr>
                                        <th scope="row">Artist</th>
                                        <td>{currentSongmap.artist}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">bpm</th>
                                        <td>{currentSongmap.bpm}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">length</th>
                                        <td>{currentSongmap.length}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Seed</th>
                                        <td>{currentSongmap.seed}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    </div>  
        
  );
}

export default SongList;