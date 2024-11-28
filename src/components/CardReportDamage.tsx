import { typeReport } from "../types"
import { useAuthStore } from "../stores/useAuthStore";

type CardReportTypes ={
    value:typeReport
}

export default function CardReportDamage({value}:CardReportTypes) {
    const machines = useAuthStore((state) => state.machines);
    
    const {id_machine,report_date,description} = value;
    const searchMachine = machines.find(index => index._id === id_machine);

  return (
    <div className="p-2 py-3 shadow-sm rounded-lg border-b border ">
        <p>{searchMachine?.name}</p>
        <p className="text-xs text-gray-600">{new Date(report_date).toLocaleString()}</p>
        <p className="text-sm ">{description}</p>
        
    </div>
  )
}
