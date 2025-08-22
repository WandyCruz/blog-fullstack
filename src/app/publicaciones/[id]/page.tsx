"use client";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
// Definición del tipo correcto
interface autor {
  nombre: string;
}

interface Publicacion {
  id: string;
  titulo: string;
  contenido: string;
  fecha_creacion: string;
  autor: autor;
  urlImg: string;
}

// Artículos relacionados (dummy)
interface Autor {
  nombre: string;
}

interface PostType {
  id_publicacion: number;
  titulo: string;
  contenido: string;
  fecha_creacion: string; // o Date
  autor: Autor;
  urlImg: string;
}

export default function PublicacionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [publicacion, setPublicacion] = useState<Publicacion | null>(null);
  const [postSujeridos, setPostSujeridos] = useState<PostType[] | null>(null);

  useEffect(() => {
    const fetchPublicacion = async () => {
      const res = await fetch(
        `http://localhost:3001/publicaciones/publicaciones/${id}`
      );
      const data = await res.json();
      console.log(data);
      setPublicacion(data);
    };
    const publicacionesSujeridas = async () => {
      // Hacemos fetch y esperamos los datos
      const res = await fetch("http://localhost:3001/publicaciones", {
        method: "GET",
        cache: "no-store", // importante para que siempre recargue
      });
      const data = await res.json();
      setPostSujeridos(data);
    };
    publicacionesSujeridas();
    fetchPublicacion();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal - Artículo */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Imagen principal */}
              <div className="relative h-96 w-full">
                {publicacion?.urlImg && (
                  <Image
                    src={publicacion?.urlImg}
                    alt={"imagen de la publicacion"}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>

              {/* Contenido del artículo */}
              <div className="p-8">
                {/* Metadatos */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      preuba
                    </span>
                    <span className="text-gray-500 text-sm">
                      {publicacion?.fecha_creacion}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span> de lectura</span>
                    <span> vistas</span>
                  </div>
                </div>

                {/* Título */}
                <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {publicacion?.titulo}
                </h1>

                {/* Autor */}
                <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {publicacion?.autor.nombre}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Por {publicacion?.autor.nombre}
                    </p>
                    <p className="text-sm text-gray-600">biografia</p>
                  </div>
                </div>

                {/* Contenido */}
                <div className="prose prose-lg max-w-none">
                  {publicacion?.contenido.split("\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Tags:
                  </h3>
                </div>
              </div>
            </article>
          </div>

          {/* Columna lateral - Artículos relacionados */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Artículos Sujeridos
              </h2>

              <div className="space-y-6">
                {postSujeridos?.slice(-6, -1).map((articulo) => (
                  <article
                    key={articulo.id_publicacion}
                    className="group p-4 shadow-2xs  shadow-black/30"
                  >
                    <Link href={`/publicaciones/${articulo.id_publicacion}`}>
                      <div className="relative h-32 w-full mb-3 rounded-lg overflow-hidden">
                        <Image
                          src={articulo.urlImg}
                          alt={articulo.titulo}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                            categoria
                          </span>
                          <span className="text-gray-500 text-xs">
                            {articulo.fecha_creacion}
                          </span>
                        </div>

                        <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-green-600 transition">
                          {articulo.titulo}
                        </h3>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>tiempo de lectura</span>
                          <span> vistas</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
