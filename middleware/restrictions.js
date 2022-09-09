export default function ({ route, redirect, store, error }) {
  const user = store.state.session.user
  if (!user) {
    if (route.path == '/register') return
    if (route.path == '/login') return
    redirect({ path: '/login' })
  }

  const guestOnlyRoutes = ['/login', '/register']
  if (user && guestOnlyRoutes.includes(`/${route.path.toLowerCase().split('/')[1]}`)) {
    redirect({ path: '/' })
  }
}
