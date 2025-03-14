"use client"

import React, { useState } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ListRenderItem,
} from 'react-native'
import { useFetchSongs } from './useFetchSongs'
import type { Cancion } from './src/models/cancion'

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0)

  const { songs, loading } = useFetchSongs(selectedCategory)

  const renderItem: ListRenderItem<Cancion> = ({ item }) => (
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
          {item.categoria && (
            <Text style={styles.category}>Categoría: {item.categoria.nombre}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Cargando canciones...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Música</Text>
      </View>

      <View style={styles.filterContainer}>
        {/* Todas */}
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 0 && styles.filterButtonActive]}
          onPress={() => setSelectedCategory(0)}
        >
          <Text
            style={[
              styles.filterButtonText,
              selectedCategory === 0 && styles.filterButtonTextActive,
            ]}
          >
            Todas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 1 && styles.filterButtonActive]}
          onPress={() => setSelectedCategory(1)}
        >
          <Text
            style={[
              styles.filterButtonText,
              selectedCategory === 1 && styles.filterButtonTextActive,
            ]}
          >
            Rock
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 2 && styles.filterButtonActive]}
          onPress={() => setSelectedCategory(2)}
        >
          <Text
            style={[
              styles.filterButtonText,
              selectedCategory === 2 && styles.filterButtonTextActive,
            ]}
          >
            Pop
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 7 && styles.filterButtonActive]}
          onPress={() => setSelectedCategory(7)}
        >
          <Text
            style={[
              styles.filterButtonText,
              selectedCategory === 7 && styles.filterButtonTextActive,
            ]}
          >
            Trap
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={songs}
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
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  filterButtonActive: {
    backgroundColor: "#6200ee",
  },
  filterButtonText: {
    color: "#333",
    fontWeight: "600",
  },
  filterButtonTextActive: {
    color: "#fff",
  },
  listContainer: {
    padding: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: "#ccc",
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#757575",
    fontSize: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  yearBadge: {
    backgroundColor: "#6200ee",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  year: {
    color: "#fff",
    fontSize: 12,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 18,
  },
  category: {
    fontSize: 12,
    color: "#333",
    fontStyle: "italic",
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#6200ee",
    fontWeight: "500",
  },
})

export default App
