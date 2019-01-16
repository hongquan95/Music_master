import React, { Component } from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import './App.css';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer BQBq5gbsx4dy_IXY4K4KvEjI--_iKAScMJsBb1F2S3qWcNu5Xj9w7DnHLOqv0EOfe3ceh-7p9MiN408vPR_9R0gIO7-8VYQlnyiI3avXWIrmbUZjQ14TVI7aYOQ4-bS7XuDmvT7YKKMkbu5hrT1Rq-nxgtCD-ZRoDc6rvi4HIOCjO6y6IzqLSM5-pQ`,
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
            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US`
            fetch(FETCH_URL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer BQCwHJ4FEUW94LvK1rFCpREm0bPfWi_aaTNX7KVIv7aREMQHKFoIUMGmYFb1zABu-W6e4kJqevb__eUmflRWc-YOxE-ijVv8T0RFF4KtSsghuqHifbNSJDtAmiB0IgzZd-csVGESiyGDi4uVzNpnsHAOvDZ1JUYi487LbIcmGh2wv0pQZ2JypejKOw',
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
                <Gallery
                    tracks={this.state.tracks}
                />
            </div>
        );
    }
}

export default App;
