import Link from "next/link";
export default function Header() {
  const links = [
    {
      id: 1,
      nombre: "inicio",
      link: "/",
    },
    {
      id: 2,
      nombre: "Publicaciones",
      link: "/pepe",
    },
    {
      id: 3,
      nombre: "categorias",
      link: "/peoeo",
    },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y navegación */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-green-600">
              LEOPOLIS.NEWS
            </Link>
            <nav className="hidden md:flex space-x-6">
              {links.map((data, key) => (
                <Link
                  href={data.link}
                  key={data.id}
                  className="text-green-600 font-medium"
                >
                  {data.nombre}
                </Link>
              ))}
            </nav>
          </div>

          {/* Acciones del header */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-green-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
              Menú
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
