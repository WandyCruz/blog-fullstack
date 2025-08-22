type props = {
    data: string;
  };
  export default function BtnGoogle({ data }: props) {
    return (
      <button className="w-full bg-gray-800 p-3 rounded-md text-white">
        {data}
      </button>
    );
  }
  