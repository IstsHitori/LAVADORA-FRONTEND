import { stateRoles } from "@/helpers";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TableMoney } from "@/components/TableMoney";
import { getPaymentArray,getTotalMoney } from "@/helpers";

export default function MonetaryIncome() {
  const profile = useAuthStore((state) => state.profile);
  const navigate = useNavigate();

  const fetchMachine = useAuthStore((state) => state.fetchMachine);
  const fetchRents = useAuthStore((state) => state.fetchRents);

  useEffect(() => {
    if (profile.rol !== stateRoles.ADMIN) {
      navigate("/dashboard/clientes");
      return;
    }
    const fetch = async () => {
      await fetchMachine();
      await fetchRents();
    };
    fetch();
  }, [navigate, profile]);

  const rents = useAuthStore((state) => state.rents);
  const machines = useAuthStore((state) => state.machines);
  const data = getPaymentArray([...rents], [...machines]);
  const totalMoney = getTotalMoney([...rents]);
  return (
    <div>
      <TableMoney data={data} />
      <p className="p-3 border rounded-lg text-md bg-gray-100">Total de dinero:{totalMoney}</p>
    </div>
  );
}
