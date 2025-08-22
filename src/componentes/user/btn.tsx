type props = {
    data: string;
  };
  
  export default function Btn({ data }: props) {
    return (
      <button
        className="w-full bg-blue-700 p-3 rounded-md text-white"
        type="submit"
      >
        {data}
      </button>
    );
  }
  