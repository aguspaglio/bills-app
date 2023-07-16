import { faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { MotiView, AnimatePresence } from 'moti'
import { FC, useEffect, useState } from 'react'
import { Alert, FlatList, TouchableOpacity, View } from 'react-native'
import { useStore } from '../../../../store'
import CustomInput from '../../../components/CustomInput'
import CustomText from '../../../components/CustomText'
import ItemCard from '../../../components/ItemCard'
import { Colors } from '../../../theme/colors'
import { removeItem } from '../../../utils/utils'
import { ListItem } from '../interface'
import { styles } from "./styles"
import { FIREBASE_DB, FIREBASE_APP } from '../../../../firebaseConfig'
import { collection, onSnapshot } from '@firebase/firestore'
import { useNavigation } from '@react-navigation/core'


interface NewListProps {
    route: any
}

const NewList: FC<NewListProps> = ({ route }) => {
    const { listOfShoppingLists, updateList, removeList } = useStore()
    const navigation = useNavigation()

    const id = route?.params?.id
    const type = route?.params?.type
    const index = route?.params?.index

    const selectedList = listOfShoppingLists[index]?.list
    const listInitialState = type === 'new' ? [] : selectedList

    const [input, setInput] = useState<string>("")
    const [list, setList] = useState<ListItem[]>(listInitialState)
    const [suggestions, setSuggestions] = useState<ListItem[]>([])
    const [filteredSuggestions, setFilteredSuggestions] = useState<ListItem[]>(suggestions)


    const handleInputChange = (inputText: string) => {
        setInput(inputText);
    };

    const onPressAdd = (item: string) => {
        if (item === '') return
        if (type === 'new') {
            let newArray = [{ name: item, isChecked: false, quantity: 1 }, ...list]
            setList(newArray)
        } else {
            let newArray = [{ name: item, isChecked: false, quantity: 1 }, ...selectedList]
            setList(newArray)
        }
        setInput('')
    }

    const handleCheckItemCard = (itemName: string) => {
        setList((prevList) =>
            prevList.map((item) =>
                item.name === itemName ? { ...item, isChecked: !item.isChecked } : item
            )
        );
    };

    const handleRemoveItem = (itemName: string) => {
        Alert.alert(
            'Confirmación',
            '¿Estás seguro de que deseas eliminar este producto?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', style: 'destructive', onPress: () => removeItem(list, itemName, setList) },
            ]
        );
    }

    const handleFinishList = () => {
        removeList(id)
        setList([])
        return navigation.navigate("ShoppingListHome")
    }

    // sugerencias desde firebase
    useEffect(() => {
        const dbRef = collection(FIREBASE_DB, 'shop-suggestions')
        const subscriber = onSnapshot(dbRef, {
            next: (snapshot) => {
                const dbSuggestions: any[] = []
                snapshot.docs.forEach((sgt) => {
                    dbSuggestions.push(sgt.data())
                })
                setSuggestions(dbSuggestions)
            }
        })

        return () => subscriber()

    }, [])

    //filtramos las sugerencias segun lo que tipea el usuario
    useEffect(() => {
        const filteredSuggestions = suggestions.filter((sgt) =>
            sgt?.name?.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredSuggestions(filteredSuggestions)
    }, [input])

    useEffect(() => {
        const search = list.findIndex((item) => item.isChecked === false);
        if (search === -1 && list.length > 0) {
            Alert.alert(
                'Confirmación',
                '¿Terminaste tus compras?',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Confirmar', onPress: () => handleFinishList() }
                ]
            )
        }
    }, [list])

    useEffect(() => {
        if(list.length > 0){
            updateList({ id, list }, id)
            console.log("Tiene elementos")
        } else{
            console.log("No tiene elementos")
        }
    }, [list])


    const handleSwipeRight = (itemName: string) => {
        handleRemoveItem(itemName)
    };


    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <CustomInput onChangeText={handleInputChange} value={input} placeholder="¿Qué vas a comprar?" />
                <TouchableOpacity onPress={() => onPressAdd(input)} style={styles.addButton}>
                    <CustomText color={Colors.white} fontFamily="Pop-Semibold">+</CustomText>
                </TouchableOpacity>
            </View>
            <View style={styles.suggestionsContainer}>
                <AnimatePresence exitBeforeEnter>
                    {input.length > 2 && filteredSuggestions.map((sgt, index) => {
                        return (
                            <MotiView from={{
                                opacity: 0,
                                height: 0,
                                padding: 0,
                                marginBottom: 0,
                            }} animate={{
                                opacity: 1,
                                height: 40,
                                marginBottom: filteredSuggestions.length !== index + 1 ? 8 : 16
                            }} transition={{
                                type: 'timing',
                                duration: 500,
                            }}
                                exit={{
                                    opacity: 0,
                                    height: 0,
                                    padding: 0,
                                    marginBottom: 0
                                }}
                                key={index}
                                style={styles.suggestions}
                            >
                                <TouchableOpacity onPress={() => onPressAdd(sgt.name)} style={styles.suggestion}>
                                    <CustomText color={Colors.white}>{sgt.name}</CustomText>
                                </TouchableOpacity>
                            </MotiView>
                        )
                    })}
                </AnimatePresence>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={type === "new" ? list : listOfShoppingLists[index]?.list}
                    renderItem={({ item, index }) => <ItemCard key={index} onLongPress={() => handleRemoveItem(item.name)} isChecked={item.isChecked} handleCheck={() => handleCheckItemCard(item.name)} title={item.name} onSwipeRight={() => handleSwipeRight(item.name)} />}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.emptyState}>
                                <View>
                                    <CustomText fontSize={12} fontFamily="Pop-Light">Acá verás la lista de productos</CustomText>
                                    <CustomText fontSize={12} fontFamily="Pop-Semibold">¡Agregá alguno!</CustomText>
                                </View>
                                <FontAwesomeIcon size={22} icon={faListCheck} />
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default NewList