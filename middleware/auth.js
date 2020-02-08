export default function({ store, redirect, route }) {
  store.state.user != null && route.name === 'index' ? redirect('/notes') : ''
  store.state.user == null && isNotesRoute(route) ? redirect('/') : ''
}

function isNotesRoute(route) {
  if (route.matched.some((record) => record.path === '/notes')) {
    return true
  }
}
