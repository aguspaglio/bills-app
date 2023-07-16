import React, { FC } from 'react'
import CustomText from '../CustomText'
import { TouchableOpacity } from 'react-native'
import { styles } from './styles'
import { Colors } from '../../theme/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface CustomButtonProps {
    onPress: () => void,
    title: string,
    icon?: IconProp,
    type?: 'primary' | 'secondary'
}

const CustomButton: FC<CustomButtonProps> = ({ onPress, title, icon, type = 'primary' }) => {
    const typePrimary = type === 'primary'
    return (
        <TouchableOpacity
            style={ [styles.button, { backgroundColor: typePrimary ? Colors.black : Colors.yellow.one }]}
            onPress={onPress}>
            {icon && <FontAwesomeIcon style={{marginRight: 6}} color={typePrimary ? Colors.white : Colors.black} icon={icon} />}
            <CustomText color={typePrimary ? Colors.white : Colors.black} fontFamily="Pop-Semibold">{title}</CustomText>
        </TouchableOpacity>
    )
}

export default CustomButton