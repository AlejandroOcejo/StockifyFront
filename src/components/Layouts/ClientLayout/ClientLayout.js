import Sidebar from "../../ClienZoneComponents/SideBar/Sidebar";

const ClientLayout = ({ children }) => {
  return (
    <>
      <main className="flex flex-row">
        <Sidebar />
        {children}
      </main>
    </>
  );
};

export default ClientLayout;
