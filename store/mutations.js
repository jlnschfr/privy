import { firestore } from '@/plugins/firebase.js'

export default {
  setUser(state, payload) {
    state.user = payload
  },
  setNotes(state, payload) {
    state.notes = payload
    state.isFetchingNotes = false
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
  setIsFetchingNotes(state) {
    state.isFetchingNotes = true
  },
  setCurrentTag(state, payload) {
    state.currentTag = payload
  },
  sortNotes(state) {
    // TODO: Needs Refactoring
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
  reset(state) {
    state.user = null
    state.persistence = null
    state.isFetchingNotes = false
    state.currentTag = null
    state.notes = null
    state.store = null
  },
  setPersistence(state, payload) {
    state.persistence = payload
  }
}
