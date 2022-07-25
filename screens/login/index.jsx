import React, { useState, useEffect } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { Button, Input, Image } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { signInUser, auth } from "../../service/userService";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showIndicator, setShowIndicator] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if (authUser) {
                setShowIndicator(false);
                navigation.replace("Home");
            } else {
                setShowIndicator(false);
            }
        }, []);

        return unsubscribe;
    }, [])


    const signIn = async () => {
        if (!!email && !!password) {
            try {
                const authUser = await signInUser(email, password);
                if (authUser) {
                    navigation.replace('Home');
                }
            } catch (error) {
                alert(error.message);
            }
        } else {
            alert("You have to fill the required form fields");
        }
    }

    const register = () => {
        navigation.navigate('Register');
    }

    return (
        <>
            {showIndicator 
                ? <ActivityIndicator size={'large'} color="gray" /> :
                <KeyboardAvoidingView behavior='padding' enabled style={styles.container}>
                    <StatusBar style='light' />
                    <Image source={{
                        uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
                    }}
                        style={{ width: 200, height: 200 }} />

                    <View style={styles.inputContainer}>
                        <Input
                            value={email}
                            autoFocus
                            autoComplete='email'
                            onChangeText={text => setEmail(text)}
                            placeholder='Email'
                            textContentType='emailAddress' />

                        <Input
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder='Password'
                            secureTextEntry
                            textContentType='password' />
                    </View>
                    <Button containerStyle={styles.button} onPress={signIn} title="Login" />
                    <Button containerStyle={styles.button} onPress={register} type="outline" title="Register" />
                </KeyboardAvoidingView>}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        width: 300,
    },

    button: {
        width: 200,
        marginTop: 10
    }
});