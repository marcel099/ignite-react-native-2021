import { appSchema } from "@nozbe/watermelondb";

import { userSchema } from "./userSchema";
import { carSchema } from "./carSchema";

export const schemas = appSchema({
  version: 4,
  tables: [
    userSchema,
    carSchema,
  ],
});
