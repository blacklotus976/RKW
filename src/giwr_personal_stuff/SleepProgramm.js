"use client";
import React from "react";

function SleepProgramm() {
  const [mode, setMode] = React.useState("awake");
  const [timer, setTimer] = React.useState(0);
  const [logs, setLogs] = React.useState([
    { date: "2025-01-01", type: "sleep", duration: 28800 }, // 8 hours
    { date: "2025-01-01", type: "awake", duration: 57600 }, // 16 hours
    { date: "2025-01-02", type: "sleep", duration: 25200 }, // 7 hours
    { date: "2025-01-02", type: "awake", duration: 61200 }, // 17 hours
  ]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMode = () => {
    const newLog = {
      date: new Date().toISOString().split("T")[0],
      type: mode,
      duration: timer,
    };
    setLogs([...logs, newLog]);
    setMode(mode === "awake" ? "sleep" : "awake");
    setTimer(0);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateStats = () => {
    const sleepLogs = logs.filter((log) => log.type === "sleep");
    const avgSleepPerDay =
      sleepLogs.reduce((acc, curr) => acc + curr.duration, 0) /
      sleepLogs.length /
      3600;
    const avgSleepPerWeek = avgSleepPerDay * 7;
    const avgSleepPerHour =
      sleepLogs.reduce((acc, curr) => acc + curr.duration, 0) /
      (logs.length * 3600);

    return {
      avgSleepPerDay: avgSleepPerDay.toFixed(2),
      avgSleepPerWeek: avgSleepPerWeek.toFixed(2),
      avgSleepPerHour: avgSleepPerHour.toFixed(2),
    };
  };

  const stats = calculateStats();

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        mode === "awake" ? "bg-[#fdf6e3]" : "bg-[#1a1b26]"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div
          className={`text-center text-8xl font-bold mb-12 ${
            mode === "awake" ? "text-[#b58900]" : "text-[#7aa2f7]"
          }`}
        >
          {formatTime(timer)}
        </div>

        <button
          onClick={toggleMode}
          className={`w-full py-8 mb-12 text-3xl font-bold rounded-lg transition-all duration-500 ${
            mode === "awake"
              ? "bg-[#b58900] text-white hover:bg-[#cb4b16]"
              : "bg-[#7aa2f7] text-white hover:bg-[#bb9af7]"
          }`}
        >
          {mode === "awake" ? (
            <>
              <i className="fas fa-moon mr-2"></i>Time to Sleep
            </>
          ) : (
            <>
              <i className="fas fa-sun mr-2"></i>Time to Wake Up
            </>
          )}
        </button>

        <div
          className={`bg-white rounded-lg shadow-lg p-6 mb-12 ${
            mode === "awake" ? "border-[#b58900]" : "border-[#7aa2f7]"
          } border-2`}
        >
          <h2 className="text-2xl font-bold mb-4">Sleep Pattern</h2>
          <div className="h-64 w-full">
            {logs.map((log, index) => (
              <div key={index} className="h-8 mb-2 flex items-center">
                <div className="w-24 text-sm">{log.date}</div>
                <div
                  className={`flex-grow rounded ${
                    log.type === "sleep" ? "bg-[#7aa2f7]" : "bg-[#b58900]"
                  }`}
                  style={{
                    width: `${(log.duration / 86400) * 100}%`,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`bg-white p-6 rounded-lg shadow-lg ${
              mode === "awake" ? "border-[#b58900]" : "border-[#7aa2f7]"
            } border-2`}
          >
            <h3 className="text-xl font-bold mb-2">Average Sleep per Day</h3>
            <p className="text-3xl">{stats.avgSleepPerDay} hours</p>
          </div>
          <div
            className={`bg-white p-6 rounded-lg shadow-lg ${
              mode === "awake" ? "border-[#b58900]" : "border-[#7aa2f7]"
            } border-2`}
          >
            <h3 className="text-xl font-bold mb-2">Average Sleep per Week</h3>
            <p className="text-3xl">{stats.avgSleepPerWeek} hours</p>
          </div>
          <div
            className={`bg-white p-6 rounded-lg shadow-lg ${
              mode === "awake" ? "border-[#b58900]" : "border-[#7aa2f7]"
            } border-2`}
          >
            <h3 className="text-xl font-bold mb-2">Average Sleep per Hour</h3>
            <p className="text-3xl">{stats.avgSleepPerHour} hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SleepProgramm;