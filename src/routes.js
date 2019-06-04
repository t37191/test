import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import HomePage from './components/HomePage'
import Forum from './components/Forum'
import ForumList from './components/ForumList'
import User from './components/User'
import SearchList from './components/SearchList'
import Paper from './components/Paper'
import Expert from './components/Expert'
import UserFav from './components/UserFav'
import ForumNewTopic from './components/ForumNewTopic'
import Keyword from './components/Keyword'
import UserFollow from './components/UserFollow'
import UserPoint from './components/UserPoint'
import Trend from './components/Trend'

export default [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/signin',
        component: SignIn
    },
    {
        path: '/signup',
        component: SignUp
    },
    {
        path: '/forum/topic/:topicId',
        component: Forum
    },
    {
        path: '/forum',
        component: ForumList
    },
    {
        path: '/forum/new',
        component: ForumNewTopic
    },
    {
        path: '/user/:userId',
        component: User,
        children: [
            {
                path: 'fav',
                component: UserFav
            },
            {
                path: 'follow',
                component: UserFollow
            },
            {
                path: 'point',
                component: UserPoint
            }
        ]
    },
    {
        path: '/search/:searchType/:searchContent',
        component: SearchList
    },
    {
        path: '/paper/:paperId',
        component: Paper
    },
    {
        path: '/expert/:expertId',
        component: Expert
    },
    {
        path: '/keyword/:keyword',
        component: Keyword
    },
    {
        path: '/trend/:trendId',
        component: Trend
    },
    {
        path: '/trendPost',
        component: ForumNewTopic
    }
]