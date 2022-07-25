import { StyleSheet } from 'react-native'
import { ListItem, Avatar } from "@rneui/themed";

const CustomListItem = ({ id, photoUrl, title, subTitle, enterChat }) => {
    return (
        <ListItem bottomDivider onPress={() => enterChat(id, title, photoUrl)} key={id}>
            <Avatar
                rounded
                source={{
                    uri: photoUrl || "https://pcgacademia.pl/wp-content/themes/pcgacademia-child/images/png/avatar-placeholder.png"
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={styles.title}>
                    {title}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    {subTitle || "This is a subtitle"}
                </ListItem.Subtitle >
            </ListItem.Content> 
        </ListItem>
    )
}

export default CustomListItem;

const styles = StyleSheet.create({
    title: {
        fontWeight: "800",
    }
});