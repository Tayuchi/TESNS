import SideBar from "@/libs/components/layouts/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen">
        <div className="flex-none w-40">
          <SideBar />
        </div >
        <div className="flex-grow overflow-y-auto w-full">
            {children}
        </div>
      </div>
    );
  }
