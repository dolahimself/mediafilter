import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Container, List, ListItem, Content, Text } from "native-base";
import { Video } from "react-native-video";

export default function App() {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  function VideoListScreen({ navigation }) {
    return (
      <Container>
        <Content>
          <List>
            <ListItem
              onPress={() =>
                navigation.navigate("Video Player", {
                  ecternal: true,
                  videoURL: "https://www.w3schools.com/html/mov_bbb.mp4",
                })
              }
            >
              <Text>External Video source</Text>
            </ListItem>
            <ListItem
              onPress={() =>
                navigation.navigate("Video Player", {
                  ecternal: false,
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
  function VideoPlayerScreen({ route }) {
    return (
      <Container>
        <Video
          source={{ uri: "background" }} // Can be a URL or a local file.
        />
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
