import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTubeSearch from 'youtube-api-search';
import SearchBar from './components/searchBar';
import VideoList from './components/videoList';
import VideoDetail from './components/videoDetail';
const API_Key = 'AIzaSyAgNbj_WggmG1ntsvnIFQZMJz01THZF0I4';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('gilmore')

  }

  videoSearch(term){
    YTubeSearch({key: API_Key, term: term}, (videos) =>{
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
       });
    });
  }

  render(){
    const videoSearch = _.debounce((term)=> { this.videoSearch(term)}, 300);
    return (
      <div>
        <SearchBar onSearchChange={videoSearch}/>
        <VideoDetail
          videos={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={ this.state.videos } />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
