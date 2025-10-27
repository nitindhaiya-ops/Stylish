// src/components/InputWithIcon.tsx
import React, { useMemo, useRef, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    TextInputProps,
    Animated,
    Platform,
} from 'react-native';
import { UserIcon, LockIcon, EyeOpenIcon, EyeClosedIcon } from './icons/Icons';
import { COLORS } from '../constants/colors';

type Props = TextInputProps & {
    icon?: 'user' | 'lock'; // left icon type
    secure?: boolean; // if input is password
    placeholder?: string;
};

const InputWithIcon: React.FC<Props> = ({ icon = 'user', secure = false, placeholder, ...rest }) => {
    const [visible, setVisible] = useState(!secure); // visible=false means secureTextEntry=true
    const fadeAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;

    // animate when toggling
    const toggle = () => {
        const toValue = visible ? 0 : 1;
        Animated.timing(fadeAnim, {
            toValue,
            duration: 180,
            useNativeDriver: true,
        }).start();
        setVisible((v) => !v);
    };

    // choose left icon
    const LeftIcon = useMemo(() => (icon === 'lock' ? LockIcon : UserIcon), [icon]);

    return (
        <View style={styles.wrap}>
            <View style={styles.left}>
                <LeftIcon width={20} height={20} color="#626262" />
            </View>

            <TextInput
                style={styles.input}
                placeholder={placeholder}
                secureTextEntry={secure && !visible}
                placeholderTextColor="#999"
                {...rest}
            />

            {secure ? (
                <TouchableOpacity onPress={toggle} style={styles.right} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    {/* crossfade between open and closed eye using animated opacity */}
                    <Animated.View style={[styles.eyeWrap, { opacity: fadeAnim }]}>
                        <EyeClosedIcon width={20} height={20} color="#626262" />
                    </Animated.View>
                    <Animated.View style={[styles.eyeWrap, {
                        position: 'absolute', opacity: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0],
                        })
                    }]}>
                        <EyeOpenIcon width={20} height={20} color="#626262" />
                    </Animated.View>
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A8A8A9',
        height: 55,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'ios' ? 12 : 8,
        backgroundColor: '#f3f3f3',
    },
    left: {
        marginRight: 10,
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.black,
        paddingVertical: 0,
    },
    right: {
        marginLeft: 10,
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
    },
    eyeWrap: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default InputWithIcon;
