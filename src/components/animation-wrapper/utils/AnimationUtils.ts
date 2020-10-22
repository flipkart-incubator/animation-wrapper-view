
import { StyleProp, ViewStyle } from 'react-native';

export default class AnimationUtils {
    public static getRippleStyle(contentWidth: number): StyleProp<ViewStyle> {
        return {
            position: 'absolute',
            marginLeft: 0,
            marginTop: 0,
            borderRadius: contentWidth
        };
    }
}
