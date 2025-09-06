import { Image } from "expo-image";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";

export default function HomeScreen() {
  const [items, setItems] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAdd = (): void => {
    if (text.trim() === "") return;

    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = text;
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      setItems([...items, text]);
    }
    setText("");
  };

  const handleEdit = (index: number): void => {
    setText(items[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number): void => {
    const filtered = items.filter((_, i) => i !== index);
    setItems(filtered);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "#fff" ,top:50 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Simple CRUD App
      </Text>

      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 8,
          }}
          placeholder="Enter item"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#4CAF50",
            marginLeft: 10,
            paddingHorizontal: 20,
            justifyContent: "center",
            borderRadius: 8,
          }}
          onPress={handleAdd}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {editingIndex !== null ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 12,
              backgroundColor: "#f9f9f9",
              marginBottom: 10,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            <Text>{item}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => handleEdit(index)}
                style={{ marginRight: 15 }}
              >
                <Text style={{ color: "blue" }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(index)}>
                <Text style={{ color: "red" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
