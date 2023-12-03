import { formatDistanceToNow } from 'date-fns';

export const formatTime = (isoDateString) => {
  const date = new Date(isoDateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

export const calculateTotalActivityTime = (task) => {
  // Check if the task has an activityLog
  if (task && task.activityLog && task.activityLog.length > 0) {
    // Calculate total duration by summing up the differences between end and start times
    const totalDuration = task.activityLog.reduce((total, log) => {
      const startTime = new Date(log.startTime);
      const endTime = new Date(log.endTime);
      const duration = endTime - startTime;
      return total + duration;
    }, 0);

    // Convert total duration from milliseconds to seconds
    const totalSeconds = totalDuration / 1000;

    // Optionally, format the total duration into a human-readable format (hours, minutes, seconds)
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return  `${hours > 0 ? `${hours} h`: ""} ${minutes > 0 ? `${minutes} m`: ""} ${seconds > 0 ? `${seconds} s`: ""}`;
    
  }

  // Return default values if there is no activityLog
  return "0 s";
};


// weekly total active time
const groupActivityLogByWeek = (activityLog) => {
  const groupedActivity = {};

  for (const entry of activityLog) {
    if (entry.startTime && entry.endTime) {
      const weekStart = getWeekStartDate(entry.startTime);
      if (!groupedActivity[weekStart]) {
        groupedActivity[weekStart] = 0;
      }
      groupedActivity[weekStart] += entry.endTime - entry.startTime;
    }
  }

  return groupedActivity;
};

// Calculate the start date of the week for a given date
const getWeekStartDate = (timestamp) => {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  const day = date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - day);

  return startOfWeek.getTime();
};

// Calculate total activity time grouped by week
export const calculateWeeklyActivity = (task) => {
  const groupedActivity = groupActivityLogByWeek(task.activityLog);
  return Object.entries(groupedActivity).map(([weekStart, activityTime]) => ({
    weekStart: Number(weekStart),
    totalActivityTime: formatTime(activityTime),
  }));
};
