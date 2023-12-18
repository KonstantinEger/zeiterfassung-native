import {StyleSheet, View} from "react-native";

/**
 * The linear layout layouts its children horizontally
 * @param children
 * @constructor
 */
export const LinearLayout = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});