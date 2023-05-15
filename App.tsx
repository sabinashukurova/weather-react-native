import axios from 'axios';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ImageBackground, TextInput, Image } from 'react-native';
import Icons from './Icon';

type ICountryProps = {
  name: string,
  sys: any,
  country: string,
  main: any,
  temp_min: number,
  temp_max: number,
  weather: any
}

export default function App() {
  const [input, setInput] = useState("")
  const [data, setData] = useState<ICountryProps>()
  const [loading, setLoading] = useState(false)
  const [icon, setIcon] = useState('')

  const api = {
    key: '457ce8ff6e3334689ef6bd5ef53d7ad3',
  }

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput("")
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
    .then((response) => {
      console.log(response.data)
      setData(response.data)
      setIcon(response.data.weather[0].main)
    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }, [api.key, input])

  const img ={ uri: 'https://openweathermap.org/img/wn/10d@2x.png'}

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/7277678.webp')}
        resizeMode="cover"
        style={styles.image}>
          <View>
            <TextInput 
              placeholder='Enter city name'
              onChangeText={text => setInput(text)}
              value={input}
              placeholderTextColor={"#A5A5A5"}
              style={styles.textInput}
              onSubmitEditing={fetchDataHandler}
            />
          </View>
          {loading && (
            <View>
              <ActivityIndicator size={'large'} color="#000" />
            </View>
          )}
          {data && (
          <View style={styles.infoView}>
            <Text style={styles.cityCountry}>{`${data?.name}, ${data?.sys.country}`}</Text>
            <Text style={styles.data}>{new Date().toLocaleString()}</Text>
            <Text style={styles.temp}>{`${Math.round(data?.main?.temp)}°C`}</Text>
            <Text style={styles.minMax}>{`Min ${Math.round(data?.main?.temp_min)}°C / Max ${Math.round(data?.main?.temp_max)}°C`}</Text>
            <View style={styles.current}>
            <Image
              style={styles.largeIcon}
              source={img}
            />
          </View>
          </View>)}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    padding: 15,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: '#C3C3C3',
    fontSize: 19,
    borderRadius: 16,
    opacity: 10
  },
  infoView: {
    alignItems: 'center'
  },
  cityCountry: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold'
  },
  data: {
    color: 'white',
    marginVertical: 10,
    fontSize: 22,
  },
  temp: {
    fontSize: 45,
    color: '#fff',
    marginVertical: 10,
  },
  minMax: {
    fontSize: 22,
    color: '#fff',
    marginVertical: 10,
    fontWeight: '500'
  },
  current: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center'
  },
  largeIcon: {
    width: 300,
    height: 250
  }
});
