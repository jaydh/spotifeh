import { List } from 'immutable';

export const toggleRepeat = () => {
  return {
    type: 'TOGGLE_REPEAT'
  };
};

export const updateCurrentTrack = track => {
  return {
    type: 'UPDATE_CURRENT_TRACK',
    track
  };
};
export const addSongToQueue = song => {
  return {
    type: 'ADD_SONG_TO_QUEUE',
    song
  };
};

export const makeNewQueue = songs => {
  return {
    type: 'MAKE_NEW_QUEUE',
    songs
  };
};

export const clearSongQueue = () => {
  return {
    type: 'CLEAR_QUEUE'
  };
};

export const shuffleQueue = () => {
  return {
    type: 'SHUFFLE_QUEUE'
  };
};
export const addSongToFront = song => {
  return {
    type: 'ADD_SONG_TO_FRONT_QUEUE',
    song
  };
};
export const removeSongFromQueue = position => {
  return {
    type: 'REMOVE_SONG_FROM_QUEUE',
    position
  };
};

export const insertSongInQueue = (track, position) => {
  return {
    type: 'INSERT_SONG_IN_QUEUE',
    position,
    track
  };
};

export const updatePosition = position => {
  return {
    type: 'UPDATE_POSITION',
    position
  };
};

export const play = () => {
  return async (dispatch, getState) => {
    const ready =
      getState().player.spotifyReady && getState().player.youtubeReady;
    if (!ready) {
      return;
    }
    if (ready) {
      dispatch({
        type: 'PLAY'
      });
    }
    const position = getState().queue.position;
    const next = getState().queue.queue.get(position);
    const token = getState().token.token;
    const spotifyPaused =
      getState().player.spotifyPlayer && getState().player.spotifyPlayer.paused;
    const apiPlay = ({
      spotify_uri,
      playerInstance: {
        _options: { id }
      }
    }) => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: spotify_uri }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    };
    if (next.youtube) {
      await window.player.pause();
      window.ytPlayer.loadVideoById(next.track.id);
    } else {
      window.ytPlayer.pauseVideo();
      return apiPlay({
        playerInstance: window.player,
        spotify_uri: [next.track.uri]
      });
    }
  };
};

export const nextSong = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'NEXT_SONG'
    });
    const position = getState().queue.position;
    const next = getState().queue.queue.get(position);
    const token = getState().token.token;
    const spotifyPaused =
      getState().player.spotifyPlayer && getState().player.spotifyPlayer.paused;
    const apiPlay = ({
      spotify_uri,
      playerInstance: {
        _options: { id }
      }
    }) => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: spotify_uri }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    };
    if (next.youtube) {
      await window.player.pause();
      window.ytPlayer.loadVideoById(next.track.id);
    } else {
      window.ytPlayer.pauseVideo();
      return apiPlay({
        playerInstance: window.player,
        spotify_uri: [next.track.uri]
      });
    }
  };
};
export const prevSong = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'PREV_SONG'
    });
    return dispatch(play());
  };
};

export const togglePlay = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'TOGGLE_PLAY'
    });
    const position = getState().queue.position;
    const track = getState().queue.queue.get(position);
    if (!track) {
      await window.ytPlayer.pauseVideo();
      const state = await window.player.getCurrentState();
      state ? await window.player.togglePlay() : await dispatch(play());
    } else if (track.youtube) {
      window.ytPlayer.getPlayerState() === 1
        ? window.ytPlayer.pauseVideo()
        : window.ytPlayer.playVideo();
    } else {
      const state = await window.player.getCurrentState();
      state ? window.player.togglePlay() : dispatch(play());
    }
  };
};
