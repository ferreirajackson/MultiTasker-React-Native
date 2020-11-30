import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import Home from './src/components/home';
import Weather from './src/components/weather';
import Conversor from './src/components/conversor';
import Records from './src/components/records';

const navigator = createStackNavigator({
    Home: { screen: Home },
    Weather: { screen: Weather },
    Conversor: { screen: Conversor },
    Records: { screen: Records }
});

export default createAppContainer(navigator);