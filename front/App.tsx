"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  type ListRenderItem,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native"
import type { peliculas } from "./src/models/peliculas"

const App: React.FC = () => {
  const [movies, setMovies] = useState<peliculas[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch("http://192.168.1.34:300/peliculas")
      .then((response) => response.json())
      .then((data: peliculas[]) => {
        setMovies(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error al obtener las películas:", error)
        setLoading(false)
      })
  }, [])

  const renderItem: ListRenderItem<peliculas> = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.itemContainer}>
        {item.imagen_url ? (
          <Image source={{ uri: item.imagen_url }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {item.titulo}
          </Text>
          {item.anio && (
            <View style={styles.yearBadge}>
              <Text style={styles.year}>{item.anio}</Text>
            </View>
          )}
          {item.descripcion && (
            <Text style={styles.description} numberOfLines={3}>
              {item.descripcion}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Cargando películas...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Películas</Text>
      </View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 12,
  },
  image: {
    width: 100,
    height: 140,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
  imagePlaceholder: {
    width: 100,
    height: 140,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#757575",
    fontSize: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  yearBadge: {
    backgroundColor: "#6200ee",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  year: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#6200ee",
    fontWeight: "500",
  },
})

export default App

