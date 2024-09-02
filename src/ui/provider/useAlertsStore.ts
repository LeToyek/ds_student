// alertStore.ts
import create from "zustand";

// Define the Alert type
type AlertType = "success" | "error" | "warning" | "info";

// Define the structure of an alert
interface AlertState {
  id: string;
  message: string;
  type: AlertType;
}

// Define the store's state and actions
interface AlertStore {
  alerts: AlertState[];
  addAlert: (message: string, type: AlertType) => void;
  removeAlert: (id: string) => void;
}

// Create the store
export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  addAlert: (message, type) => {
    const id = Math.random().toString(36).substring(7); // Generate a random id for the alert
    set((state) => ({
      alerts: [...state.alerts, { id, message, type }],
    }));

    // Automatically remove the alert after 5 seconds
    setTimeout(
      () =>
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== id),
        })),
      5000
    );
  },
  removeAlert: (id) => {
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    }));
  },
}));
