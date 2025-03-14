// useFetchSongs.ts
import { useState, useEffect } from 'react'
import type { Cancion } from './src/models/cancion'

export function useFetchSongs(selectedCategory: number) {
  const [songs, setSongs] = useState<Cancion[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        let url = 'http://192.168.104.77:300/musica'
        if (selectedCategory !== 0) {
          url += `?categoria=${selectedCategory}`
        }
        const response = await fetch(url)
        const data: Cancion[] = await response.json()
        setSongs(data)
      } catch (error) {
        console.error('Error al obtener las canciones:', error)
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
  }, [selectedCategory])

  return { songs, loading }
}
