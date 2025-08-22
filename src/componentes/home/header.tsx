import { FaInstagram } from "react-icons/fa";
export default function Header() {
  const sample = {
    title: "DON'T CLOSE YOUR EYES",
    href: "/blog/dont-close-your-eyes",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/10/05/17/26/indian-1717192_960_720.jpg",
    category: "ART & LIFE",
    author: "Jakob Groberg",
    date: new Date(),
    readingTime: "1 Min",
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      {/* Header Section */}
      <div className="border-b border-black">
        <div className="text-center py-4">
          <h1 className="text-[180px] font-bold -tracking-tight text-black uppercase p-7">
            {sample.category}
          </h1>
        </div>

        {/* News Ticker */}
        <div className="bg-black text-white py-2 px-4 overflow-hidden">
          <div className="whitespace-nowrap animate-marquee">
            <span className="inline-block">
              NEWS TICKER+++ {sample.author.substring(0, 100)} +++{" "}
              {sample.excerpt.substring(0, 100)} +++
            </span>
          </div>
        </div>
      </div>
      {/* <section className="p-2 flex flex-col fixed justify-items-end w-full">
        <FaInstagram className="m-2 text-xl" />
        <FaInstagram className="m-2 text-xl" />
        <FaInstagram className="m-2 text-xl" />
        <FaInstagram className="m-2 text-xl" />
      </section> */}
    </header>
  );
}
