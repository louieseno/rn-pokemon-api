import { ScrollView, View, ViewStyle} from 'react-native'

type Props = {
    children: React.ReactNode
    customViewStyle?: ViewStyle
    allowBounceVertical?: boolean
}
export default function Layout({children, customViewStyle, allowBounceVertical=false}:Props) {
  return (
    <ScrollView alwaysBounceVertical={allowBounceVertical}>
      <View style={{...customViewStyle}}>
          {children}
      </View>
    </ScrollView>
  )
}
