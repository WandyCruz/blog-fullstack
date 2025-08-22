import PublicacionPage from "./[id]/page";

export default function Loadeng() {
  const fakeParams = { id: "1" }; // reemplaza "1" por el ID que necesites
  return <PublicacionPage params={Promise.resolve(fakeParams)} />;
}
