import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";
import "../Header/Header.css";
import { useDispatch } from "react-redux";
import { fetchCourseList } from "../../store/slices/courseSlice";
import { AppDispatch } from "../../store";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm) {
      navigate(
        `${PATH.HOME.SEARCH_COURSE}?searchTerm=${encodeURIComponent(
          searchTerm
        )}`
      );
      dispatch(fetchCourseList({ MaNhom: "GP09", searchTerm }));
    }
  };
  return (
    <form onSubmit={handleSearch}>
      <div className="search">
        <TextField
          type="text"
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="search__button" type="submit">
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
