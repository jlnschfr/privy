export default function({ store, redirect, route }) {
  store.state.user != null && route.name === 'index' ? redirect('/notes') : ''
  store.state.user == null && isNoteRoute(route) ? redirect('/') : ''
}

function isNoteRoute(route) {
  if (route.matched.some((record) => record.path === '/note')) {
    return true
  }
}
