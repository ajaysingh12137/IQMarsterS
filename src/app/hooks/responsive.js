import { Dimensions, PixelRatio } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const fontScale = PixelRatio.getFontScale();

export const useFont = (size) => size / fontScale;

export const usePercentageHeight = (percentage) => {
    return (percentage / 100) * screenHeight;
};
export const usePercentageWidth = (percentage) => {
    return (percentage / 100) * screenWidth;
};

export const insets=()=>{
    const insetss =useSafeAreaInsets();
}
