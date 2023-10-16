import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3, // For shadow on Android
    shadowColor: "#000", // For shadow on iOS
    shadowOffset: { width: 1, height: 1 }, // For shadow on iOS
    shadowOpacity: 0.3, // For shadow on iOS
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardImage: {
    width: "100%", // Adjust the width as needed
    height: 370, // Adjust the height as needed
    resizeMode: "cover", // Adjust the resizeMode as needed
    borderRadius: 8, // Match the card's borderRadius
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text_h1: {
    fontSize: 30,
    paddingTop: 30,
    color: "#449E5C",
    fontWeight: 'bold',
  },
  text_h2: {
    fontSize: 30,
    color: "#449E5C",
    fontWeight: 'bold',
  },
});

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://phar.ubu.ac.th/main/sub/personTest"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text_h1}>บุคลากรคณะเภสัชศาสตร์</Text>
      <Text style={styles.text_h2}>มหาวิทยาลัยอุบลราชธานี</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{
                  uri: `https://phar2.ubu.ac.th/central/api_person/${item.id}.jpg`,
                }}
                style={styles.cardImage}
                onError={() => console.log("Image load error")}
              />
              <Text style={styles.cardText}>
                {item.tbl_pname}{item.fname} {item.lname}
              </Text>
              <Text style={styles.cardText}>ตำแหน่ง: {item.position}</Text>
              <Text style={styles.cardText}>Email: {item.email}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MyComponent;
