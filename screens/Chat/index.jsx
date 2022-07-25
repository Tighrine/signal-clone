import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { Avatar, Input } from "@rneui/themed";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Keyboard } from "react-native";
import { getDocMessages, Timestamp, updateDocMessages } from "../../service/dataService";
import { auth } from "../../firebase";

const ChatScreen = ({ route, navigation }) => {

    const { id, chatName, photoUrl } = route.params;
    const [messageToSend, setMessageToSend] = useState("");
    const [messages, setMessages] = useState([]);
    const scrollView = useRef(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: 'left',
            headerBackTitleVisible: false,
            headerTitle,
            headerRight
        });

        return () => {
        };
    }, []);

    useEffect(() => {
        let unsubscribe = () => {};
        const getMessages = async () => {
            try {
                unsubscribe = await getDocMessages('chats', id, snapshot => {
                    setMessages(snapshot.data().messages);
                });
            } catch (error) {
                alert(error.message)
            }
        }
        getMessages();
        return () =>{ 
            !!unsubscribe && unsubscribe();
            setMessages([]);
        };
    }, []);


    const headerTitle = () => (
        <View style={styles.headerTitle}>
            <Avatar rounded source={{ uri: photoUrl }} />
            <Text style={styles.title}>{chatName}</Text>
        </View>
    );

    const headerRight = () => (
        <View style={styles.headerRight}>
            <TouchableOpacity>
                <FontAwesome name="video-camera" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name="call" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );

    const sendMessage = async () => {
        if (!!messageToSend) {
            Keyboard.dismiss();
            try {
                await updateDocMessages('chats', id, {
                    timestamp: Timestamp.now(),
                    messageToSend,
                    displayName: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    photoURL: auth.currentUser.photoURL
                });
                setMessageToSend('');
                scrollToLastMsg();
            } catch (error) {
                alert(error.message);
            }
        }
    }

    const scrollToLastMsg = () => {
        scrollView.current.scrollToEnd();
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : ""}
                style={styles.KeyboardContainer}
            >
                <>
                    <ScrollView
                        ref={scrollView}
                        onLayout={scrollToLastMsg}
                        contentContainerStyle={{ padding: 15 }}
                        onContentSizeChange={scrollToLastMsg}
                    >
                        {
                            !!messages && messages.map(message =>
                                message.email === auth.currentUser.email ? (
                                    <View key={message.timestamp.seconds} style={styles.receiver}>
                                        <Avatar
                                            position="absolute"
                                            bottom={-12}
                                            right={-5}
                                            rounded
                                            source={{ uri: message.photoURL }} />
                                        <Text style={styles.textReceiver}>{message.messageToSend}</Text>
                                    </View>
                                ) : (
                                    <View key={message.timestamp.seconds} style={styles.sender}>
                                        <Avatar
                                            position="absolute"
                                            bottom={-10}
                                            left={-2}
                                            rounded
                                            key={message.timestamp.seconds}
                                            source={{ uri: message.photoURL }} />
                                        <Text style={styles.textSender}>{message.messageToSend}</Text>
                                        <Text style={styles.senderName}>{message.displayName}</Text>
                                    </View>
                                )
                            )
                        }
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput
                            placeholder="Signal Message"
                            value={messageToSend}
                            onChangeText={txt => setMessageToSend(txt)}
                            style={styles.textInput}
                            multiline />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                            <Ionicons name="send" size={24} color="#2B68E6" />
                        </TouchableOpacity>
                    </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    KeyboardContainer: {
        flex: 1
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15
    },

    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "gray",
        borderRadius: 30
    },

    headerTitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },

    headerRight: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 80,
        marginRight: 8
    },

    title: {
        color: "white",
        marginLeft: 10,
        fontWeight: "700"
    },

    receiver: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },

    sender: {
        padding: 15,
        backgroundColor: '#2B68E6',
        alignSelf: "flex-start",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },

    textSender: {
        fontWeight: "500",
        color: 'white',
        marginLeft: 10,
        marginBottom: 15
    },

    textReceiver: {
        color: 'black',
        marginRight: 15,
        marginBottom: 10    
    },

    senderName: {
        color: "white",
        alignSelf: 'flex-end',
        fontSize: 10,
        fontWeight: "bold",
        marginBottom: 10
    }
});