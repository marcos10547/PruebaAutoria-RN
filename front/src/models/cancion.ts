
export interface Categoria {
    id: number;
    nombre: string;
  }
  
  export interface Cancion {
    id: number;
    titulo: string;
    descripcion?: string;
    anio?: number;
    imagen_url?: string;
    categoria?: Categoria; 
  }
  