// app/page.tsx
import PostDestacado from "@/componentes/home/postDestacado";
import Post from "@/componentes/home/post";
import Header from "@/componentes/home/header";

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

export default async function Home() {
  // Hacemos fetch y esperamos los datos
  const res = await fetch("http://localhost:3001/publicaciones", {
    method: "GET",
    cache: "no-store", // importante para que siempre recargue
  });
  const data: PostType[] = await res.json();

  return (
    <>
      <Header />
      <PostDestacado data={data} />

      <div className="w-6/12">
        <Post data={data} />
      </div>
    </>
  );
}
