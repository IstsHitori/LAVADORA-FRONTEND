import { typeClient } from "../types";
import client from "/client.svg";
import { MdOutlinePhone } from "react-icons/md";
import { GrDocumentUser } from "react-icons/gr";
import { FaAddressBook } from "react-icons/fa";
import DropDown from "./DropDown";

type ClientDetailTypes = {
  value: typeClient;
};

export default function ClientDetail({ value }: ClientDetailTypes) {
  const { name, phone, document, address, updatedAt, _id } = value;
  return (
    <div className="p-2 max-w-sm rounded-md border border-blue-200 transition-all hover:shadow-lg hover:shadow-blue-100 shadow-md">
      <div className="flex gap-2 border-b pb-2 relative">
        <img className="size-11" src={client} alt="client.sv" />
        <DropDown documentClient={document} id={_id} />
        <div>
          <p className=" text-sm font-semibold">{name}</p>
          <p className=" text-xs">{new Date(updatedAt).toLocaleString()}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <p className=" flex items-center gap-1 text-gray-600 font-semibold text-sm">
          <MdOutlinePhone className="text-blue-500 text-lg" />
          {phone}
        </p>
        <p className=" flex items-center gap-1 text-gray-600 font-semibold text-sm">
          <GrDocumentUser className="text-blue-500 text-lg" />
          {document}
        </p>

        <p className=" flex items-center gap-1 text-gray-600 font-semibold text-sm">
          <FaAddressBook className="text-blue-500 text-lg" />
          {address}
        </p>
      </div>
    </div>
  );
}
