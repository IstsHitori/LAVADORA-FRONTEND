import { typeClient } from "../types"
import client from "/client.svg"

type CardClientTypes = {
    value:typeClient
}


export default function CardClient({value}:CardClientTypes) {
    const {name,phone,address} = value;

  return (
    <div className="border-b py-2">
        <div className="flex items-center gap-2">
            <img className="size-9" src={client} alt="client.svg" />
            <p className="text-sm">{name}, {phone}, {address}</p>
        </div>
    </div>
  )
}

