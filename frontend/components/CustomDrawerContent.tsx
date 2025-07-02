import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons, Feather, FontAwesome5 } from "@expo/vector-icons";
import { auth } from "@/lib/firebase";

export default function CustomDrawerContent(props: any) {
  const fname = auth.currentUser?.displayName?.split(" ")[0];
  const lname = auth.currentUser?.displayName?.split(" ")[1];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      {/* Avatar and Name */}
      <View style={styles.profileContainer}>
        <View style={styles.avatar}></View>
        <Text style={styles.name}>{fname}</Text>
        <Text style={styles.name}>{lname}</Text>
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
      <View style={styles.upgradeMenu}>
        <TouchableOpacity style={styles.upgradeButton}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="sparkles" size={23} color={"#FFB2E3"} />
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Upgrade</Text>
          </View>
          <Text
            style={{
              color: "#000",
              fontSize: 12,
              marginTop: 8,
              lineHeight: 15,
              fontWeight: "500",
            }}
          >
            Get access to all features and get the most out of MiniCoachAI
          </Text>
          <View
            style={{
              backgroundColor: "#FFB2E3",
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 7,
              marginTop: 18,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "bold" }}>
              View Plans
            </Text>
          </View>
          {/* <DrawerButton
            label="Upgrade to Pro"
            icon={
              <Ionicons name="sparkles-outline" size={28} color={"#FFB2E3"} />
            }
            onPress={() => props.navigation.navigate("upgrade")}
          /> */}
        </TouchableOpacity>
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
  upgradeButton: {
    backgroundColor: "#ffccec",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
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
  upgradeMenu: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    margin: "auto",
    width: "75%",
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
