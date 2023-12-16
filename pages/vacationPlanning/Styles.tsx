import {StyleSheet} from "react-native";

export const dimens  = {
   sp16: 16,
   px8: 8,
   px16: 16
}
export const styles = StyleSheet.create({
   informationWrapper: {
      padding: dimens.px16
   },

   mainText: {
      fontSize: dimens.sp16,
      fontWeight: 'bold'
   },

   divider: {
      marginVertical: dimens.px8
   },

   actionButton: {
      position: 'absolute',
      margin: dimens.px16,
      right: dimens.px16,
      bottom: dimens.px16
   },

   cardWrapper: {
      marginBottom: dimens.px16,
      marginLeft: dimens.px16,
      marginRight: dimens.px16
   }

});