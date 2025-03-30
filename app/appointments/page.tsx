import { Suspense } from "react";

import AppointmentsPage from "@/components/AppointmentsPage";
import Loading from "../loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <AppointmentsPage />
    </Suspense>
  );
}
