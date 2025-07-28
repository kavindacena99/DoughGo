import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import API from "../services/api";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Items: undefined;
  Checkout: { cartItems: any[] };
};

type CheckoutRouteProp = RouteProp<RootStackParamList, "Checkout">;
type CheckoutNavProp = NativeStackNavigationProp<RootStackParamList, "Checkout">;

type CartItem = {
  id: string;
  itemname: string;
  itemprice: number;
  quantity: number;
  sellerId?: string;
  sellerName?: string;
};

const CheckoutScreen: React.FC = () => {
  const route = useRoute<CheckoutRouteProp>();
  const navigation = useNavigation<CheckoutNavProp>();
  const [cartItems, setCartItems] = useState<CartItem[]>(
    route.params.cartItems.map((item) => ({ ...item, quantity: 1 }))
  );

  const [location, setLocation] = useState<string>("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  const groupedBySeller = cartItems.reduce((groups: any, item) => {
    const key = item.sellerId || "unknown";
    if (!groups[key]) {
      groups[key] = {
        sellerName: item.sellerName || "Unknown Seller",
        sellerId: item.sellerId,
        items: [],
      };
    }
    groups[key].items.push(item);
    return groups;
  }, {});

  const updateQuantity = (id: string, value: string) => {
    const qty = parseInt(value) || 1;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty > 0 ? qty : 1 } : item
      )
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.itemprice * item.quantity,
    0
  );

  // Get current location
  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location access is required.");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setCoords({ lat: latitude, lng: longitude });

      // Reverse geocode to get address
      const [address] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const fullAddress = `${address.name || ""} ${address.street || ""}, ${
        address.city || ""
      }, ${address.region || ""}, ${address.country || ""}`;
      setLocation(fullAddress);
    } catch (error) {
      console.error("Location error:", error);
      Alert.alert("Error", "Could not fetch location.");
    }
  };

  const handleCheckout = async () => {
    await fetchLocation();
    setShowModal(true);
  };

  const confirmOrder = async () => {
    if (!location.trim()) {
      Alert.alert("⚠️ Location Required", "Please enable your GPS.");
      return;
    }

    const orders = Object.values(groupedBySeller).map((group: any) => ({
      sellerId: group.sellerId,
      sellerName: group.sellerName,
      customerLocation: location,
      coords,
      items: group.items.map((item: CartItem) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.itemprice,
      })),
      total: group.items.reduce(
        (sum: number, item: CartItem) => sum + item.itemprice * item.quantity,
        0
      ),
    }));

    try {
      await API.post("/order/createorder", { orders });
      setShowModal(false);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Checkout error:", error);
      Alert.alert("❌ Error", "Failed to place orders. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Checkout</Text>

      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.itemname}</Text>
            <Text>Rs {item.itemprice}.00</Text>
            <TextInput
              style={styles.qtyInput}
              keyboardType="numeric"
              value={item.quantity.toString()}
              onChangeText={(value) => updateQuantity(item.id, value)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <Text style={styles.total}>Total: Rs {total}.00</Text>

      <Pressable style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </Pressable>

      {/* Location Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delivery Location</Text>
            <Text>{location || "Fetching your location..."}</Text>
            <Pressable style={styles.button} onPress={confirmOrder}>
              <Text style={styles.buttonText}>Place Orders</Text>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: "gray", marginTop: 10 }]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f4f7" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  itemName: { fontSize: 18, fontWeight: "500", flex: 1 },
  qtyInput: {
    width: 50,
    height: 35,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    marginLeft: 10,
  },
  total: { fontSize: 20, fontWeight: "bold", marginTop: 20, textAlign: "right" },
  button: {
    marginTop: 20,
    backgroundColor: "#f96c21",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
});
