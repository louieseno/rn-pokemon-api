import { useFocusEffect } from '@react-navigation/native';
import { Text } from '@ui-kitten/components';
import { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
} from 'react-native';
import { useLazyPokemonsQuery } from 'src/app/api/apiSlice';
import {
  appendList,
  clearList,
  pokemonSelectors,
} from 'src/app/features/pokemonSlice';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';

const RenderRowDetails = ({
  label,
  value,
  textStyle,
  primary,
}: {
  label?: string;
  value?: string;
  textStyle?: StyleProp<TextStyle>;
  primary?: boolean;
}) => {
  return (
    <View style={styles.rowDetails}>
      <Text
        category="label"
        style={textStyle}
        status={primary ? 'primary' : 'basic'}
      >
        {label}
      </Text>
      <Text category="p2">{value}</Text>
    </View>
  );
};
export default function Home() {
  const [refreshing, setRefreshing] = useState(true);
  const [fetchMore] = useLazyPokemonsQuery();
  const dispatch = useAppDispatch();
  const pokemons: Pokemons[] = useAppSelector(pokemonSelectors.getPokemons);
  const next: string = useAppSelector(pokemonSelectors.getNext);

  const loadPokemons = () => {
    fetchMore(next ? next : null)
      .unwrap()
      .then((response) => {
        dispatch(
          appendList({
            list: response?.pokemons,
            next: response?.next,
            prev: response?.previous,
          })
        );
      })
      .catch(() => {
        Alert.alert('Something Went Wrong!');
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      loadPokemons();
      return () => dispatch(clearList());
    }, [])
  );

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.image }}
          loadingIndicatorSource={require('assets/pokemon/poke-ball.png')}
          style={styles.thumbnail}
          resizeMode="center"
        />
        <View style={styles.details}>
          <RenderRowDetails
            label={item.name.toUpperCase()}
            textStyle={{ fontSize: 14 }}
            primary
          />
          <RenderRowDetails
            label="Types: "
            value={item.types
              .map(
                (data: {
                  slot: number;
                  type: { name: string; url: string };
                }) => {
                  return data.type.name;
                }
              )
              .join(', ')}
          />
          <RenderRowDetails label="Weight: " value={item.weight} />
          <RenderRowDetails label="Height: " value={item.height} />
          <RenderRowDetails
            label="Base Experience: "
            value={item.base_experience}
          />
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadPokemons} />
      }
    />
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 150,
    height: 150,
  },
  card: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 4,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  rowDetails: {
    flexDirection: 'row',
    marginBottom: 3,
  },
});
