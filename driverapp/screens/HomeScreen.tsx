import React, { useEffect } from 'react';
import API from '../services/api'; 
import { View, Text, FlatList, StyleSheet, Pressable, Linking } from 'react-native';

type Item = {
  id: string;
  name: string;
  sold: boolean;
  total: number;
  itemname1: string;
  itemname2: string;
  count1:number;
  count2:number;
  latitude: number;
  longitude: number;
};

const initialItems: Item[] = [
  { id: '1', name: 'Dasun', itemname1:'Bread', itemname2:'Bun', count1:1, count2:2, total:300.00, sold: false, latitude: 6.9271, longitude: 79.8612 }, // Colombo
  { id: '2', name: 'Perera', itemname1:'Butter Cake', itemname2:'Chocolate Cake', count1:1, count2:2, total:1100.00, sold: false, latitude: 7.2906, longitude: 80.6337 }, // Kandy
  { id: '3', name: 'Ishan', itemname1:'Bun', itemname2:'Bread', count1:2, count2:3, total:580.00, sold: false, latitude: 6.0535, longitude: 80.2200 }, // Galle
  { id: '4', name: 'Dasun', itemname1:'Bread', itemname2:'Bun', count1:1, count2:2, total:300.00, sold: false, latitude: 8.3114, longitude: 80.4037 }, // Anuradhapura
];

const HomeScreen: React.FC = () => {
  const [itemList, setItemList] = React.useState<Item[]>(initialItems);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await API.get('/orders/showorders');
        const rawItems = Array.isArray(response.data)
          ? response.data
          : response.data.items || [];

        const itemsWithCoords: Item[] = rawItems.map((item: any) => ({
          id: item._id || item.id,
          name: item.name || "Unknown",
          itemname1: item.itemname1 || "Unknown",
          itemname2: item.itemname2 || "Unknown",
          count1: item.count1 || 0,
          count2: item.count2 || 0,
          total: item.total || 0,
          sold: false,
          latitude: item.latitude || 6.9271,  // default Colombo
          longitude: item.longitude || 79.8612,
        }));

        setItemList(itemsWithCoords);
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
      item.id === id ? { ...item, sold: true } : item
    );
    setItemList(updated);
  };
  const openRoute = (lat: number, lng: number) => {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
  Linking.openURL(url).catch(err => console.error('Error opening map:', err));
};


  const renderItem = ({ item }: { item: Item }) => (
  <Pressable onPress={() => openRoute(item.latitude, item.longitude)}>
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.status}>
          {item.sold ? '✅ Delivered' : '❌ Not Delivered'}
        </Text>
      </View>
      <Text style={styles.status}>{'✅ ' + item.itemname1}{' ' + item.count1}</Text>
      <Text style={styles.status}>{'✅ ' + item.itemname2}{' ' + item.count2}</Text>
      <Text style={styles.status}>{"Total Rs " + item.total + ".00"}</Text>
      {!item.sold && (
        <Pressable style={styles.button} onPress={() => markSold(item.id)}>
          <Text style={styles.buttonText}>Mark as Delivered</Text>
        </Pressable>
      )}
    </View>
  </Pressable>
);


  return (
    <View style={styles.container}>
      <Text style={{ marginTop:20, marginBottom:15, marginLeft:65, color:"orange", fontSize:60, fontWeight:900 }}>DoughGo</Text>
      <Text style={styles.title}>🥖 Orders to Deliver 🥖</Text>
      <FlatList
        data={itemList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default HomeScreen;

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
});
