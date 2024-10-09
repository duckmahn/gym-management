export default function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="inline-block w-1/5 h-max bg-black p-2.5">
        <h1 className="text-center my-2.5 text-white">GYMHUFLIT</h1>
        <hr />
        <ul className="list-none">
          <li className="inline-block w-full h-full p-2 border-none rounded-md text-white hover:bg-brown-500">
            Management
          </li>
          <li className="inline-block w-full h-full p-2 border-none rounded-md text-white hover:bg-brown-500">
            Calendar
          </li>
          <li className="inline-block w-full h-full p-2 border-none rounded-md text-white hover:bg-brown-500">
            Coach
          </li>
          <li className="inline-block w-full h-full p-2 border-none rounded-md text-white hover:bg-brown-500">
            Finance
          </li>
          <li className="inline-block w-full h-full p-2 border-none rounded-md text-white hover:bg-brown-500">
            Factility
          </li>
          <li className="inline-block w-full h-full p-2 border-none rounded-md text-white hover:bg-brown-500">
            Customer
          </li>
          <li className="inline-block w-full h-full p-2 border-none rounded-md text-white hover:bg-brown-500">
            Settings
          </li>
          <li className="inline-block w-full h-full p-2 border-none rounded-md text-white hover:bg-brown-500">
            Sign Out
          </li>
        </ul>
      </div>
      <div className="inline-block w-4/5 h-full bg-white p-2.5"></div>
    </div>
  );
}
