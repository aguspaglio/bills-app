import { faArrowLeft, faBagShopping, faChevronLeft, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native'
import Bills from './src/modules/Bills/Bills'
import ShoppingListHome from './src/modules/ShoppingList/Home/Home'
import NewList from './src/modules/ShoppingList/NewList'
import { Colors } from './src/theme/colors'
import { MainStackParamList } from './src/types/navigation'

const Tab = createBottomTabNavigator()

const ShoppingListNavigator = createNativeStackNavigator()


const ShoppingListStack = () => {
const navigation = useNavigation()
  return (
    <ShoppingListNavigator.Navigator
      initialRouteName="ShoppingListHome"
      >
      <ShoppingListNavigator.Screen
        component={ShoppingListHome}
        name="ShoppingListHome"
        options={{
          headerTitle: "Lista de Compras"
        }}
      />
      <ShoppingListNavigator.Screen
        component={NewList}
        name="NewList"
        options={{
          headerTitle: "Nueva lista",
          headerBackTitleVisible: false,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faChevronLeft}/>
              </TouchableOpacity>
            )
          }
        }}
      />
    </ShoppingListNavigator.Navigator>
  )
}

const MyTabs = () => {
  return (
    <Tab.Navigator initialRouteName="ShoppingListStack">
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.black,
          tabBarLabel: "Lista de Compras",
          tabBarIcon: () => <FontAwesomeIcon size={22} color={Colors.black} icon={faBagShopping} />
        }}
        name="ShoppingListStack"
        component={ShoppingListStack} />
      <Tab.Screen
        options={{
          tabBarActiveTintColor: Colors.black,
          headerTitle: "Facturas",
          tabBarLabel: "Facturas",
          tabBarIcon: () => <FontAwesomeIcon size={22} color={Colors.black} icon={faFileInvoiceDollar} />,
        }}
        name="Bills" component={Bills} />
    </Tab.Navigator>
  )
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  )
}

export default Navigation
