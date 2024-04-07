// import { useSession } from "next-auth/react";
// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const UserContext = createContext();

// export function UserWrapper({ children }) {
//   const { data: session, status } = useSession();
//   const [userData, setUserData] = useState(null);
//   const [mutateUser, setMutateUser] = useState();

//   useEffect(() => {
//     if (!session) {
//       return;
//     }
//     async function getUser() {
//       try {
//         const response = await axios.get(`/api/login`);
//         if (response) {
//           setUserData(response.data);
//         }
//       } catch (error) {
//         console.error("Log in err!");
//       }
//     }
//     getUser();
//   }, [session, mutateUser]);

//   return (
//     <UserContext.Provider value={{ userData, setMutateUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// // custom user hook
// export function useUserContext() {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("UserContext not Found! ");
//   }
//   return context;
// }
