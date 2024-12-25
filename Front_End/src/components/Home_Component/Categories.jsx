import { Link, useNavigate, useSearchParams } from "react-router-dom";
import category from "../Home_Component/categories";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Box, Dialog, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";

const Categories = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const navigate = useNavigate();
  const [open, setOpen] = useState(false); 

  const handleCreateBlog = () => {
    if (!selectedCategory) {
      setOpen(true); 
    } else {
      navigate(`/create?category=${selectedCategory}`); // Navigate to create page
    }
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        width: "100%",
        padding: 2,
        backgroundColor: "#fff",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        borderRight: "1px solid #ddd",
        height: {
          sm: "calc(100vh - 180px)",
          md: "calc(100vh - 10px)",
        },
      }}
    >
      {/* Create Blog Button */}
      <Button
        sx={{
          bgcolor: "white",
          color: "black",
          border: "1px solid black",
          width: "100%",
          padding: "15px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "10px",
          mb: 2,
          "&:hover": {
            bgcolor: "black",
            color: "white",
            borderRadius: "10px",
          },
        }}
        onClick={handleCreateBlog}
      >
        CREATE BLOG
      </Button>

      {/* Categories List */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
              <Link
                to="/home?category="
                style={{
                  textDecoration: "none",
                  color: selectedCategory ? "gray" : "black", 
                }}
              >
                All Categories
              </Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {category.map((cate) => (
            <TableRow key={cate.id}>
              <TableCell key={cate.id}>
              <Link
                to={`/home?category=${cate.type}`}
                className={`block font-bold text-lg py-2 px-2 rounded 
                  ${
                    selectedCategory === cate.type
                      ? "text-black bg-gray-300"
                      : "text-gray-500 hover:text-white hover:bg-black transition-all"
                  }`}>
                {cate.type}
              </Link>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for missing category */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>To create a blog, please select the Category of your blog.</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              bgcolor: "black",
              color: "white",
              "&:hover": {
                bgcolor: "gray",
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Categories;
