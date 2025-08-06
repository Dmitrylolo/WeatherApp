import type { RootStackParamList } from '@/navigation/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

import { Example, Startup } from '@/screens';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  const { navigationTheme, variant } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          initialRouteName={Paths.Startup}
          key={variant}
          screenOptions={{
            animationTypeForReplace: 'push',
            headerShown: false,
            presentation: 'card',
          }}
        >
          {/* Main Screens */}
          <Stack.Screen
            component={Startup}
            name={Paths.Startup}
            options={{
              animationTypeForReplace: 'pop',
            }}
          />

          {/* Weather Screens */}
          <Stack.Screen
            component={Example} // TODO: Replace with WeatherScreen
            name={Paths.Weather}
            options={{
              gestureEnabled: false, // Disable swipe back on main screen
            }}
          />

          <Stack.Screen
            component={Example} // TODO: Replace with CityListScreen
            name={Paths.CityList}
          />

          <Stack.Screen
            component={Example} // TODO: Replace with WeatherDetailScreen
            name={Paths.WeatherDetail}
          />

          {/* Modal Screens */}
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              component={Example} // TODO: Replace with SearchScreen
              name={Paths.Search}
              options={{
                gestureDirection: 'vertical',
                gestureEnabled: true,
              }}
            />
          </Stack.Group>

          {/* Keep Example for development */}
          <Stack.Screen component={Example} name={Paths.Example} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
