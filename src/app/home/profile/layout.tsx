import Header from "@/libs/components/profile/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <Header/>
      </div>
      <div className="flex-grow overflow-y-auto mt-16" >
        {children}
      </div>
    </div>
  );
}
