import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { Text, Button } from "_/view/components"
import devImg from "_/assets/dev.png"
import { styles } from './styles';
import { COLORS } from '_/constants';
import { useAppDispatch, useAuthSelector } from '_/hooks';
import { authenticateAction } from '_/actions/authActions';
import { useAuthPrompt } from '_/hooks/useAuthPrompt';

export const AuthScreen: React.FC = () => {
    const { isLoading, isAuthenticated } = useAuthSelector()
    const dispatch = useAppDispatch()

    const { promptAuth } = useAuthPrompt()

    const signIn = async () => {
        const credentials = await promptAuth()
        dispatch(authenticateAction(credentials))
    }

    return (
        <View style={styles.container}>
            <Text fontType='h1' fontWeight='bold'>Bem Vindo ao FindDev!</Text>
            <Text fontType='h2' style={styles.subtitle}>Encontre incríveis desenvolvedores próximos a você.</Text>

            <Image source={devImg} style={styles.img} />

            <Button onPress={signIn} style={styles.button} disabled={isAuthenticated}>
                {isLoading ? <ActivityIndicator color={COLORS.WHITE} /> : "Entrar com Github"}
            </Button>
        </View>
    )
}

