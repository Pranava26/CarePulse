import { formatDateTime } from "@/lib/utils";
import StatusBadge from "../StatusBadge";
import { Doctors } from "@/constants";
import AppointmentModal from "../AppointmentModal";

export const columns = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient.name",
    header: "Patient",
    cell: ({ row }) => <p className="text-14-medium">{row.original.patientId?.name || "Unknown"}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status || "Unknown"} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule)?.dateTime || "N/A"}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician) || {};
      return (
        <div className="flex items-center gap-3">
          {doctor.image ? (
            <img
              src={doctor.image}
              alt={doctor.name || "Unknown"}
              width={100}
              height={100}
              className="size-8"
            />
          ) : (
            <p>No Image</p>
          )}
          <p className="whitespace-nowrap">Dr. {doctor.name || "Unknown"}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => (
      <div className="flex gap-1">
        <AppointmentModal
          type="schedule"
          patientId={row.original.patient?._id}
          userId={row.original.userId}
          appointment={row.original}
        />
        <AppointmentModal
          type="cancel"
          patientId={row.original.patient?._id}
          userId={row.original.userId}
          appointment={row.original}
        />
      </div>
    ),
  },
];
