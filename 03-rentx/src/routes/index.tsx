import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../contexts/AuthContext";
import { NonAuthRoutes } from "./nonAuth.stack.routes";
import { AppTabRoutes } from "./app.tab.routes";

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      { user === null ? <NonAuthRoutes /> : <AppTabRoutes /> }
    </NavigationContainer>
  )
}