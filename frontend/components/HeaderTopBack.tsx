import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

export default function HeaderTopBack({ title }: { title: String }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={24} color="white" />
      </TouchableOpacity>
      <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    flexGrow: 0,
    gap: 10,
    paddingVertical: 10,
    paddingBottom: 25,
  },
});
