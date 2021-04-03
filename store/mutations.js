import { firestore } from '@/plugins/firebase.js'

export default {
  setIsPersistent(state, payload) {
    state.isPersistent = payload
  },
  setUser(state, payload) {
    state.user = payload
  },
  setNotes(state, payload) {
    state.notes = payload
  },
  addNote(state, payload) {
    state.notes.push(payload)
  },
  deleteNote(state, payload) {
    const index = state.notes.findIndex((note) => note.id === payload.id)
    state.notes.splice(index, 1)
  },
  updateNote(state, payload) {
    const index = state.notes.findIndex((note) => note.id === payload.id)
    state.notes[index] = payload
  },
  setIsSyncing(state, payload) {
    state.isSyncing = payload
  },
  setCurrentTag(state, payload) {
    state.currentTag = payload
  },
  sortNotes(state) {
    state.notes.sort((a, b) => {
      if (a.isFav || b.isFav) {
        if (a.isFav && !b.isFav) {
          return -1
        } else if (a.isFav && b.isFav) {
          return Date.parse(a.createdDate) >= Date.parse(b.createdDate) ? -1 : 1
        } else {
          return 1
        }
      } else if (Date.parse(a.createdDate) >= Date.parse(b.createdDate)) {
        return -1
      } else {
        return 1
      }
    })
  },
  setStore(state, payload) {
    state.store = firestore.collection('user').doc(payload)
  },
  setSnackbar(state, payload) {
    state.snackbar = payload
  },
  setSnackbarIsActive(state, payload) {
    state.snackbarIsActive = payload
  },
  setWeather(state, payload) {
    state.weather = {
      data: payload,
      date: new Date(),
    }
  },
  setLocation(state, payload) {
    state.location = payload
  },
  reset(state) {
    state.user = null
    state.isSyncing = false
    state.currentTag = null
    state.notes = null
    state.store = null
    state.snackbar = null
    state.snackbarIsActive = false
    state.weather = null
    state.location = null
  },
}
