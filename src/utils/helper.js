export const formatTime = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 60000);
  const hours = Math.floor(minutes / 60);
  return `${hours > 0 ? hours + ' hours': ""}  ${minutes % 60} minutes`;
};

export const calculateTotalActivityTime = (task) => {
  const { activityLog, lastStartTime, isActive } = task;
  let totalActivityTime = 0;

  for (const entry of activityLog) {
    if (entry.startTime && entry.endTime) {
      totalActivityTime += entry.endTime - entry.startTime;
    }
  }

  if (isActive) {
    totalActivityTime += (Date.now() - lastStartTime);
  }
  return formatTime(totalActivityTime);
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
