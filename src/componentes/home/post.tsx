import Link from "next/link";
import Image from "next/image";

interface Autor {
  nombre: string;
}

interface PostType {
  id_publicacion:number;
  titulo: string;
  contenido: string;
  fecha_creacion: string; // o Date
  autor: Autor;
  urlImg: string;
}

export default function Post({ data }: { data: PostType[] }) {
  const sample = {
    href: "/blog/the-best-art-museums",
    readingTime: "1 Min",
    tag: "Ver mas",
  };

  return (
    <>
      {data
        .slice(-6, -1)
        .reverse()
        .map((user, index) => (
          <article
            key={index}
            className={`group w-full overflow-hidden bg-white border border-black mb-6 last:mb-0 mx-26 
          }`}
          >
            <div className="flex">
              {/* Image Section */}
              <div className="w-1/3 relative aspect-square bg-gray-900 overflow-hidden">
                <Image
                  src={user.urlImg}
                  alt={user.titulo}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  loading={sample.readingTime ? undefined : "lazy"}
                  unoptimized
                  sizes="(max-width: 768px) 33vw, 25vw"
                />
              </div>

              {/* Content Section */}
              <div className="w-2/3 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold leading-tight text-black">
                    {user?.titulo}
                  </h3>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    {user?.contenido.split("").slice(0, 400).join("") + "..."}
                  </p>
                </div>

                {/* Metadata and Tag */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex items-center gap-4">
                      <span>
                        <strong>Autor</strong> {user.autor.nombre}
                      </span>
                      <span>
                        <strong>Publicado el</strong>{" "}
                        {new Date(user.fecha_creacion).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="border-b border hover:scale-110 transition">
                      <span className=" text-black px-3 py-1 text-xs font-bold uppercase tracking-tight ">
                        <Link href={`http://localhost:3000/publicaciones/${user.id_publicacion}`}>{sample.tag}</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
    </>
  );
}
