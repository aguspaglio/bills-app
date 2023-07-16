import React, { Dispatch, SetStateAction, useState } from 'react';
import CustomText from '../CustomText';
import { styles } from './styles';
import { Pressable, TouchableOpacity, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swipeable from 'react-native-swipeable'


interface ItemCardProps {
    title: string,
    isChecked: boolean,
    handleCheck: Dispatch<SetStateAction<boolean>>;
    onLongPress: () => void,
    onSwipeRight?: () => void
}

const ItemCard: React.FC<ItemCardProps> = ({ onSwipeRight, isChecked, title, handleCheck, onLongPress }) => {

    const toggleCheck = () => {
        handleCheck((isChecked) => !isChecked);
    };

    // const rightButtons = [
    //     <TouchableOpacity style={styles.rightButton} onPress={onSwipeRight}>
    //       <FontAwesomeIcon icon={faTrash}/>
    //     </TouchableOpacity>
    //   ];

    return (
        // <Swipeable swipeReleaseAnimationUseNativeDriver={true} overshootFriction={300} rightButtons={rightButtons}>
            <TouchableOpacity onLongPress={onLongPress} style={styles.container}>
                <View style={styles.textContainer}>
                    <CustomText style={isChecked && styles.strikeThrough} fontSize={18} fontFamily="Pop-Semibold">{title}</CustomText>
                    {/* <CustomText style={isChecked && styles.strikeThrough} fontSize={14} fontFamily="Pop-Regular">$450</CustomText> */}
                </View>
                <View>
                    <Pressable onPress={toggleCheck} style={[styles.icon, isChecked && styles.isChecked]}>
                        {isChecked && <FontAwesomeIcon icon={faCheck} />}
                    </Pressable>
                </View>
            </TouchableOpacity>
        // </Swipeable>
    );
};

export default ItemCard;
