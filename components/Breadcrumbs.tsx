import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Text } from "react-native-paper";

export type BreadcrumbsProps = {
    /** Array of path elements in the order they should be shown. */
    path: { id: string, name: string }[],
    /** A function to be called with the id of a path element when clicked. */
    onClick?: (id: string) => void,
    /** The separator to use between path elements. */
    separator?: string;
    /** Styling for the whole breadcrumb container. */
    containerStyle?: StyleProp<ViewStyle>,
    /** Styling for items (including separators). */
    itemStyle?: StyleProp<TextStyle>,
};

export function Breadcrumbs(props: BreadcrumbsProps) {
    const separator = props.separator ?? "›";
    return (
        <View style={StyleSheet.compose(styles.inlineText, props.containerStyle)}>
            {props.path.map((el, idx) => {
                const withSeparator = idx > 0 && idx < props.path.length;
                const textStyle = idx === props.path.length - 1
                    ? styles.highlightText
                    : styles.noHighlightText;

                return <View style={styles.inlineText} key={el.id}>
                    {withSeparator && <Text variant="labelMedium" style={StyleSheet.compose(styles.noHighlightText, props.itemStyle)}>{separator}</Text>}
                    <Text
                        style={StyleSheet.compose(textStyle, props.itemStyle)}
                        variant="labelMedium"
                        onPress={() => {
                            if (props.onClick) props.onClick(el.id);
                        }}
                    >{el.name}</Text>
                </View>
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    inlineText: {
        display: "flex",
        flexDirection: "row",
        gap: 8
    },
    noHighlightText: {
        color: "gray",
    },
    highlightText: {
        color: "black",
    }
});