// import { useEffect, useState } from "react";
// import {
//   View,
//   Platform,
//   StatusBar as RNStatusBar,
//   Animated,
//   Text,
//   Image,
// } from "react-native";
// import { Stack } from "expo-router";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// import {
//   ThemeProvider,
//   DarkTheme,
//   DefaultTheme,
// } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "@/lib/firebase";
// import { useColorScheme } from "@/hooks/useColorScheme";

// export default function Layout() {
//   const [initialRoute, setInitialRoute] = useState<string | null>(null);
//   const [showSplash, setShowSplash] = useState(true);
//   const fadeAnim = useState(new Animated.Value(1))[0];
//   const colorScheme = useColorScheme();

//   useEffect(() => {
//     const init = async () => {
//       const hasSeenIntro = await AsyncStorage.getItem("hasSeenIntro");
//       onAuthStateChanged(auth, (user) => {
//         if (user) setInitialRoute("drawer");
//         else if (!hasSeenIntro) setInitialRoute("auth");
//         else setInitialRoute("auth");
//       });
//     };
//     init();
//   }, []);

//   useEffect(() => {
//     if (!initialRoute) return;
//     const timeout = setTimeout(() => {
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 600,
//         useNativeDriver: true,
//       }).start(() => setShowSplash(false));
//     }, 800);
//     return () => clearTimeout(timeout);
//   }, [initialRoute, fadeAnim]);

//   if (showSplash || !initialRoute) {
//     return (
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: "#FFB2E3",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Animated.View style={{ opacity: fadeAnim }}>
//             <Image
//               source={require("../assets/images/logo-black.png")}
//               style={{ width: 150, height: 150 }}
//               resizeMode="contain"
//             />
//             <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold" }}>
//               MiniCoachAI
//             </Text>
//           </Animated.View>
//         </View>
//       </GestureHandlerRootView>
//     );
//   }

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <BottomSheetModalProvider>
//         <ThemeProvider
//           value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
//         >
//           <Stack
//             initialRouteName={initialRoute}
//             screenOptions={{ headerShown: false }}
//           >
//             <Stack.Screen name="drawer" />
//             <Stack.Screen name="auth" />
//           </Stack>
//         </ThemeProvider>
//       </BottomSheetModalProvider>
//     </GestureHandlerRootView>
//   );
// }

// app/_layout.tsx
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar as RNStatusBar,
  Image,
  Animated,
} from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = useState(new Animated.Value(1))[0];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const hasSeenIntro = await AsyncStorage.getItem("hasSeenIntro");

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        // console.log(user);

        if (user) {
          setInitialRoute("index");
        } else if (!hasSeenIntro) {
          setInitialRoute("splash");
        } else {
          setInitialRoute("login");
        }
        setLoading(false);
      });

      return () => unsubscribe();
    };
    init();
  }, []);
  // console.log("initialRoute", initialRoute);
  // console.log("loading", loading);

  useEffect(() => {
    if (!initialRoute) return;
    // Only start fade out when initialRoute is set
    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => setShowSplash(false));
    }, 1000); // Show splash for 1s, then fade out over 2s
    return () => clearTimeout(timeout);
  }, [initialRoute, fadeAnim]);

  // --- FIX: Render splash until fade-out animation is done ---
  // if ((showSplash && initialRoute === null) || loading) {
  //   return (
  //     <GestureHandlerRootView style={{ flex: 1 }}>
  //       <View style={{ flex: 1, backgroundColor: "#000" }}>
  //         <Animated.View
  //           style={{
  //             ...StyleSheet.absoluteFillObject,
  //             justifyContent: "center",
  //             alignItems: "center",
  //             backgroundColor: "#FFB2E3",
  //             paddingTop: Platform.OS === "ios" ? RNStatusBar.currentHeight : 0,
  //             opacity: fadeAnim,
  //           }}
  //         >
  //           <Image
  //             resizeMode="contain"
  //             source={require("../assets/images/logo-black.png")}
  //             style={{ width: 150, height: 150 }}
  //           />
  //           <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold" }}>
  //             MiniCoachAI
  //           </Text>
  //         </Animated.View>
  //       </View>
  //     </GestureHandlerRootView>
  //   );
  // }

  if (["splash", "welcome", "login", "signup"].includes(initialRoute || "")) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack
              initialRouteName={initialRoute ?? "login"}
              screenOptions={{ headerShown: false }}
            />
            <StatusBar style="auto" />
          </ThemeProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    );
  }

  // console.log("initialRoute", initialRoute);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
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
            <Drawer.Screen name="settings/account" />
            <Drawer.Screen name="settings/theme" />
            <Drawer.Screen name="settings/feedback" />
            {/* <Drawer.Screen name="settings/rate" /> */}
            <Drawer.Screen name="settings/support" />
            <Drawer.Screen name="settings/privacy" />
            <Drawer.Screen name="settings/terms" />
            <Drawer.Screen name="settings/about" />
          </Drawer>
          <StatusBar style="auto" />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
