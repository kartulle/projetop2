import {AppointmentProvider} from "./contexts/appointment";
import {AuthProvider} from "./contexts/auth";
import {Paths} from "./routes";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <Paths />
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;
