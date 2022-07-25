import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import React from 'react'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";
import { signOutUser } from "../../service/userService";
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from "../../firebase";
import CustomListItem from '../../components/CustomListItem';
import { getAllCollectionDocs } from '../../service/dataService';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [chats, setChats] = React.useState([]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft,
            headerRight
        });
    }, []);

    React.useEffect(() => {
        let unsubscribe = () => { };
        async function getChatList() {
            unsubscribe = await getAllCollectionDocs('chats', snapshot => {
                let messages = snapshot.docs.map(doc => {
                    let lastMessage = {};
                    if(doc.data().messages?.length > 0){
                        lastMessage = !!doc.data().messages ? doc.data().messages[doc.data().messages.length - 1] : "Last message here";
                    }
                    
                    return {
                        id: doc.id,
                        data: doc.data(),
                        lastMessage
                    }
                })
                setChats(messages);
            });
        }

        getChatList();

        return () => unsubscribe();
    }, []);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const logOut = async () => {
        try {
            await signOutUser();
            navigation.replace('Login');
        } catch (error) {
            alert(error.message);
        }
    }

    const enterChat = (id, chatName, photoUrl) => {
        navigation.navigate("Chat", {
            id,
            chatName,
            photoUrl
        });
    }

    const goToAddChat = () => {
        navigation.navigate("AddChat", {
            photoURL: auth?.currentUser?.photoURL
        })
    }

    const headerLeft = () => (
        <TouchableOpacity onPress={() => logOut()} activeOpacity={0.5} style={{ marginLeft: 10 }}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
        </TouchableOpacity>
    );

    const headerRight = () => (
        <View style={styles.headerRightContainer}>
            <TouchableOpacity activeOpacity={0.5}>
                <AntDesign name='camerao' size={24} color='black' />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToAddChat} activeOpacity={0.5}>
                <SimpleLineIcons name='pencil' size={24} color='black' />
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {
                    chats.map(chat => (
                        <CustomListItem
                            photoUrl={chat.lastMessage?.photoURL}
                            id={chat.id}
                            title={chat.data.chatTitle}
                            key={chat.id}
                            enterChat={enterChat}
                            subTitle={chat.lastMessage.messageToSend} />
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

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
    },

    headerRightContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 80,
        marginRight: 20
    }
});