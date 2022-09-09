export default function (context) {
  if (!context.store.state.session.user) {
    context.store.dispatch('session/nuxtServerInit', context)
  }
}
