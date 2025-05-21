import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "@/hooks/useColorScheme";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  // const [initialRoute, setInitialRoute] = useState<string | null>(null);

  // useEffect(() => {
  //   const init = async () => {
  //     const hasSeenIntro = await AsyncStorage.getItem("hasSeenIntro");

  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         setInitialRoute("/index");
  //       } else if (!hasSeenIntro) {
  //         setInitialRoute("/splash"); // show splash → welcome
  //       } else {
  //         setInitialRoute("/login");
  //       }
  //     });
  //   };

  //   init();
  // }, []);

  // if (!loaded || !initialRoute) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         backgroundColor: "#FFB2E3",
  //       }}
  //     >
  //       <Text style={{ color: "#000", fontSize: 24 }}>MiniCoachAI</Text>
  //     </View>
  //   );
  // }

  // // If showing splash, login, welcome → use Stack only
  // if (
  //   initialRoute === "/splash" ||
  //   initialRoute === "/welcome" ||
  //   initialRoute === "/login"
  // ) {
  //   return (
  //     <GestureHandlerRootView style={{ flex: 1 }}>
  //       <BottomSheetModalProvider>
  //         <ThemeProvider
  //           value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
  //         >
  //           <Stack
  //             initialRouteName={initialRoute.replace("/", "")}
  //             screenOptions={{ headerShown: false }}
  //           />
  //           <StatusBar style="auto" />
  //         </ThemeProvider>
  //       </BottomSheetModalProvider>
  //     </GestureHandlerRootView>
  //   );
  // }

  // If authenticated or completed intro → use Drawer
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DefaultTheme : DarkTheme}
        >
          <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ headerShown: false }}
          >
            <Drawer.Screen name="index" />
            <Drawer.Screen name="goals/index" />
            <Drawer.Screen name="coaches/index" />
            <Drawer.Screen name="analytics/index" />
            <Drawer.Screen name="settings/index" />
          </Drawer>
          <StatusBar style="auto" />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
