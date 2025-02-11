import { Users, LayoutDashboard, Receipt } from "lucide-react";
import block from "../../images/block.webp";

export default function Herosec() {

  return (
    <>
      <div className="flex mt-16 items-center">
        <img src={block} alt="" className="h-fit -mt-10"/>
        <div className="flex flex-col gap-8 items-center justify-center w-[50%]">
          <h2 className="text-center max-w-xl mt-5 text-6xl font-bold text-[#272a6b] ">
          B2C Travel CRM Software
          </h2>
          <h3 className="text-xl font-medium text-[#858cee]">FOR BUSINESS TO CLIENTS</h3>
       <p className="text-lg text-justify">
       B2C travel CRM software optimizes customer inquiries and support requests, ensuring prompt responses and exceptional service. By integrating with booking engines and inventory management platforms, it delivers a seamless booking experience. This software enhances customer engagement, boosts marketing efficiency, and improves satisfaction by centralizing data, automating workflows, and enabling personalized travel experiences.
       </p>
        </div>

      </div>
      
    </>
  );
}
