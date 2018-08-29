export default (
  state = {
    playlistSynced: false,
    songsSynced: false
  },
  action
) => {
  switch (action.type) {
    case 'FETCH_PLAYLIST_MENU_SUCCESS': {
      return { ...state, playlistSynced: true };
    }
    case 'FETCH_SONGS_SUCCESS':
      return { ...state, songsSynced: true };
    case 'FETCH_SONGS_PENDING':
      return { ...state, songsSynced: false };
    case 'FETCH_PLAYLIST_SONGS_PENDING':
      return { ...state, songsSynced: false };
    case 'FETCH_PLAYLIST_SONGS_SUCCESS':
      return { ...state, songsSynced: true };
    default:
      return state;
  }
};