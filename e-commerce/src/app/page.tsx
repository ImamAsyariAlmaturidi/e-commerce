import { BreadCrumbComponent } from "@/components/BreadCrumb";
import MainCard from "@/components/MainCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async () => {
  const res = await fetch("http://localhost:3000/api/product");
  const { data } = await res.json();

  return (
    <div className="flex justify-center items-center h-14 bg-slate-400 ">
      <div className="w-full max-h-36 pt-[200px]">
        <img
          src="https://catharsisbrand.com/cdn/shop/files/cat-3x2agosto2024Desktop_1800x.png?v=1722940897"
          alt=""
        />
        <div className="p-10 ">
          <BreadCrumbComponent />
        </div>
        {data.length > 0 && (
          <div className="grid grid-cols-3 gap-5 px-10">
            <MainCard data={data} />
          </div>
        )}
        <div className="text-center pb-12">
          <Link href={"/product"}>
            <Button className="px-10">View All</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
