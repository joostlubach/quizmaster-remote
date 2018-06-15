import {createStackNavigator} from 'react-navigation'

import HomeScreen from './home/HomeScreen'
import QuizScreen from './quiz/QuizScreen'

const AppNavigator = createStackNavigator({
  home: {
    screen: HomeScreen,
  },
  quiz: {
    screen: QuizScreen
  }
}, {
  headerMode: 'none'
})

export default AppNavigator