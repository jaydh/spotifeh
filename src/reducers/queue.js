import { List } from 'immutable';
import shuffle from 'immutable-shuffle';
export default (
  state = {
    queue: List(),
    currentTrack: null,
    repeat: true,
    position: 0
  },
  action
) => {
  switch (action.type) {
    case 'PLAY':
      return {
        ...state,
        currentTrack: state.queue.get(state.position).track
      };
    case 'TOGGLE_REPEAT':
      return {
        ...state,
        repeat: !state.repeat
      };
    case 'CLEAR_QUEUE':
      return {
        ...state,
        queue: List(),
        position: 0,
        currentTrack: null
      };
    case 'ADD_SONG_TO_FRONT_QUEUE':
      return {
        ...state,
        queue: state.queue.insert(0, action.song)
      };

    case 'PREV_SONG': {
      const nextPos =
        state.position - 1 < 0 && state.repeat
          ? state.queue.size - 1
          : state.position - 1;
      return {
        ...state,
        position: nextPos,
        currentTrack: state.queue.get(nextPos).track
      };
    }
    case 'NEXT_SONG': {
      const nextPos =
        state.position + 1 >= state.queue.size && state.repeat
          ? 0
          : state.position + 1;
      return {
        ...state,
        position: nextPos,
        currentTrack: state.queue.get(nextPos).track
      };
    }
    case 'ADD_SONG_TO_QUEUE':
      return {
        ...state,
        queue: state.queue.push(action.song)
      };
    case 'SHUFFLE_QUEUE':
      const shuffled = shuffle(state.queue.delete(state.position)).insert(
        0,
        state.queue.find(t => t.track.id === state.currentTrack.id)
      );
      return { ...state, queue: shuffled, position: 0 };
    case 'UPDATE_CURRENT_TRACK':
      return {
        ...state,
        position: state.queue.findIndex(t => t.id === action.track.id),
        currentTrack: action.track
      };
    case 'UPDATE_POSITION':
      return {
        ...state,
        position: action.position,
        currentTrack: state.queue.get(action.position).track
      };
    default:
      return state;
  }
};