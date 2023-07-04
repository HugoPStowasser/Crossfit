import { TbAlertCircle, TbCheck, TbClockHour3 } from "react-icons/tb";

export const statusName = (status: string) => {
  if (status === "PAYMENT_DONE") {
    return { status: "Pago", icon: TbCheck };
  } else if (status === "PENDENT") {
    return { status: "Em aberto", icon: TbClockHour3 };
  } else {
    return { status: "Atrasado", icon: TbAlertCircle };
  }
};
