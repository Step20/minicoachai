import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons, Feather, FontAwesome5 } from "@expo/vector-icons";

export default function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      {/* Avatar and Name */}
      <View style={styles.profileContainer}>
        <View style={styles.avatar}></View>
        <Text style={styles.name}>Armand</Text>
        <Text style={styles.name}>Robinson</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menu}>
        <DrawerButton
          label="Calendar"
          icon={<Feather name="calendar" size={28} color={"#5D5F60"} />}
          onPress={() => props.navigation.navigate("index")}
        />
        <DrawerButton
          label="All goals"
          icon={<FontAwesome5 name="mountain" size={28} color={"#5D5F60"} />}
          onPress={() => props.navigation.navigate("goals/index")}
        />
        <DrawerButton
          label="Coaches"
          icon={<Feather name="user-check" size={28} color={"#5D5F60"} />}
          onPress={() => props.navigation.navigate("coaches/index")}
        />
        <DrawerButton
          label="Analytics"
          icon={<Ionicons name="stats-chart" size={28} color={"#5D5F60"} />}
          onPress={() => props.navigation.navigate("analytics/index")}
        />
        <DrawerButton
          label="Settings"
          icon={
            <Ionicons name="settings-outline" size={28} color={"#5D5F60"} />
          }
          onPress={() => props.navigation.navigate("settings/index")}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const DrawerButton = ({ label, icon, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <View style={styles.icon}>{icon}</View>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17191A",
    paddingTop: 40,
  },
  profileContainer: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
  avatar: {
    backgroundColor: "white",
    width: 70,
    height: 70,
    borderRadius: 15,
    marginBottom: 10,
  },
  name: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
  },
  menu: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  icon: {
    width: 36,
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 10,
  },
});
