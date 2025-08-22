type props = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function Inputs({ type, placeholder, value, onChange }: props) {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="shadow-xs shadow-black/30 rounded-md p-3 w-full bg-gray-100"
      />
    </div>
  );
}
