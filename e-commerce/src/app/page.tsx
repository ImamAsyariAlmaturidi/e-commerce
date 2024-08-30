import { BreadCrumbComponent } from "@/components/BreadCrumb";
import MainCard from "@/components/MainCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import { NavbarComponent } from "@/components/Navbar";
import { getDataProduct } from "./product/action";

const Page = async () => {
  const { data } = await getDataProduct();

  let visible: boolean;

  const store = cookies();
  const token = store.get("token");
  if (!token) {
    visible = false;
  } else {
    visible = true;
  }
  return (
    <div>
      <NavbarComponent visible={visible} />
      <div className="flex justify-center items-center h-14 bg-slate-400 ">
        <div className="w-full max-h-36 pt-[200px]">
          <img
            src="https://catharsisbrand.com/cdn/shop/files/cat-3x2agosto2024Desktop_1800x.png?v=1722940897"
            alt=""
          />
          <div className="text-center">
            <h1 className="p-10 font-bold text-lg tracking-wide">NEW DROP</h1>
            <h1 className="text-center text-xs">CROPPED UNISEX </h1>
          </div>
          {data.length > 0 && (
            <div className="grid grid-cols-3 gap-5 px-10">
              <MainCard data={data} initialNumberSlice={0} numberSlice={8} />
            </div>
          )}
          <div className="text-center pb-12">
            <Link href={"/product"}>
              <Button className="px-10">View All</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
