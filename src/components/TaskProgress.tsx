import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Todo } from "../types";

type TaskProgressProps = {
  todos: Todo[];
};

export const TaskProgress = ({ todos }: TaskProgressProps) => {
  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const completedPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const pendingPercentage =
    totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0;

  return (
    <div className="flex justify-around items-center space-x-8 py-4">
      <div className="w-28 hover:scale-105 transition-transform duration-300">
        <h3 className="text-center font-semibold mb-2 text-gray-700">
          Completed
        </h3>
        <CircularProgressbar
          value={completedPercentage}
          text={`${completedPercentage.toFixed(1)}%`}
          styles={buildStyles({
            pathColor: "rgba(76, 175, 80, 0.85)",
            trailColor: "#f0f0f0",
            textColor: "#333",
            textSize: "18px",
            strokeLinecap: "round",
            backgroundColor: "#fff",
          })}
        />
      </div>

      <div className="w-28 hover:scale-105 transition-transform duration-300">
        <h3 className="text-center font-semibold mb-2 text-gray-700">
          Pending
        </h3>
        <CircularProgressbar
          value={pendingPercentage}
          text={`${pendingPercentage.toFixed(1)}%`}
          styles={buildStyles({
            pathColor: "rgba(255, 87, 34, 0.85)",
            trailColor: "#f0f0f0",
            textColor: "#333",
            textSize: "18px",
            strokeLinecap: "round",
            backgroundColor: "#fff",
          })}
        />
      </div>
    </div>
  );
};
