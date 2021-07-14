import Dashboard from '../components/home/dashboard';
import SignIn from '../components/auth/signIn';
import VideoRecorder from '../components/home/videoRecorder';


const authRoutes = [
{
    type: 'PUBLIC',
    props: {
        path: '/signin',
        exact: true,
        component: SignIn
    }
  },
  {
    type: 'PRIVATE',
    props: {
        path: '/dashboard',
        exact: true,
        component: Dashboard
    }
  },
  {
    type: 'PUBLIC',
    props: {
        path: '/',
        exact: true,
        component: VideoRecorder
    }
  },
]

export default authRoutes