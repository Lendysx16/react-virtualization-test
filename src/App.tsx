import UserInfo from "./components/UserInfo";
import UsersList from "./components/UsersList";

const App = () => {
    return (
        <main className="w-full min-h-[100svh] bg-[#f5f5f5] pt-8 text-[10px] md:text-[14px]">
            <div className="grid grid-cols-4 h-[100svh] w-[80%] m-auto border-2 border-black bg-[#f5f5f5] ">
                <UsersList className="col-span-1 overflow-x-scroll flex flex-col border-r-2 border-black no-scrollbar" />
                <UserInfo className="col-span-3 w-full flex items-center justify-center" />
            </div>
        </main>
    );
};

export default App;
