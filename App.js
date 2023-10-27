import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
const dummyData = {
  coord: {
    lon: 107.6186,
    lat: -6.9039,
  },
  weather: [
    {
      id: 802,
      main: "Clouds",
      description: "scattered clouds",
      icon: "03n",
    },
  ],
  base: "stations",
  main: {
    temp: 22.94,
    feels_like: 22.91,
    temp_min: 22.94,
    temp_max: 22.94,
    pressure: 1014,
    humidity: 62,
    sea_level: 1014,
    grnd_level: 932,
  },
  visibility: 10000,
  wind: {
    speed: 0.81,
    deg: 57,
    gust: 1.94,
  },
  clouds: {
    all: 44,
  },
  dt: 1698409376,
  sys: {
    country: "ID",
    sunrise: 1698359023,
    sunset: 1698403377,
  },
  timezone: 25200,
  id: 1650357,
  name: "Bandung",
  cod: 200,
};

const App = () => {
  const [weatherData, setWeatherData] = useState(dummyData);
  const [search, setSearch] = useState("Bandung");
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const key = "2be0de6f7ae4a6986d20e7ac228f7281";

  useEffect(() => {
    // Move the useEffect here
    if (isSearch) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric&q=${search}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setWeatherData(data);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }
  }, [search, isSearch]);

  const onPressHandler = () => {
    setIsSearch(true);
  };

  const onChangeHandler = (text) => {
    setSearch(text);
  };

  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>Weather App</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search for a city"
            value={search}
            onChangeText={(text) => {
              onChangeHandler(text);
              setIsSearch(false);
            }}
          />
          <Button
            title="Search"
            onPress={() => onPressHandler()} // Call the function
          />
        </View>
        <View style={styles.weatherInfo}>
          {loading !== true ? (
            <>
              <Text style={styles.weatherInfoText}>
                City: {weatherData.name}
              </Text>
              <Text style={styles.weatherInfoText}>
                Weather: {weatherData.weather[0].main}
              </Text>
              <Text style={styles.weatherInfoText}>
                Temperature: {weatherData.main.temp}°C
              </Text>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    height: 60,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  navbarText: {
    color: "#fff",
    fontSize: 20,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBar: {
    height: 100,
    margin: 20,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  weatherInfo: {
    marginTop: 30,
  },
  weatherInfoText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default App;
