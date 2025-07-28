import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import API from '../services/api';
import { useNavigation, NavigationProp } from "@react-navigation/native";

type Item = {
  id: string;
  itemname: string;
  itemprice:number;
  addtocart:boolean;
  Checkout: { cartItems: Item[] };
};

const ItemsScreen: React.FC = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  type RootStackParamList = {
    Checkout: { cartItems: Item[] };
  };
  const [itemList, setItemList] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  const fetchItems = async () => {
    try {
      const response = await API.get('/item/showitems');

      const rawItems = Array.isArray(response.data)
        ? response.data
        : response.data.items || [];

      const itemsWithCartFlag: Item[] = rawItems.map((item: any) => ({
        id: item._id || item.id,  
        itemname: item.itemname,
        itemprice: item.itemprice,
        addtocart: false,
      }));

        setItemList(itemsWithCartFlag);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);


  const markSold = (id: string) => {
    const updated = itemList.map(item =>
      item.id === id ? { ...item, addtocart: true } : item
    );
    setItemList(updated);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.card}>
      <Text style={styles.itemName}>{item.itemname}</Text>
      <Text style={styles.status}>
        {item.addtocart ? '✅ Added to cart' : ''}
      </Text>
      <Text style={styles.status}>Price: Rs {item.itemprice}.00</Text>
      {!item.addtocart && (
        <Pressable style={styles.button} onPress={() => markSold(item.id)}>
          <Text style={styles.buttonText}>Add to cart</Text>
        </Pressable>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ marginTop:20, marginBottom:15, marginLeft:65, color:"orange", fontSize:60, fontWeight:900 }}>DoughGo</Text>
      <Text style={styles.title}>🥖 Find your Taste 🥖</Text>
      <Pressable
        style={[styles.button, { marginTop: 20 }]}
        onPress={() =>
          navigation.navigate("Checkout", {
            cartItems: itemList.filter((item) => item.addtocart),
          })
        }
      >
        <Text style={styles.buttonText}>Go to Checkout</Text>
      </Pressable>

      <FlatList
        data={itemList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Text style={styles.route}>📍 Route: Colombo ➝ Kandy</Text>
    </View>
  );
};

export default ItemsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },

  listContainer: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },

  itemName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
  },

  status: {
    marginTop: 8,
    fontSize: 16,
    color: '#888',
  },

  button: {
    marginTop: 12,
    backgroundColor: '#f96c21',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },

  route: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
});
