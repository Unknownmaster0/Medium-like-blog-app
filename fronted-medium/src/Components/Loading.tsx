export const Loading = ({ msg }: { msg: string }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="sm:text-2xl text-lg font-bold text-slate-700">{msg}</div>
    </div>
  );
};
