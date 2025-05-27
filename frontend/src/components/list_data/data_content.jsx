export function DataContent({ title, value }) {
  return (
    <div className="bg-[#392161] w-full">
      <h2 className="text-[#F1F2F6] p-2 h-auto">{title}</h2>
      <h3 className="bg-[#8EE4D9] p-1 h-auto">{value}</h3>
    </div>
  );
}
