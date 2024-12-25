  // import { Grid } from "@mui/material";
  // import Layout from "../../Layout/Layout";
  // import Banner from "../Home_Component/Banner";
  // import Categories from "../Home_Component/Categories.jsx";
  // import Posts from "../Home_Component/Posts.jsx";

  // const Home = () => {
  //   return (
  //     <Layout>
  //       <Banner />

  //       <Grid container spacing={2}>

  //         {/* Categories Section */}
  //         <Grid item lg={3} sm={4} xs={12}
  //         >
  //           <Categories />
  //         </Grid>

  //         {/* Posts Section */}
  //         <Grid item sm={9} xs={12} container>
  //           <Posts />
  //         </Grid>

  //       </Grid>
  //     </Layout>
  //   );
  // };

  // export default Home;




  import { Grid } from "@mui/material";
import Layout from "../../Layout/Layout";
import Banner from "../Home_Component/Banner";
import Categories from "../Home_Component/Categories.jsx";
import Posts from "../Home_Component/Posts.jsx";

const Home = () => {
  return (
    <Layout>
      {/* Banner Section */}
      <Banner />

      {/* Main Grid Container */}
      <Grid 
        container 
        spacing={2} 
        sx={{
          padding: { xs: 1, sm: 2, md: 3 },
        }}
      >
        {/* Categories Section */}
        <Grid
          item
          lg={3} 
          md={4} 
          sm={12} 
          xs={12}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "start" },
            alignItems: "flex-start",
            flexDirection: { xs: "row", sm: "column" },
          }}
        >
          <Categories />
        </Grid>

        {/* Posts Section */}
        <Grid
          item
          lg={9}
          md={8}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <Posts />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
