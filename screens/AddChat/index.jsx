import { StyleSheet, Text, View } from 'react-native';
import { useLayoutEffect, useState } from 'react';
import { Button, Icon, Input } from '@rneui/themed';
import { addDataToCollection } from '../../service/dataService';

const AddChatScreen = ({ navigation, route }) => {

  const [chatName, setChatName] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add new Chat'
    })
  }, [navigation]);

  const createChat = async () => {
    try {
      await addDataToCollection('chats', { chatTitle: chatName, chatImage: route?.params?.photoURL });
      navigation.goBack();
    } catch (error) {
      alert(error)
    }
  }

  return (
    <View style={styles.container}>
      <Input placeholder='Enter a chat name'
        onChangeText={text => setChatName(text)}
        value={chatName}
        onSubmitEditing={createChat}
        leftIcon={<Icon name='wechat' type='antdesign' size={24} color='black' />}
      />
      <Button disabled={!chatName} onPress={createChat} title="Create a new Chat" />
    </View>
  )
}

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: 'white',
    height: "100%"
  }
});