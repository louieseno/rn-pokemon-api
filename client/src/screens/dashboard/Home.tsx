import { Text } from '@ui-kitten/components';
import { FlatList, Image, StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { usePokemonsQuery } from 'src/app/api/apiSlice';
import CustomLoading from 'src/components/CustomLoading';

const RenderRowDetails = ({label, value, textStyle, primary}:{label?:string, value?:string, textStyle?:StyleProp<TextStyle>, primary?:boolean}) => {
  return (
    <View style={styles.rowDetails}>
      <Text category='label' style={textStyle} status={primary? 'primary':'basic'}>{label}</Text>
      <Text category='p2'>{value}</Text>
    </View>
  )
}
export default function Home() {
  const { data, isFetching, isLoading } = usePokemonsQuery(null);

  if(isFetching || isLoading) {
    return <CustomLoading/>
  }

  const renderItem = ({item}:any) => {
   return (
    <View style={styles.card}>
      <Image 
        source={{uri: item.image}} 
        loadingIndicatorSource={require("assets/pokemon/poke-ball.png")}
        style={styles.thumbnail} 
        resizeMode='center'
      />
      <View style={styles.details}>
        <RenderRowDetails
          label={item.name.toUpperCase()}
          textStyle={{fontSize: 14}}
          primary
        />
        <RenderRowDetails
          label='Types: '
          value={item.types.map((data: {slot:number, type:{name:string, url:string}}) => {
            return data.type.name
          }).join(', ')}
        />
        <RenderRowDetails
         label='Weight: '
          value={item.weight}
        />
        <RenderRowDetails
         label='Height: '
          value={item.height}
        />
        <RenderRowDetails
         label='Base Experience: '
          value={item.base_experience}
        />
      </View>
    </View>
   )
  }
  return (
   <FlatList
    data={data?.pokemons}
    keyExtractor={(item)=> item.id}
    renderItem={renderItem}
   />
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 150, 
    height: 150
  },
  card: {
    flexDirection:'row',
    borderWidth: 2,
    borderRadius: 4,
    marginBottom: 5,
    marginHorizontal: 10
  },
  details: {
    flexDirection:'column',
    justifyContent:'center',
    marginLeft: 10
  },
  rowDetails: {
    flexDirection:'row',
    marginBottom: 3
  }
})