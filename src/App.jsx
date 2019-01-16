import React, { Component } from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import './App.css';
import Profile from './Profile';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer BQBjWwPf61M5iL38y1PK3ivoMVbbiqnNmuutbZ6B4Tv8NoruqN3_n-gVUweEAIDl9Ht_HuktbFaO10OT3L9G7xZZVgFnhrfpgk_oXb4w-g4uRBbzfiwkkJOk7D6GBF0NNRoDq5T-BO5_s20-DeDMzsCWg`,
            },
            tracks: []
        };
    }

    search() {
        const BASE_URL = 'https://api.spotify.com/v1/search';
        let FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = `https://api.spotify.com/v1/artists/`
        fetch(FETCH_URL, {
            method: 'GET',
            headers: this.state.headers
        })
        .then(res => res.json())
        .then(json => {
            const artist =  json.artists.items[0];
            this.setState({artist})
            
            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks&country=US`
            fetch(FETCH_URL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer BQBjWwPf61M5iL38y1PK3ivoMVbbiqnNmuutbZ6B4Tv8NoruqN3_n`,
                },
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                const {tracks} = json;
                this.setState({tracks});
            })
        });
    }
    render() {
        return (
            <div className="App">
                <div className="App-title">Music master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search an Artist..."
                            value={this.state.query}
                            onKeyPress={(event) => {
                                if ((event.key) === 'Enter')
                                this.search();
                            }}
                            onChange={(event) => {this.setState({query: event.target.value})}}
                        />
                        <InputGroup.Addon
                            onClick={() => this.search()}
                        >
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null ?
                        <div>
                            <Profile
                                artist={this.state.artist}
                            />
                        </div> :
                        <div></div>
                }
                <div className="Garelly">
                    Garelly
                </div>
            </div>
        );
    }
}

export default App;
