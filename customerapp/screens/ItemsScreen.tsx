import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, Pressable } from 'react-native';

type Item = {
  id: string;
  itemname: string;
  price:number;
  addtocart:boolean;
};

const initialItems: Item[] = [
  { id: '1', itemname:'Bread', price:200.00, addtocart: false },
  { id: '2', itemname:'Bun', price:80.00, addtocart: false },
  { id: '3', itemname:'Cake' , price:500.00, addtocart: false }
];

const ItemsScreen: React.FC = () => {
  const [itemList, setItemList] = React.useState<Item[]>(initialItems);

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
          {item.addtocart ? '✅ Added to cart':''}
        </Text>

      <Text style={styles.status}>{"Price: Rs " + item.price + ".00"}</Text>
      {!item.addtocart && (
        <Pressable style={styles.button} onPress={() => markSold(item.id)}>
          <Text style={styles.buttonText}>Add to cart</Text>
        </Pressable>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{ marginTop:20, marginBottom:15, marginLeft:65, color:"orange", fontSize:60, fontWeight:900 }}>DoughGo</Text>
      <Text style={styles.title}>🥖 Find your Taste 🥖</Text>
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
