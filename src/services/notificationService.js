import { toast } from 'react-toastify';
import { format, isBefore, differenceInMinutes } from 'date-fns';

const setupTaskNotifications = (tasks) => {
  // Clear any existing intervals
  if (window.taskNotificationIntervals) {
    window.taskNotificationIntervals.forEach(clearInterval);
  }
  
  window.taskNotificationIntervals = [];

  tasks.forEach((task) => {
    if (task.status !== 'completed' && task.dueDate) {
      const checkNotification = () => {
        const now = new Date();
        let dueDate = new Date(task.dueDate);
        
        if (task.dueTime) {
          const [hours, minutes] = task.dueTime.split(':');
          dueDate.setHours(parseInt(hours), parseInt(minutes));
        }
        
        const minutesUntilDue = differenceInMinutes(dueDate, now);
        
        if (minutesUntilDue > 0 && minutesUntilDue <= 60) {
          toast.warning(`Task "${task.title}" is due in ${minutesUntilDue} minutes!`);
        } else if (isBefore(dueDate, now)) {
          toast.error(`Task "${task.title}" is overdue!`);
          clearInterval(interval);
        }
      };
      
      const interval = setInterval(checkNotification, 60000); // Check every minute
      window.taskNotificationIntervals.push(interval);
      checkNotification(); // Run immediately
    }
  });
};

export default setupTaskNotifications;
