import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Text } from "@rneui/themed";

import { createUser, updateUserData } from "../../service/userService";

const RegisterScreen = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const register = async () => {
        if (email != "" && pwd != "") {
            try {
                let user = await createUser(email, pwd);
                if(user) {
                    await updateUserData({
                        displayName: name,
                        photoURL: imgUrl || "https://pcgacademia.pl/wp-content/themes/pcgacademia-child/images/png/avatar-placeholder.png"
                    });
                    
                }
            } catch (error) {
                alert(error.message)
            }
        } else {
            alert("You have to fill the required form fields");
        }
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal account
            </Text>

            <View style={styles.inputContainer}>
                <Input
                    placeholder='Full name'
                    autoFocus
                    textContentType='name'
                    value={name}
                    onChangeText={text => setName(text)} />
                <Input
                    placeholder='Email'
                    textContentType='emailAddress'
                    value={email}
                    onChangeText={text => setEmail(text)} />
                <Input
                    placeholder='Password'
                    textContentType='password'
                    secureTextEntry
                    value={pwd}
                    onChangeText={text => setPwd(text)} />
                <Input
                    placeholder='Profile picture url (optional)'
                    textContentType='URL'
                    value={imgUrl}
                    onChangeText={text => setImgUrl(text)}
                    onSubmitEditing={register} />
            </View>
            <Button onPress={register} title="Register" containerStyle={styles.button} />
        </KeyboardAvoidingView>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    }
});