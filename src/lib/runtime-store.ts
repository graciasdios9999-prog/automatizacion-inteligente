/** In-process store for preview/demo when DATABASE_URL is absent. */

export type Heartbeat = {
  at: string;
  ticks: number;
  lastAction: string;
};

const state: {
  ticks: number;
  lastTickAt: string | null;
  lastAction: string;
  jobs: Array<{ id: string; type: string; status: string; at: string }>;
} = {
  ticks: 0,
  lastTickAt: null,
  lastAction: "boot",
  jobs: [],
};

export function recordTick(action: string): Heartbeat {
  state.ticks += 1;
  state.lastTickAt = new Date().toISOString();
  state.lastAction = action;
  state.jobs.unshift({
    id: `job_${Date.now()}`,
    type: action,
    status: "ok",
    at: state.lastTickAt,
  });
  if (state.jobs.length > 50) state.jobs.length = 50;
  return {
    at: state.lastTickAt,
    ticks: state.ticks,
    lastAction: state.lastAction,
  };
}

export function getRuntimeSnapshot() {
  return {
    ticks: state.ticks,
    lastTickAt: state.lastTickAt,
    lastAction: state.lastAction,
    recentJobs: state.jobs.slice(0, 10),
    pid: process.pid,
    uptimeSec: Math.round(process.uptime()),
  };
}
