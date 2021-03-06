export const setFilter = (filter: string) => {
  return {
    type: 'SET_FILTER',
    filter
  };
};

export const setSort = (sort: string) => {
  return {
    type: 'SET_SORT',
    sort
  };
};

export const toggleShowYoutube = () => {
  return {
    type: 'TOGGLE_SHOW_YOUTUBE'
  };
};

export const toggleShowSpotify = () => {
  return {
    type: 'TOGGLE_SHOW_SPOTIFY'
  };
};

export const setSongSelection = (data: {
  up?: number;
  down?: number;
  selectedSongs?: [];
}) => {
  return {
    type: 'SET_SONG_SELECTION',
    upSelector: data.up,
    downSelector: data.down,
    selectedSongs: data.selectedSongs
  };
};

export const toggleService = (service: string) => {
  return (dispatch: any, getState: any) => {
    const { player } = getState();
    dispatch({ type: 'TOGGLE_SERVICE', service });
  };
};
