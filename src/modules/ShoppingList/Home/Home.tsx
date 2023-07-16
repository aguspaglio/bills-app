import { faCartShopping, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { useStore } from '../../../../store'
import CustomButton from '../../../components/CustomButton'
import CustomText from '../../../components/CustomText'
import { Colors } from '../../../theme/colors'
import { MainStackParamList } from '../../../types/navigation'
import { ShoppingList } from '../interface'
import { styles } from './styles'


const ShoppingListHome = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>()
    const { listOfShoppingLists, updateListStorage } = useStore()

    function generateRandomID(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const loadData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('ShoppingLists');
            if (jsonValue !== null) {
                const data: ShoppingList[] = JSON.parse(jsonValue);
                updateListStorage(data)
                console.log('Datos recuperados correctamente:', data);
            }
        } catch (error) {
            console.log('Error al recuperar los datos:', error);
        }
    };

    useEffect(() => {
        if (listOfShoppingLists.length > 0) return
        loadData()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <FlatList
                    data={listOfShoppingLists}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.cardShopList} onPress={() => navigation.navigate("NewList", { type: 'existing', id: item.id, index: index })}>
                                <View>
                                    <CustomText fontFamily="Pop-Light" fontSize={12}>{`Lista de Compras ID #${item.id}`}</CustomText>
                                    <CustomText fontFamily="Pop-Semibold">{item.list.slice(0, 3).map((it, i) => {
                                        return (
                                            `${it.name}${i === 2 ? '...' : item.list.length > 1 ? ',' : ''} `
                                        )
                                    })}</CustomText>
                                </View>
                                <View style={styles.qtyContainer}>
                                    <FontAwesomeIcon size={16} color={Colors.white} icon={faCartShopping} />
                                    <View style={styles.counter}>
                                        <CustomText fontSize={10}>{item.list.length}</CustomText>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false} />
            </View>
            <View>
                <CustomButton title="Nueva lista" icon={faPlus} onPress={() => navigation.navigate("NewList", { type: "new", id: generateRandomID(0, 1000) })} />
            </View>
        </View>
    )
}

export default ShoppingListHome