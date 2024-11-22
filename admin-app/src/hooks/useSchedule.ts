import { useState, useCallback } from "react";
import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "../../apiconfig";

interface Schedule {
  id: string;
  roomId: string;
  trainerId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  location: string;
}

export const useSchedule = (token: string | null) => {
  const [schedule, setSchedule] = useState<Schedule[]>([]);

  const getSchedule = useCallback(
    async (date: Date, signal?: AbortSignal): Promise<Schedule[]> => {
      if (!token) return [];
      if (!date) return [];

      const dateData = new Date(date);
      const StartDate = new Date(dateData);
      StartDate.setHours(17, 0, 0, 0);

      const EndDate = new Date(dateData);
      EndDate.setDate(EndDate.getDate() + 1);
      EndDate.setHours(17, 0, 0, 0);

      const params = new URLSearchParams({
        StartDate: StartDate.toISOString(),
        EndDate: EndDate.toISOString(),
      });

      const res = await axios.get(
        `${NEXT_PUBLIC_API_URL}/api/Schedule?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal,
        }
      );
      setSchedule(res.data);
      return res.data;
    },
    [token]
  );

  return { schedule, getSchedule };
<<<<<<< HEAD
};
=======
};
>>>>>>> 6c1563cba99a8a45f749f9192a58d540a44bd354
