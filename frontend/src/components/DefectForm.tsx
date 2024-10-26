import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface Developer {
  id: number;
  name: string;
}

interface DefectFormProps {
  onSubmit: (
    title: string,
    description: string,
    status: string,
    reporterId: number,
    assigneeId?: number,
  ) => void;
  initialData?: {
    title: string;
    description?: string;
    status: string;
    reporterId: number;
    assigneeId?: number;
  };
  reporterId: number;
  developers: Developer[];
}

const DefectForm = ({ onSubmit, initialData, developers }: DefectFormProps) => {
  const userCookie = Cookies.get("user");
  const reportedBy = userCookie ? JSON.parse(userCookie).id : null;
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [status, setStatus] = useState(initialData?.status || "OPEN");
  const [assigneeId, setAssigneeId] = useState<number | "">(
    initialData?.assigneeId || "",
  );

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || "");
      setStatus(initialData.status);
      setAssigneeId(initialData.assigneeId || "");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportedBy) {
      onSubmit(title, description, status, reportedBy, assigneeId || undefined);
      setTitle("");
      setDescription("");
      setStatus("OPEN");
      setAssigneeId("");
    } else {
      alert("Asegúrate de que el Asignado sea un ID válido.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Título del Defecto
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Descripción
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Estado
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="OPEN">Abierto</option>
          <option value="IN_PROGRESS">En progreso</option>
          <option value="RESOLVED">Resuelto</option>
          <option value="CLOSED">Cerrado</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Asignado a
        </label>
        <select
          value={assigneeId}
          onChange={(e) => setAssigneeId(Number(e.target.value))}
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sin asignar</option>
          {developers.map((dev) => (
            <option key={dev.id} value={dev.id}>
              {dev.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        {initialData ? "Actualizar Defecto" : "Crear Defecto"}
      </button>
    </form>
  );
};

export default DefectForm;
