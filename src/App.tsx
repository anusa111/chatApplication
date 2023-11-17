// import Layout from "./pageComponents/global/Layout";
// import IndexHero from "./pageComponents/heroSection/indexHero";

// const App = () => {
//   return (
//     <Layout>
//       <IndexHero />
//     </Layout>
//   );
// };

// export default App;

import { useRoutes } from "react-router-dom";
import routes from "./routes/routes"; // Import the default export first

const App = () => {
  const Routes = useRoutes(routes);
  return <>{Routes}</>;
};

export default App;
