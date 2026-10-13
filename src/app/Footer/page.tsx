
const Footer = () => {
  return (
    <footer className="mt-6 w-full bg-gray-200 text-gray-700">
      <div className="mx-auto container flex w-full flex-col justify-between gap-3 px-4 py-4 sm:flex-row sm:items-center">
        <p className="text-sm">
          Market Price: The price of essential commodities at a glance.
        </p>

        <p className="text-sm sm:text-right">
          All prices are approximate and may vary depending on market conditions.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
