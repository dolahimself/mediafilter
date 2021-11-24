import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Container, List, ListItem, Content, Text, Button } from "native-base";
import Video, { FilterType } from "react-native-video";
// import { useNavigation } from "@react-navigation/core";

export default function App() {
  const Stack = createStackNavigator();
  // const navigation = useNavigation();
  function VideoListScreen({ navigation }) {
    return (
      <Container>
        <Content>
          <List>
            <ListItem
              onPress={() =>
                navigation.navigate("Video Player", {
                  external: true,
                  videoURL: "https://www.w3schools.com/html/mov_bbb.mp4",
                })
              }
            >
              <Text>External Video source</Text>
            </ListItem>
            <ListItem
              onPress={() =>
                navigation.navigate("Video Player", {
                  external: false,
                  videoURL: require("./assets/reactfilter.mp4"),
                })
              }
            >
              <Text>Local Video source</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
  function VideoPlayerScreen({ navigation, route }) {
    const { external, videoURL } = route.params;
    const [filter, setFilter] = React.useState(FilterType.NONE);

    const changeFilter = (filter) => {
      setFilter(filter);
    };
    return (
      <Container>
        <Video
          controls={true}
          paused={true}
          muted={true}
          filterEnabled={true}
          filter={filter}
          source={external ? { uri: videoURL } : videoURL} // Can be a URL or a local file.
          style={{ flex: 1 }}
        />
        <Button
          block
          onPress={() => {
            changeFilter(FilterType.MONOCHROME);
          }}
        >
          <Text>Filter to chrome</Text>
        </Button>
        <Button
          block
          onPress={() => {
            changeFilter(FilterType.MONO);
          }}
        >
          <Text>Filter to mono</Text>
        </Button>
        <Button
          block
          onPress={() => {
            changeFilter(FilterType.FADE);
          }}
        >
          <Text>Filter to fade</Text>
        </Button>
      </Container>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Video List" component={VideoListScreen} />
        <Stack.Screen name="Video Player" component={VideoPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
