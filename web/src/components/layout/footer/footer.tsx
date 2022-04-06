const Footer: React.FC<{ year: string }> = ({ year }) => {
  return (
    <footer className="flex h-32 flex-col bg-primary">
      <div className="mt-auto bg-secondary py-2 text-center text-sm text-primary">
        <p className="font-semibold">E-Nollning {year}</p>
        <p className="text-xs">Skapad med kärlek av InfU och NollU 2022</p>
      </div>
    </footer>
  );
};

export default Footer;
