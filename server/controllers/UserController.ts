export const getUser = function(req: any, res: any) {
  res.status(200).json({ message: "User API is working!" });
};

// export function configureRoutes() {
//   const getUser = function(req:any, res:any) {
//     res.status(200).json({ message: "User API is working!" });
//   };
// }
// export default configureRoutes;