export default function({ store, redirect, route }) {
  store.state.user != null && route.name === 'index' ? redirect('/notes') : ''
  store.state.user == null && route.name === 'note' ? redirect('/') : ''
  store.state.user == null && route.name === 'notes' ? redirect('/') : ''
}
