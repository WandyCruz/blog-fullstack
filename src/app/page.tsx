import PostDestacado from "@/componentes/postDestacado";
import Post from "@/componentes/post";
export default function Home() {
  return (
    <>
      <PostDestacado />;
      <div className="w-6/12">
        <Post />
      </div>
    </>
  );
}
