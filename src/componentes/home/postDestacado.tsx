import Link from "next/link";
import Image from "next/image";

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

export default function PostDestacado({ data }: { data: PostType[] }) {
  const sample = {
    href: "/blog/dont-close-your-eyes",
  };

  return (
    <>
      {data.slice(-1).map((postDestacado, index) => (
        <article
          key={index}
          className="group w-full max-w-11/12 mx-auto overflow-hidden bg-white"
        >
          {/* Main Content */}
          <div className="p-6">
            <div className="grid gap-16">
              {/* Text Content */}
              <div className="mt-12">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-black uppercase tracking-tight">
                  {postDestacado.titulo}
                </h2>
                <div className="pt-5">
                  <p className="text-base text-gray-700 leading-relaxed w-10/12">
                    {postDestacado.contenido.split("").slice(0, 600).join("") +
                      "..."}
                  </p>
                  {/* Metadata */}
                  <div className="flex items-center gap-6 pt-9">
                    <span>
                      <strong>Autor</strong> {postDestacado.autor.nombre}
                    </span>
                    <span>
                      <strong>publicado el</strong>{" "}
                      {new Date(
                        postDestacado.fecha_creacion
                      ).toLocaleDateString()}
                    </span>
                    <div className="border-b border hover:scale-110 transition">
                      <span className=" text-black px-3 py-1 text-xs font-bold uppercase tracking-tight ">
                        <Link href={`http://localhost:3000/publicaciones/${postDestacado.id_publicacion}`}>ver mas</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-[5/3] bg-gray-900 overflow-hidden">
                <Image
                  src={postDestacado.urlImg}
                  alt={postDestacado.titulo}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
