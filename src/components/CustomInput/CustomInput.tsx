import React, { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { Colors } from '../../theme/colors';
import { styles } from './styles';

interface CustomInputProps extends TextInputProps {
    // Agrega cualquier otra prop específica que necesites para tu componente
    customProp?: string;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
    const { customProp, ...restProps } = props;

    const [isFocused, setIsFocused] = useState(false);

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };

    const inputStyle = {
        borderColor: Colors.black,
        borderWidth: isFocused ? 1 : 0,
    };

    return (
        <TextInput
            {...restProps}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            style={[styles.input, inputStyle]}
        />
    );
};

export default CustomInput;
